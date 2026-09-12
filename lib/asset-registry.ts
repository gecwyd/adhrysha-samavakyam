const ASSET_MAP: Record<string, string> = {
  "indro.mp3": "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/intro-v2.mp3",
  "intro.mp3": "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/intro-v2.mp3",
  "vds.webp": "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/vds.webp",
  "priyanka.webp": "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/priyanka.webp",
  "mla.webp": "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/usha.webp",
  "usha.webp": "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/usha.webp",
  "principal.webp": "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/principal.webp",
  "pyg.webp": "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/pyg.webp",
  "college-draw.webp": "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/college-draw.webp",
  "logo.webp": "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/logo.webp",
  "roji.webp": "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/roji.webp",
  "siddique.webp": "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/siddique.webp",
  "bg-piano.mp3": "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/bg-piano-v2.mp3",
  "miss-minute-intro.webm": "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets/miss-minute-intro.webm",
}

export function resolveAsset(path: string): string {
  if (!path) return ""
  if (ASSET_MAP[path]) return ASSET_MAP[path]
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path
  }
  return path.startsWith("/") ? path : `/${path}`
}
