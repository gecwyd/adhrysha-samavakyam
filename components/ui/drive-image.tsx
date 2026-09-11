"use client"

import * as React from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

export function extractDriveFileId(urlOrId?: string): string | null {
  if (!urlOrId) return null
  const trimmed = urlOrId.trim()
  if (/^[a-zA-Z0-9_-]{25,}$/.test(trimmed) && !trimmed.includes(".")) {
    return trimmed
  }
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileDMatch && fileDMatch[1]) return fileDMatch[1]

  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (idParamMatch && idParamMatch[1]) return idParamMatch[1]

  const dMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (dMatch && dMatch[1]) return dMatch[1]

  return null
}

export function getDriveThumbnailUrl(
  fileIdOrUrl?: string,
  sz: number | string = "w1600"
): string {
  const fileId = extractDriveFileId(fileIdOrUrl)
  if (!fileId) return fileIdOrUrl || ""
  const sizeParam =
    typeof sz === "number"
      ? `w${sz}`
      : sz.startsWith("w") || sz.startsWith("h") || sz.startsWith("s")
      ? sz
      : `w${sz}`
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${sizeParam}`
}

export interface DriveImageProps
  extends Omit<ImageProps, "src" | "width" | "height"> {
  src?: string
  url?: string
  link?: string
  fileId?: string
  sz?: number | string
  size?: number | string
  fallbackSrc?: string
  width?: number | `${number}`
  height?: number | `${number}`
}

export function DriveImage({
  src,
  url,
  link,
  fileId,
  sz,
  size,
  fallbackSrc,
  alt = "",
  width,
  height,
  className,
  fill,
  onError,
  ...props
}: DriveImageProps) {
  const rawInput = src || url || link || fileId
  const chosenSize = sz || size || (width ? `w${width}` : "w1600")
  const driveUrl = getDriveThumbnailUrl(rawInput, chosenSize)
  const [hasError, setHasError] = React.useState(false)

  const finalSrc = hasError && fallbackSrc ? fallbackSrc : driveUrl

  if (!finalSrc) return null

  if (fill) {
    return (
      <Image
        key={driveUrl}
        src={finalSrc}
        alt={alt}
        fill
        referrerPolicy="no-referrer"
        onError={(e) => {
          setHasError(true)
          onError?.(e)
        }}
        className={cn("object-cover", className)}
        {...props}
      />
    )
  }

  const numWidth = typeof width === "number" ? width : width ? parseInt(String(width), 10) : 1000
  const numHeight = typeof height === "number" ? height : height ? parseInt(String(height), 10) : 1000

  return (
    <Image
      key={driveUrl}
      src={finalSrc}
      alt={alt}
      width={numWidth}
      height={numHeight}
      referrerPolicy="no-referrer"
      onError={(e) => {
        setHasError(true)
        onError?.(e)
      }}
      className={cn(className)}
      style={{
        width: "auto",
        height: "auto",
        ...props.style,
      }}
      {...props}
    />
  )
}

export { DriveImage as GDriveImage, DriveImage as DriveImageViewer }
export default DriveImage
