const GITHUB_RELEASE_BASE = "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.1-assets"
const GITHUB_RELEASE_V2_BASE = "https://github.com/gecwyd/adhrysha-samavakyam/releases/download/v0.2-assets"

const ASSET_MAP: Record<string, string> = {
  "indro.mp3": `${GITHUB_RELEASE_BASE}/intro-v2.mp3`,
  "intro.mp3": `${GITHUB_RELEASE_BASE}/intro-v2.mp3`,
  "intro-v2.mp3": `${GITHUB_RELEASE_BASE}/intro-v2.mp3`,
  "vds.webp": `${GITHUB_RELEASE_BASE}/vds.webp`,
  "priyanka.webp": `${GITHUB_RELEASE_BASE}/priyanka.webp`,
  "mla.webp": `${GITHUB_RELEASE_BASE}/usha.webp`,
  "usha.webp": `${GITHUB_RELEASE_BASE}/usha.webp`,
  "principal.webp": `${GITHUB_RELEASE_BASE}/principal.webp`,
  "pyg.webp": `${GITHUB_RELEASE_BASE}/pyg.webp`,
  "college-draw.webp": `${GITHUB_RELEASE_BASE}/college-draw.webp`,
  "college-draw.png": `${GITHUB_RELEASE_BASE}/college-draw.png`,
  "logo.webp": `${GITHUB_RELEASE_BASE}/logo.webp`,
  "logo.png": `${GITHUB_RELEASE_BASE}/logo.png`,
  "union-logo.webp": `${GITHUB_RELEASE_BASE}/union-logo.webp`,
  "roji.webp": `${GITHUB_RELEASE_BASE}/roji.webp`,
  "siddique.webp": `${GITHUB_RELEASE_BASE}/siddique.webp`,
  "bg-piano.mp3": `${GITHUB_RELEASE_BASE}/bg-piano-v2.mp3`,
  "bg-piano-v2.mp3": `${GITHUB_RELEASE_BASE}/bg-piano-v2.mp3`,
  "loki.mp3": `${GITHUB_RELEASE_BASE}/loki.mp3`,
  "miss-minute-intro.webm": `${GITHUB_RELEASE_BASE}/miss-minute-intro.webm`,
  "miss-minute-intro.wav": `${GITHUB_RELEASE_BASE}/miss-minute-intro.wav`,
  "miss-minute-script.xml": `${GITHUB_RELEASE_BASE}/miss-minute-script.xml`,
  "mmm.wav": `${GITHUB_RELEASE_BASE}/mmm.wav`,
  "adhil.webp": `${GITHUB_RELEASE_BASE}/adhil.webp`,
  "adhil.png": `${GITHUB_RELEASE_BASE}/adhil.png`,
  "rajeev.webp": `${GITHUB_RELEASE_BASE}/rajeev.webp`,
  "rajeev.png": `${GITHUB_RELEASE_BASE}/rajeev.png`,
  "brijmohan.webp": `${GITHUB_RELEASE_BASE}/brijmohan.webp`,
  "brijmohan.png": `${GITHUB_RELEASE_BASE}/brijmohan.png`,
  "time-dilation-bg.png": `${GITHUB_RELEASE_BASE}/time-dilation-bg.png`,
  "desk-bg.png": `${GITHUB_RELEASE_BASE}/desk-bg.png`,
  "asika-k.png": `${GITHUB_RELEASE_BASE}/asika-k.png`,
  "avani-manoj.png": `${GITHUB_RELEASE_BASE}/avani-manoj.png`,
  "r-s-sreelakshmi.png": `${GITHUB_RELEASE_BASE}/avani-manoj.png`,
  "niba-nasrin.png": `${GITHUB_RELEASE_BASE}/niba-nasrin.png`,
  "nivedya.png": `${GITHUB_RELEASE_BASE}/nivedya.png`,
  "sefana-elizabeth.png": `${GITHUB_RELEASE_BASE}/sefana-elizabeth.png`,
  "sefana-elizabeth-manam.png": `${GITHUB_RELEASE_BASE}/sefana-elizabeth-manam.png`,
  "celestial-clock-art.jpg": `${GITHUB_RELEASE_BASE}/celestial-clock-art.jpg`,
  "clock-memory-art.jpg": `${GITHUB_RELEASE_BASE}/clock-memory-art.jpg`,
  "clock-essay-summary.wav": `${GITHUB_RELEASE_BASE}/clock-essay-summary.wav`,
  "clock-essay-summary.xml": `${GITHUB_RELEASE_BASE}/clock-essay-summary.xml`,
  "gecw-mist.webm": `${GITHUB_RELEASE_V2_BASE}/gecw-mist.webm`,
  "gecw-mist.mp4": `${GITHUB_RELEASE_V2_BASE}/gecw-mist.mp4`,
  "gecw-mist-poster.webp": `${GITHUB_RELEASE_V2_BASE}/gecw-mist-poster.webp`,
  "time-dilation.mp3": `${GITHUB_RELEASE_V2_BASE}/time-dilation.mp3`,
  "tick-tick-bg.jpg": `${GITHUB_RELEASE_V2_BASE}/tick-tick-bg.jpg`,
  "tick-tick-art.webp": `${GITHUB_RELEASE_V2_BASE}/tick-tick-art.webp`,
  "version-zero-art.webp": `${GITHUB_RELEASE_V2_BASE}/version-zero-art.webp`,
}

export function resolveAsset(path: string): string {
  if (!path) return ""
  let cleanPath = path.startsWith("/") ? path.slice(1) : path
  if (cleanPath.startsWith("assets/")) {
    cleanPath = cleanPath.slice("assets/".length)
  }
  if (ASSET_MAP[cleanPath]) return ASSET_MAP[cleanPath]
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path
  }
  return `${GITHUB_RELEASE_BASE}/${cleanPath}`
}

