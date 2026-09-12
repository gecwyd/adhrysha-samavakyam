"use client"

import * as React from "react"
import { MissMinutes, useMissMinutes } from "@/components/ui/miss-minutes"

export default function TestPage() {
  const { speaking, currentAudioUrl, speak, stopSpeaking } = useMissMinutes()
  const [audioUrl, setAudioUrl] = React.useState("")
  const [inputUrl, setInputUrl] = React.useState("")

  const handleSpeak = () => {
    if (!inputUrl.trim()) return
    speak(inputUrl.trim())
  }

  const handleStop = () => {
    stopSpeaking()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a0a00] text-white p-8" style={{ fontFamily: "'Georgia', serif" }}>
      {/* TVA Background pattern */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #F07800 0, #F07800 1px, transparent 0, transparent 50%)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* TVA Badge */}
      <div className="relative z-10 flex flex-col items-center gap-1 mb-8">
        <div
          className="text-[10px] tracking-[0.4em] uppercase font-bold"
          style={{ color: "#F07800", letterSpacing: "0.5em" }}
        >
          Time Variance Authority
        </div>
        <div className="h-px w-64" style={{ background: "linear-gradient(90deg, transparent, #F07800, transparent)" }} />
      </div>

      {/* Miss Minutes Character */}
      <div className="relative z-10 flex flex-col items-center">
        <MissMinutes
          size={300}
          speaking={speaking}
          audioUrl={currentAudioUrl}
          autoSpeak={true}
          onSpeakEnd={stopSpeaking}
        />

        {/* Speaking indicator */}
        <div
          className="mt-2 flex items-center gap-2 text-sm font-semibold transition-opacity duration-300"
          style={{ color: "#F07800", opacity: speaking ? 1 : 0 }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#F07800" }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#F07800" }} />
          </span>
          Speaking…
        </div>
      </div>

      {/* Name plate */}
      <div className="relative z-10 mt-6 text-center">
        <h1
          className="text-4xl font-bold tracking-widest"
          style={{ color: "#F07800", textShadow: "0 0 40px #F0780060, 0 2px 4px #0008", fontFamily: "'Georgia', serif" }}
        >
          Miss Minutes
        </h1>
        <p className="mt-1 text-xs tracking-[0.3em] uppercase" style={{ color: "#CC6600" }}>TVA Digital Assistant</p>
      </div>

      {/* Control Panel */}
      <div
        className="relative z-10 mt-10 w-full max-w-lg rounded-2xl p-6 border"
        style={{
          background: "linear-gradient(135deg, #2A1000 0%, #1A0800 100%)",
          borderColor: "#F07800",
          boxShadow: "0 0 40px #F0780020, inset 0 1px 0 #F0780030",
        }}
      >
        <div
          className="text-xs uppercase tracking-[0.3em] font-bold mb-4"
          style={{ color: "#F07800" }}
        >
          Audio Feed
        </div>

        <div className="flex flex-col gap-3">
          <input
            id="audio-url-input"
            type="text"
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSpeak() }}
            placeholder="Paste an audio URL (mp3, ogg, wav…)"
            className="w-full rounded-lg px-4 py-3 text-sm outline-none border transition-all"
            style={{
              background: "#110600",
              borderColor: inputUrl ? "#F07800" : "#5A2A00",
              color: "white",
              boxShadow: inputUrl ? "0 0 16px #F0780030" : "none",
            }}
          />

          <div className="flex gap-3">
            <button
              id="speak-btn"
              onClick={handleSpeak}
              disabled={!inputUrl.trim() || speaking}
              className="flex-1 rounded-lg px-4 py-2.5 text-sm font-bold uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: speaking ? "#5A2A00" : "linear-gradient(135deg, #F07800, #C85E00)",
                color: speaking ? "#AA6600" : "white",
                boxShadow: !speaking && inputUrl ? "0 4px 24px #F0780050" : "none",
              }}
            >
              {speaking ? "Speaking…" : "▶  Make Her Speak"}
            </button>

            <button
              id="stop-btn"
              onClick={handleStop}
              disabled={!speaking}
              className="rounded-lg px-4 py-2.5 text-sm font-bold uppercase tracking-widest transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: "#2A1000",
                color: "#F07800",
                border: "1px solid #F07800",
              }}
            >
              ■ Stop
            </button>
          </div>
        </div>

        {/* Sample URLs */}
        <div className="mt-5">
          <div className="text-xs mb-2" style={{ color: "#8A5A30" }}>Quick test samples:</div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Beep", url: "https://www.soundjay.com/buttons/sounds/beep-01a.mp3" },
              { label: "Chime", url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => { setInputUrl(s.url) }}
                className="text-xs px-3 py-1 rounded-full border transition-all hover:brightness-110"
                style={{
                  borderColor: "#5A2A00",
                  color: "#CC8040",
                  background: "#1A0800",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="relative z-10 mt-8 text-xs text-center" style={{ color: "#5A3010" }}>
        For all time. Always.
      </p>
    </div>
  )
}
