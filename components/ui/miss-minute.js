/* eslint-disable react-hooks/refs, react-hooks/set-state-in-effect */
import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { createTimeline, morphTo, stagger } from 'animejs';

export const GESTURES = ['idle', 'wave', 'point', 'thumbsUp', 'handsOnHips', 'celebrate'];
export const EXPRESSIONS = ['happy', 'curious', 'surprised', 'determined', 'sleepy', 'mischievous'];
export const SCRIPT_GENERATION_INSTRUCTIONS = `Generate a Miss Minute animation script. Return only the script markup with no Markdown fence or explanation.

Use these tags:
- <s time="2s" speed="1">Text to visually speak</s>
- <s time="1s"></s> for a wait
- <a action="ACTION" ATTRIBUTE="VALUE" /> for an action

Rules:
- Commands run sequentially.
- time accepts milliseconds (500ms) or seconds (2s).
- Speech speed must be a positive multiplier; 1 is normal, 0.5 is slower, and 2 is faster.
- Actions: walkx (x), walky (y), walk (x and y), move or moveto (x and y), gesture (name), expression or face (name), wait (time), stop, reset.
- Gesture names: idle, wave, point, thumbsUp, handsOnHips, celebrate.
- Expression names: happy, curious, surprised, determined, sleepy, mischievous.
- Coordinates are pixel offsets from the character's starting position.
- Use self-closing action tags. Keep all attributes quoted.
- To sync a script to narration, call runScript(script, { audioUrl: "https://example.com/narration.mp3" }). The audio preloads before both start together.

Example:
<a action="expression" name="curious" />
<s time="2s" speed="1.2">Hello! I am Miss Minute.</s>
<s time="1s"></s>
<a action="gesture" name="wave" time="2s" />
<a action="walkx" x="80" time="1.5s" />
<a action="expression" name="happy" />`;
const finite = (value, name) => { if (!Number.isFinite(value)) throw new TypeError(`${name} must be a finite number`); return value; };
const parseTime = value => {
  if (value === undefined || value === null || value === '') return undefined;
  const match = String(value).trim().match(/^(-?\d+(?:\.\d+)?)\s*(ms|s)?$/i);
  if (!match) throw new TypeError(`Invalid time: ${value}`);
  const amount = Number(match[1]);
  if (amount < 0) throw new RangeError('time must be nonnegative');
  return match[2]?.toLowerCase() === 's' ? amount * 1000 : amount;
};
const parseAttributes = source => {
  const attributes = {};
  const pattern = /([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  let match;
  while ((match = pattern.exec(source))) attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4];
  return attributes;
};
const decodeText = value => value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();

/** Parse <s time="2s">Hello</s>, empty timed <s> waits, and self-closing/paired <a> actions. */
export function parseScript(source) {
  if (typeof source !== 'string') throw new TypeError('Script must be a string');
  // Chat/Markdown often escapes markup as \<tag>; accept both pasted forms.
  source = source.replace(/\\(?=<)/g, '');
  const steps = [];
  const token = /<s\b([^>]*)>([\s\S]*?)<\/s\s*>|<a\b([^>]*?)(?:\/\s*>|>(?:([\s\S]*?)<\/a\s*>)?)/gi;
  let cursor = 0;
  let match;
  while ((match = token.exec(source))) {
    const outside = decodeText(source.slice(cursor, match.index));
    if (outside) steps.push({ type: 'speech', text: outside });
    if (match[1] !== undefined) {
      const attributes = parseAttributes(match[1]);
      const text = decodeText(match[2] || '');
      const time = parseTime(attributes.time);
      const speed = attributes.speed ?? attributes.rate;
      steps.push(text ? { type: 'speech', text, time, ...(speed ? { speed: Number(speed) } : {}) } : { type: 'wait', time: time ?? 0 });
    } else {
      const attributes = parseAttributes(match[3] || '');
      const action = attributes.action;
      if (!action) throw new TypeError('Action tag requires an action attribute');
      steps.push({ type: 'action', action: action.toLowerCase().replace(/[ _-]/g, ''), attributes, time: parseTime(attributes.time) });
    }
    cursor = token.lastIndex;
  }
  const trailing = decodeText(source.slice(cursor));
  if (trailing) steps.push({ type: 'speech', text: trailing });
  return steps;
}

const FACE_SHAPES = {
  happy: {
    browLeft: 'M106 111 Q123 101 140 111', browRight: 'M180 111 Q197 101 214 112',
    eyeLeft: 'M102 167 C100 139 105 103 123 103 C143 103 145 145 142 168 Q121 173 102 167 Z',
    eyeRight: 'M177 168 C173 142 179 104 196 105 C216 107 220 145 217 168 Q197 174 177 168 Z',
    pupilLeft: 'M120 166 C115 150 122 126 132 126 C143 128 141 154 137 169 Q128 171 120 166 Z',
    pupilRight: 'M192 168 C185 150 193 128 203 128 C215 128 214 153 209 169 Q200 171 192 168 Z',
    mouth: 'M132 192 C146 194 171 195 186 189 C179 204 166 211 151 207 C142 204 136 199 132 192 Z',
  },
  curious: {
    browLeft: 'M105 114 Q123 98 141 109', browRight: 'M179 112 Q197 108 213 118',
    eyeLeft: 'M100 166 C98 134 105 99 123 100 C144 101 147 143 143 168 Q121 174 100 166 Z',
    eyeRight: 'M179 166 C176 143 181 111 197 110 C215 110 218 145 215 167 Q197 172 179 166 Z',
    pupilLeft: 'M124 166 C120 149 128 124 138 126 C149 128 146 154 142 168 Q133 171 124 166 Z',
    pupilRight: 'M195 167 C190 151 197 131 207 131 C217 132 216 153 212 168 Q203 170 195 167 Z',
    mouth: 'M145 198 C153 193 166 193 175 198 C169 204 154 205 145 198 Z',
  },
  surprised: {
    browLeft: 'M104 108 Q122 96 141 107', browRight: 'M178 107 Q198 95 216 108',
    eyeLeft: 'M100 162 C98 128 105 99 123 99 C143 99 146 132 143 163 Q121 170 100 162 Z',
    eyeRight: 'M176 163 C173 130 179 100 197 101 C217 102 221 134 218 164 Q197 171 176 163 Z',
    pupilLeft: 'M119 161 C116 146 123 125 132 125 C142 126 141 149 137 163 Q128 166 119 161 Z',
    pupilRight: 'M191 162 C187 147 194 126 203 126 C214 127 213 150 209 164 Q200 166 191 162 Z',
    mouth: 'M146 201 C146 190 151 185 158 185 C166 185 171 191 170 202 C170 212 165 217 158 217 C151 217 146 211 146 201 Z',
  },
  determined: {
    browLeft: 'M105 109 Q124 114 139 123', browRight: 'M179 122 Q195 112 215 109',
    eyeLeft: 'M103 164 C102 143 109 122 125 121 C141 121 145 143 141 165 Q122 170 103 164 Z',
    eyeRight: 'M178 165 C176 143 181 122 197 121 C214 121 219 143 216 165 Q197 171 178 165 Z',
    pupilLeft: 'M121 164 C118 151 124 135 133 134 C143 134 142 153 138 166 Q129 168 121 164 Z',
    pupilRight: 'M192 165 C188 152 195 134 204 134 C214 135 213 153 209 166 Q200 169 192 165 Z',
    mouth: 'M137 202 C149 198 168 197 181 201 C171 204 149 205 137 202 Z',
  },
  sleepy: {
    browLeft: 'M106 124 Q123 120 140 124', browRight: 'M180 124 Q197 120 214 124',
    eyeLeft: 'M103 153 C108 158 116 161 123 161 C131 161 138 157 142 151 Q123 168 103 153 Z',
    eyeRight: 'M178 151 C183 158 191 161 198 161 C206 161 214 157 218 150 Q198 168 178 151 Z',
    pupilLeft: 'M120 158 C120 156 124 154 130 154 C135 154 138 156 138 158 Q129 161 120 158 Z',
    pupilRight: 'M192 158 C192 156 196 154 202 154 C207 154 210 156 210 158 Q201 161 192 158 Z',
    mouth: 'M144 200 C152 202 165 203 174 199 C168 205 152 206 144 200 Z',
  },
  mischievous: {
    browLeft: 'M105 113 Q123 104 140 113', browRight: 'M179 118 Q197 108 214 103',
    eyeLeft: 'M102 166 C101 140 107 108 124 107 C142 107 145 144 142 167 Q122 172 102 166 Z',
    eyeRight: 'M178 166 C176 142 181 111 197 110 C215 109 219 143 216 166 Q197 172 178 166 Z',
    pupilLeft: 'M124 165 C120 149 128 126 138 127 C148 128 146 153 142 167 Q133 170 124 165 Z',
    pupilRight: 'M195 166 C190 150 198 128 208 129 C218 130 216 153 212 167 Q203 170 195 166 Z',
    mouth: 'M131 192 C149 197 174 196 188 187 C182 204 170 212 154 208 C144 205 136 199 131 192 Z',
  },
};
const FACE_FEATURES = ['browLeft', 'browRight', 'eyeLeft', 'eyeRight', 'pupilLeft', 'pupilRight', 'mouth'];
const MOUTH_FILLS = { happy: '#fff3d4', curious: '#fff3d4', surprised: '#62381e', determined: '#62381e', sleepy: '#62381e', mischievous: '#fff3d4' };

function Face({ expression }) {
  const shape = FACE_SHAPES[expression];
  return <g className={`mm-face mm-expression-${expression}`}>
    <defs>{EXPRESSIONS.flatMap(name => FACE_FEATURES.map(feature => <path key={`${name}-${feature}`} data-face-target={name} data-face-feature={feature} d={FACE_SHAPES[name][feature]} />))}</defs>
    <g className="mm-brows" fill="none" strokeWidth="4"><path data-face-live="browLeft" d={shape.browLeft} /><path data-face-live="browRight" d={shape.browRight} /></g>
    <g className="mm-eyes" fill="#fff3d4" strokeWidth="2.5">
      <path data-face-live="eyeLeft" d={shape.eyeLeft} /><path data-face-live="eyeRight" d={shape.eyeRight} />
      <g className="mm-pupils" fill="#62381e" stroke="none"><path data-face-live="pupilLeft" d={shape.pupilLeft} /><path data-face-live="pupilRight" d={shape.pupilRight} /></g>
      <path className="mm-lashes" d="M111 108 Q106 101 105 95 M121 103 L118 92 M133 108 L135 96 M184 111 L179 100 M194 106 L191 95 M204 110 L206 100" fill="none" strokeWidth="2.5" opacity={expression === 'sleepy' ? 0 : 1} />
    </g>
    <ellipse cx="157" cy="166" rx="5" ry="6" fill="#62381e" stroke="none" />
    <g className="mm-mouth"><path data-face-live="mouth" d={shape.mouth} fill={MOUTH_FILLS[expression]} strokeWidth="2.5" /></g>
  </g>;
}

/** Coordinates are pixel offsets from the component's initial position in its parent. */
const MissMinute = forwardRef(function MissMinute({ size = 280, initialX = 0, initialY = 0, expression: controlledExpression, defaultExpression = 'happy', autoExpressions = true, onStateChange, className = '' }, ref) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [motion, setMotion] = useState('idle');
  const [gesture, setGesture] = useState('idle');
  const [internalExpression, setInternalExpression] = useState(defaultExpression);
  const expression = controlledExpression ?? internalExpression;
  const [speaking, setSpeaking] = useState(false);
  const [caption, setCaption] = useState('');
  const positionRef = useRef(position);
  const frame = useRef(null);
  const pendingMove = useRef(null);
  const speech = useRef(null);
  const audio = useRef(null);
  const speechTimer = useRef(null);
  const captionTimer = useRef(null);
  const gestureTimer = useRef(null);
  const mounted = useRef(true);
  const rootRef = useRef(null);
  const runScriptRef = useRef(null);
  const expressionTimer = useRef(null);
  const previousExpression = useRef(defaultExpression);
  const renderedExpression = useRef(defaultExpression);
  const [direction, setDirection] = useState('right');

  const cancelMove = useCallback(() => {
    cancelAnimationFrame(frame.current);
    pendingMove.current?.({ status: 'cancelled', ...positionRef.current });
    pendingMove.current = null;
  }, []);
  const stopSpeaking = useCallback(() => {
    clearTimeout(captionTimer.current);
    clearTimeout(speechTimer.current);
    const active = speech.current;
    speech.current = null;
    if (active) active.resolve({ status: 'cancelled' });
    if (mounted.current) { setSpeaking(false); setCaption(''); }
  }, []);

  const stopAudio = useCallback(() => {
    const active = audio.current;
    audio.current = null;
    if (!active) return;
    active.pause?.();
    active.removeAttribute?.('src');
    active.load?.();
  }, []);

  const playAudio = useCallback(async (url) => {
    if (typeof url !== 'string' || !url.trim()) return null;
    if (typeof Audio === 'undefined') throw new Error('Audio playback is unavailable in this browser.');
    stopAudio();
    const track = new Audio(url.trim());
    track.preload = 'auto';
    audio.current = track;
    await new Promise((resolve, reject) => {
      const ready = () => { cleanup(); resolve(); };
      const failed = () => { cleanup(); reject(new Error('The audio link could not be loaded.')); };
      const cleanup = () => {
        track.removeEventListener?.('canplaythrough', ready);
        track.removeEventListener?.('canplay', ready);
        track.removeEventListener?.('error', failed);
      };
      if (track.readyState >= 3 || !track.addEventListener) { ready(); return; }
      track.addEventListener('canplaythrough', ready, { once: true });
      track.addEventListener('canplay', ready, { once: true });
      track.addEventListener('error', failed, { once: true });
      track.load?.();
    });
    // Trigger playback and continue the animation timeline in the same turn.
    // Waiting for the play() promise introduces a small, audible lead over the first action.
    const playback = track.play();
    playback?.catch?.(() => { if (audio.current === track) audio.current = null; });
    track.addEventListener?.('ended', () => { if (audio.current === track) audio.current = null; }, { once: true });
    return track;
  }, [stopAudio]);

  const move = useCallback((x, y, options = {}, walking = false) => {
    finite(x, 'x'); finite(y, 'y');
    const start = { ...positionRef.current };
    const duration = options.duration ?? Math.max(450, Math.hypot(x - start.x, y - start.y) * (walking ? 5 : 3));
    finite(duration, 'duration');
    if (duration < 0) throw new RangeError('duration must be nonnegative');
    cancelMove();
    if (walking) {
      clearTimeout(gestureTimer.current);
      setGesture('idle');
      if (x !== start.x) setDirection(x < start.x ? 'left' : 'right');
    }
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (duration === 0 || reduced) {
      positionRef.current = { x, y }; setPosition({ x, y }); setMotion('idle');
      return Promise.resolve({ status: 'completed', x, y });
    }
    setMotion(walking ? 'walking' : 'moving');
    return new Promise(resolve => {
      pendingMove.current = resolve;
      let began;
      const step = now => {
        if (began === undefined) began = now;
        const progress = Math.min((now - began) / duration, 1);
        const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
        const next = { x: start.x + (x - start.x) * eased, y: start.y + (y - start.y) * eased };
        positionRef.current = next; setPosition(next);
        if (progress < 1) frame.current = requestAnimationFrame(step);
        else { pendingMove.current = null; setMotion('idle'); resolve({ status: 'completed', x, y }); }
      };
      frame.current = requestAnimationFrame(step);
    });
  }, [cancelMove]);

  const showExpression = useCallback((name, { duration = 0 } = {}) => {
    if (!EXPRESSIONS.includes(name)) throw new RangeError(`Unknown expression: ${name}. Use ${EXPRESSIONS.join(', ')}`);
    finite(duration, 'duration');
    if (duration < 0) throw new RangeError('duration must be nonnegative');
    clearTimeout(expressionTimer.current);
    if (controlledExpression === undefined) setInternalExpression(name);
    if (duration && controlledExpression === undefined) expressionTimer.current = setTimeout(() => setInternalExpression(defaultExpression), duration);
  }, [controlledExpression, defaultExpression]);

  const showGesture = useCallback((name, { duration = 0 } = {}) => {
    if (!GESTURES.includes(name)) throw new RangeError(`Unknown gesture: ${name}. Use ${GESTURES.join(', ')}`);
    finite(duration, 'duration');
    if (duration < 0) throw new RangeError('duration must be nonnegative');
    clearTimeout(gestureTimer.current); setGesture(name);
    if (duration) gestureTimer.current = setTimeout(() => setGesture('idle'), duration);
  }, []);

  const speak = useCallback((text, { speed = 1, rate, duration } = {}) => {
    if (typeof text !== 'string') throw new TypeError('Speech text must be a string');
    if (/<\s*[as]\b/i.test(text) && runScriptRef.current) return runScriptRef.current(text, { speed, rate, duration });
    stopSpeaking();
    if (!text.trim()) return Promise.resolve({ status: 'empty' });
    setCaption(text.trim());
    setSpeaking(true);
    const effectiveSpeed = rate ?? speed;
    finite(effectiveSpeed, 'speed');
    if (effectiveSpeed <= 0) throw new RangeError('speed must be positive');
    const visualDuration = duration ?? Math.min(12000, Math.max(1400, (text.trim().length * 62) / effectiveSpeed));
    finite(visualDuration, 'duration');
    if (visualDuration < 0) throw new RangeError('duration must be nonnegative');
    return new Promise(resolve => {
      speech.current = { resolve };
      const finish = () => {
        if (!speech.current) return;
        speech.current = null;
        setSpeaking(false);
        captionTimer.current = setTimeout(() => setCaption(''), 1800);
        resolve({ status: 'completed' });
      };
      speechTimer.current = setTimeout(finish, visualDuration);
    });
  }, [stopSpeaking]);

  const runScript = useCallback(async (source, options = {}) => {
    const steps = parseScript(source);
    if (typeof options.audioUrl === 'string' && options.audioUrl.trim()) await playAudio(options.audioUrl);
    const results = [];
    for (const step of steps) {
      if (step.type === 'wait') {
        if (step.time > 0) await new Promise(resolve => setTimeout(resolve, step.time));
        results.push({ status: 'waited', duration: step.time });
        continue;
      }
      if (step.type === 'speech') {
        results.push(await speak(step.text, { ...options, ...(step.speed ? { speed: step.speed } : {}), ...(step.time !== undefined ? { duration: step.time } : {}) }));
        continue;
      }
      const attrs = step.attributes;
      const number = (value, fallback) => Number(value ?? fallback);
      const actionDuration = step.time === undefined ? undefined : { duration: step.time };
      switch (step.action) {
        case 'walkx': results.push(await move(number(attrs.x ?? attrs.to ?? attrs.value), positionRef.current.y, actionDuration, true)); break;
        case 'walky': results.push(await move(positionRef.current.x, number(attrs.y ?? attrs.to ?? attrs.value), actionDuration, true)); break;
        case 'walk': results.push(await move(number(attrs.x, positionRef.current.x), number(attrs.y, positionRef.current.y), actionDuration, true)); break;
        case 'moveto': case 'move': results.push(await move(number(attrs.x, positionRef.current.x), number(attrs.y, positionRef.current.y), actionDuration)); break;
        case 'gesture': {
          showGesture(attrs.name ?? attrs.gesture ?? attrs.value, actionDuration || {});
          if (step.time > 0) await new Promise(resolve => setTimeout(resolve, step.time));
          results.push({ status: 'completed', action: 'gesture' });
          break;
        }
        case 'expression': case 'face': {
          showExpression(attrs.name ?? attrs.expression ?? attrs.value, actionDuration || {});
          if (step.time > 0) await new Promise(resolve => setTimeout(resolve, step.time));
          results.push({ status: 'completed', action: 'expression' });
          break;
        }
        case 'stop': stopSpeaking(); stopAudio(); cancelMove(); setMotion('idle'); results.push({ status: 'stopped' }); break;
        case 'reset': results.push(await move(initialX, initialY)); showGesture('idle'); showExpression(defaultExpression); break;
        case 'wait': { const duration = step.time ?? parseTime(attrs.duration) ?? 0; if (duration > 0) await new Promise(resolve => setTimeout(resolve, duration)); results.push({ status: 'waited', duration }); break; }
        default: throw new RangeError(`Unknown script action: ${attrs.action}`);
      }
    }
    return results;
  }, [cancelMove, defaultExpression, initialX, initialY, move, playAudio, showExpression, showGesture, speak, stopAudio, stopSpeaking]);
  runScriptRef.current = runScript;

  useImperativeHandle(ref, () => ({
    moveTo: (x, y, options) => move(x, y, options),
    walkTo: (x, y, options) => move(x, y, options, true),
    walkToX: (x, options) => move(x, positionRef.current.y, options, true),
    walkToY: (y, options) => move(positionRef.current.x, y, options, true),
    showGesture, showExpression, speak, runScript, stopSpeaking, stopAudio,
    getPosition: () => ({ ...positionRef.current }),
    stop: () => { cancelMove(); setMotion('idle'); stopSpeaking(); stopAudio(); },
    reset: () => { stopSpeaking(); stopAudio(); showGesture('idle'); showExpression(defaultExpression); return move(initialX, initialY); },
  }), [move, showGesture, showExpression, speak, runScript, stopSpeaking, stopAudio, cancelMove, initialX, initialY, defaultExpression]);

  useEffect(() => { onStateChange?.({ ...position, motion, gesture, expression, speaking }); }, [position, motion, gesture, expression, speaking, onStateChange]);
  useEffect(() => {
    if (!rootRef.current || !['wave', 'point', 'thumbsUp'].includes(gesture) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const pose = rootRef.current.querySelector(`.mm-pose-${gesture}`);
    if (!pose) return undefined;
    const startRotation = gesture === 'point' ? -14 : gesture === 'wave' ? -32 : 28;
    const timeline = createTimeline({ defaults: { duration: gesture === 'thumbsUp' ? 720 : 560, ease: 'outElastic(1, .72)' } })
      .add(pose, { opacity: [0, 1], rotate: [startRotation, 0], scale: [.94, 1] }, 0);
    return () => timeline.revert();
  }, [gesture]);
  useEffect(() => {
    if (!speaking || !rootRef.current || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const mouth = rootRef.current.querySelector('.mm-mouth');
    if (!mouth) return undefined;
    let stopped = false;
    let timer;
    let timeline;
    const talkBurst = () => {
      if (stopped) return;
      const openness = .9 + Math.random() * .2;
      const width = .91 + Math.random() * .1;
      timeline = createTimeline({ defaults: { ease: 'inOut(3)' } })
        .add(mouth, { scaleX: [.96, width], scaleY: [.24, openness], translateY: [0, 1.5], duration: 260 }, 0)
        .add(mouth, { scaleX: 1.04, scaleY: .56, translateY: -.5, duration: 190 }, 300)
        .add(mouth, { scaleX: .95, scaleY: .82, translateY: 1, duration: 220 }, 530)
        .add(mouth, { scaleX: .96, scaleY: .24, translateY: 0, duration: 280 }, 790);
      timer = setTimeout(talkBurst, 1250 + Math.random() * 850);
    };
    timer = setTimeout(talkBurst, 140);
    return () => {
      stopped = true;
      clearTimeout(timer);
      timeline?.revert();
    };
  }, [speaking]);
  useLayoutEffect(() => {
    const previous = renderedExpression.current;
    renderedExpression.current = expression;
    if (previous === expression || !rootRef.current || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const face = rootRef.current.querySelector('.mm-face');
    if (!face) return undefined;
    const livePaths = [...face.querySelectorAll('[data-face-live]')];
    const timeline = createTimeline({ defaults: { duration: 520, ease: 'inOut(3)' } });
    livePaths.forEach((path, index) => {
      const feature = path.dataset.faceLive;
      const target = face.querySelector(`[data-face-target="${expression}"][data-face-feature="${feature}"]`);
      path.setAttribute('d', FACE_SHAPES[previous][feature]);
      if (feature === 'mouth') path.setAttribute('fill', MOUTH_FILLS[previous]);
      if (typeof path.getTotalLength !== 'function' || typeof target?.getTotalLength !== 'function') {
        path.setAttribute('d', FACE_SHAPES[expression][feature]);
        if (feature === 'mouth') path.setAttribute('fill', MOUTH_FILLS[expression]);
        return;
      }
      timeline.add(path, {
        d: morphTo(target, .6),
        ...(feature === 'mouth' ? { fill: MOUTH_FILLS[expression] } : {}),
      }, index * 18);
    });
    const lashes = face.querySelector('.mm-lashes');
    timeline.add(lashes, { opacity: [previous === 'sleepy' ? 0 : 1, expression === 'sleepy' ? 0 : 1], duration: 300 }, 80);
    return () => timeline.revert();
  }, [expression]);
  useEffect(() => {
    if (motion !== 'walking' || !rootRef.current || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const root = rootRef.current;
    const character = root.querySelector('.mm-character');
    const [leftLeg, rightLeg] = root.querySelectorAll('.mm-leg');
    const [leftArm, rightArm] = root.querySelectorAll('.mm-arm');
    const shoes = root.querySelectorAll('.mm-shoe');
    const shadow = root.querySelector('.mm-shadow');
    const pupils = root.querySelectorAll('.mm-pupils path');
    const timeline = createTimeline({ loop: true, defaults: { duration: 560, ease: 'inOut(3)' } })
      .add(character, { translateY: [0, -9, 0], rotate: [-2, 2, -2] }, 0)
      .add(leftLeg, { rotate: [-25, 24, -25] }, 0)
      .add(rightLeg, { rotate: [24, -25, 24] }, 0)
      .add(leftArm, { rotate: [19, -18, 19] }, 0)
      .add(rightArm, { rotate: [-18, 19, -18] }, 0)
      .add(shoes, { translateY: [0, -8, 0], delay: stagger(280), duration: 280, ease: 'out(3)' }, 0)
      .add(shadow, { scaleX: [1, .78, 1], opacity: [.14, .08, .14] }, 0)
      .add(pupils, { translateX: [0, 3, 0], duration: 1120, ease: 'inOut(2)' }, 0);

    let expressionInterval;
    if (autoExpressions && controlledExpression === undefined) {
      previousExpression.current = expression;
      const walkingFaces = ['determined', 'happy', 'mischievous'];
      let faceIndex = 0;
      setInternalExpression(walkingFaces[faceIndex]);
      expressionInterval = setInterval(() => {
        faceIndex = (faceIndex + 1) % walkingFaces.length;
        setInternalExpression(walkingFaces[faceIndex]);
      }, 850);
    }
    return () => {
      timeline.revert();
      clearInterval(expressionInterval);
      if (autoExpressions && controlledExpression === undefined) setInternalExpression(previousExpression.current);
    };
    // `expression` is intentionally captured only when a walk begins.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motion, autoExpressions, controlledExpression]);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; cancelMove(); stopSpeaking(); stopAudio(); clearTimeout(gestureTimer.current); clearTimeout(expressionTimer.current); };
  }, [cancelMove, stopAudio, stopSpeaking]);

  return <div ref={rootRef} className={`miss-minute ${motion} facing-${direction} gesture-${gesture} expression-${expression} ${speaking ? 'is-speaking' : ''} ${className}`} style={{ width: size, transform: `translate(${position.x}px, ${position.y}px)` }}>
    <div className="mm-caption" role="status" aria-live="polite">{caption && <span>{caption}</span>}</div>
    <svg className="mm-art" viewBox="0 0 320 350" role="img" aria-label={`Miss Minute, ${speaking ? 'speaking' : motion}, ${gesture} gesture, ${expression} expression`}>
      <ellipse className="mm-shadow" cx="160" cy="326" rx="75" ry="9" fill="#543219" opacity=".14" />
      <g className="mm-character" stroke="#62381e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <g className="mm-leg mm-leg-left"><path d="M127 249 Q125 277 111 298" fill="none" stroke="#62381e" strokeWidth="7" /><path className="mm-shoe" d="M111 293 Q97 285 88 298 L77 312 Q74 321 91 321 L119 321 Q131 317 123 305 Z" fill="#ff992f" /></g>
        <g className="mm-leg mm-leg-right"><path d="M190 250 Q191 279 205 298" fill="none" stroke="#62381e" strokeWidth="7" /><path className="mm-shoe" d="M204 293 Q219 287 229 300 L240 313 Q243 322 225 321 L199 321 Q188 317 194 305 Z" fill="#ff992f" /></g>
        <g className="mm-arm mm-arm-left" style={gesture === 'wave' ? { display: 'none' } : undefined}><path d="M69 171 Q37 184 33 216" stroke="#dc742b" strokeWidth="12" fill="none" /><g fill="#fff4dc"><path d="M34 210 C20 202 15 209 18 219 C4 214 3 224 14 231 C3 232 8 243 19 241 C12 251 24 256 33 243 C48 241 49 222 39 218 Z" /><path d="M22 223 L29 230 M19 234 L27 235" strokeWidth="2" /></g></g>
        {gesture === 'wave' && <g className="mm-pose-arm mm-pose-wave"><path d="M72 172 Q49 153 48 120" stroke="#dc742b" strokeWidth="12" fill="none" /><path d="M48 121 Q36 116 34 106 L31 90 Q31 82 37 84 L41 98 L40 70 Q41 62 47 67 L50 92 L53 66 Q55 59 60 66 L59 94 L65 74 Q68 67 72 75 L65 105 Q63 119 48 121Z" fill="#fff4dc" /><path d="M41 99 Q51 104 61 99" fill="none" strokeWidth="2" /></g>}
        <g className="mm-arm mm-arm-right" style={['point', 'thumbsUp'].includes(gesture) ? { display: 'none' } : undefined}><path d="M251 169 Q282 177 285 211" stroke="#dc742b" strokeWidth="12" fill="none" /><g className="mm-glove" fill="#fff4dc"><path d="M283 211 C294 200 302 208 298 218 C313 214 316 224 305 230 C317 233 311 243 301 240 C308 251 296 256 287 244 C271 241 269 223 279 218 Z" /><path d="M297 223 L290 230 M301 234 L292 235" strokeWidth="2" /></g></g>
        {gesture === 'point' && <g className="mm-pose-arm mm-pose-point"><path d="M248 172 Q270 185 285 204" stroke="#dc742b" strokeWidth="12" fill="none" /><path d="M280 199 Q291 193 300 196 L315 190 Q322 189 322 195 Q320 199 307 203 L318 205 Q324 209 319 214 L302 213 Q308 221 302 224 Q293 220 285 214 Q276 210 280 199Z" fill="#fff4dc" /><path d="M296 205 L306 209 M288 211 L299 216" fill="none" strokeWidth="2" /></g>}
        {gesture === 'thumbsUp' && <g className="mm-pose-arm mm-pose-thumbsUp"><path d="M251 169 Q279 180 284 155" stroke="#dc742b" strokeWidth="11" fill="none" /><path d="M276 158 L274 141 Q273 132 281 130 L283 108 Q284 99 290 103 Q294 106 293 124 L305 126 Q313 128 309 136 L306 151 Q304 161 292 162Z" fill="#fff4dc" /><path d="M296 133 L308 135 M295 142 L307 144 M293 151 L305 153" fill="none" strokeWidth="2" /></g>}
        <circle cx="160" cy="152" r="108" fill="#ed791f" />
        <circle cx="160" cy="149" r="96" fill="#ffa535" stroke="#62381e" strokeWidth="2" />
        {Array.from({ length: 12 }, (_, i) => <path key={i} d="M160 61 L160 80" transform={`rotate(${i * 30} 160 149)`} stroke="#975425" strokeWidth={i % 3 === 0 ? 5 : 3} />)}
        <path d="M78 190 Q157 256 244 166 Q225 241 159 245 Q103 244 78 190" fill="#ff922a" stroke="none" />
        <Face expression={expression} />
      </g>
    </svg>
  </div>;
});
export default MissMinute;
