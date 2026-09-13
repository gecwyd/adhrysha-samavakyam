import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type MinuteExpression = "happy" | "curious" | "surprised" | "determined" | "sleepy" | "mischievous";
export type MinuteGesture = "idle" | "wave" | "point" | "thumbsUp" | "handsOnHips" | "celebrate";
export interface MissMinuteHandle {
  speak(text: string, options?: { duration?: number; speed?: number }): Promise<unknown>;
  stopSpeaking(): void;
  stop(): void;
  showExpression(name: MinuteExpression, options?: { duration?: number }): void;
  showGesture(name: MinuteGesture, options?: { duration?: number }): void;
}
declare const MissMinute: ForwardRefExoticComponent<{
  size?: number;
  autoExpressions?: boolean;
  defaultExpression?: MinuteExpression;
  className?: string;
} & RefAttributes<MissMinuteHandle>>;
export default MissMinute;
