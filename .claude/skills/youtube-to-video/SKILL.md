---
name: youtube-to-video
description: Download YouTube videos using yt-dlp. Command - `yt [URL]` downloads best quality video+audio
when_to_use: When you need to download YouTube videos, livestreams, or playlists in their original quality
argument-hint: "[youtube-url]"
arguments: "url"
user-invocable: true
allowed-tools: "Bash"
---

# YouTube Video Downloader

Download YouTube videos in best available quality using `yt-dlp`.

## Quick Start

```bash
# Download best quality (video + audio)
yt "https://www.youtube.com/watch?v=..."

# Download specific format
yt-dlp -f "bestvideo+bestaudio/best" "https://www.youtube.com/watch?v=..."

# Download playlist
yt "https://www.youtube.com/playlist?list=..."

# Download with custom filename
yt-dlp -o "%(title)s.%(ext)s" "https://www.youtube.com/watch?v=..."
```

## Setup Alias

```bash
# Add to ~/.bashrc or ~/.zshrc
alias yt='yt-dlp -f "bestvideo+bestaudio/best" -o "%(title)s.%(ext)s"'

# Then reload:
source ~/.bashrc  # or source ~/.zshrc
```

## Common Options

| Flag | Purpose |
|------|---------|
| `-f "bestvideo+bestaudio/best"` | Best quality video+audio merge |
| `-o "%(title)s.%(ext)s"` | Save with video title as filename |
| `-P ~/Videos` | Save to specific directory |
| `--playlist-items 1-10` | Download specific playlist items |
| `-S +size` | Sort by file size |
| `--merge-output-format mp4` | Force MP4 output |
| `--no-playlist` | Skip playlist (download single video) |

## Download Formats

```bash
# Best quality overall
yt-dlp -f "bestvideo+bestaudio/best" "URL"

# Video only (no audio)
yt-dlp -f "bestvideo" "URL"

# Audio only
yt-dlp -f "bestaudio" "URL"

# MP4 format specifically
yt-dlp -f "best[ext=mp4]" "URL"

# List available formats
yt-dlp -F "URL"
```

## Examples

**Download single video:**
```bash
yt "https://www.youtube.com/watch?v=..."
```

**Download and save to Videos folder:**
```bash
yt-dlp -P ~/Videos "https://www.youtube.com/watch?v=..."
```

**Download entire channel:**
```bash
yt-dlp "https://www.youtube.com/@channelname/videos"
```

**Download livestream:**
```bash
yt-dlp --wait-for-video 3600 "https://www.youtube.com/watch?v=..."
```

**Download with metadata:**
```bash
yt-dlp --write-info-json --write-description "URL"
```

## Requirements

```bash
# Install yt-dlp
pip install yt-dlp

# Install ffmpeg (required for merging video+audio)
brew install ffmpeg      # macOS
sudo apt install ffmpeg  # Linux
choco install ffmpeg     # Windows
```

## Troubleshooting

- **"ffmpeg not found"** → Install it (see Requirements above)
- **"Video codec not supported"** → Use `--merge-output-format mp4`
- **Slow download** → Use `-S +size` or download lower quality with `-f "best[height<=720]"`
- **Age-restricted video** → May require authentication
- **Permission error** → Check folder permissions or use different save location

## Update yt-dlp

```bash
pip install --upgrade yt-dlp
```

## Notes

- Respect copyright & only download content you have permission to use
- Some videos are region-restricted or require authentication
- Livestreams can be downloaded while streaming with `--wait-for-video`
- Downloaded files include metadata by default

