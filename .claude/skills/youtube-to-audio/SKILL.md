---
name: youtube-to-audio
description: Download YouTube videos as audio files using yt-dlp. Command format - `yt-dlp [URL]` or `ya [URL]`
when_to_use: When you need to convert YouTube videos, livestreams, or playlists to MP3 or other audio formats. Use `/youtube-to-audio [URL]` to download with optimized settings.
argument-hint: "[youtube-url]"
arguments: "url"
user-invocable: true
allowed-tools: "Bash"
---

# YouTube to Audio Downloader

Download YouTube videos as high-quality audio files using `yt-dlp`.

## Quick Start

```bash
# Download single video as MP3
yt-dlp -x --audio-format mp3 --audio-quality 192 "https://www.youtube.com/watch?v=..."

# Download as audio (best available format)
ya "https://www.youtube.com/watch?v=..."

# Download entire playlist
yt-dlp -x --audio-format mp3 "https://www.youtube.com/playlist?list=..."

# Download with metadata (album art, title, etc)
yt-dlp -x --audio-format mp3 -P ~/Music "https://www.youtube.com/watch?v=..."
```

## Common Options

| Flag | Purpose |
|------|---------|
| `-x` | Extract audio only (no video) |
| `--audio-format mp3` | Convert to MP3 format |
| `--audio-quality 192` | Set audio bitrate (128, 192, 256, 320) |
| `-P ~/Music` | Save to specific directory |
| `-o "%(title)s.%(ext)s"` | Custom filename format |
| `--playlist-items 1-5` | Download specific playlist items |

## Install yt-dlp

```bash
# Using pip
pip install yt-dlp

# Using brew (macOS)
brew install yt-dlp

# Using apt (Linux)
sudo apt install yt-dlp

# Create shorthand alias
alias ya='yt-dlp -x --audio-format mp3 --audio-quality 192'
```

## Add Alias to `.bashrc` or `.zshrc`

```bash
# Add this line to your shell config
alias ya='yt-dlp -x --audio-format mp3 --audio-quality 192'

# Then reload:
source ~/.bashrc  # or source ~/.zshrc
```

## Examples

**Download music video:**
```bash
ya "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

**Download podcast series:**
```bash
yt-dlp -x --audio-format mp3 "https://www.youtube.com/channel/UC..."
```

**Download with better quality:**
```bash
yt-dlp -x --audio-format mp3 --audio-quality 320 "https://www.youtube.com/watch?v=..."
```

**Save to Music folder with title:**
```bash
yt-dlp -x --audio-format mp3 -P ~/Music -o "%(title)s.%(ext)s" "https://www.youtube.com/watch?v=..."
```

## Troubleshooting

- **"yt-dlp not found"** → Install it: `pip install yt-dlp`
- **"ffmpeg not found"** → Install ffmpeg: `brew install ffmpeg` or `apt install ffmpeg`
- **Poor audio quality** → Increase bitrate: `--audio-quality 320`
- **Slow download** → Use `-S +size` to prioritize files by size

## Notes

- Respect copyright & only download content you have permission to use
- Some videos are region-restricted or age-gated
- Live streams require special handling: `yt-dlp --wait-for-video 3600 [URL]`
- To update yt-dlp: `pip install --upgrade yt-dlp`

