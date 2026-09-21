---
name: ffmpeg-media-tools
description: FFmpeg tools for media conversion, editing, and processing. Handle video, audio, images with ffmpeg CLI
when_to_use: Converting video formats, extracting audio, trimming, merging, adding subtitles, watermarks, batch processing media files
argument-hint: "[input-file] [output-file]"
user-invocable: true
allowed-tools: "Bash"
---

# FFmpeg Media Tools

Comprehensive media handling with FFmpeg — convert, edit, and process video & audio.

## Installation

```bash
# macOS
brew install ffmpeg

# Linux
sudo apt install ffmpeg

# Windows (via choco or download)
choco install ffmpeg

# Verify installation
ffmpeg -version
```

## Common Tasks

### 🎬 Video Conversion

```bash
# Convert to MP4
ffmpeg -i input.mkv -c:v libx264 -c:a aac output.mp4

# Convert to WebM
ffmpeg -i input.mp4 -c:v libvpx-vp9 -c:a libopus output.webm

# Convert to different resolution
ffmpeg -i input.mp4 -vf scale=1280:720 output.mp4

# Reduce file size (lower bitrate)
ffmpeg -i input.mp4 -b:v 1M -b:a 128k output.mp4
```

### 🎵 Audio Extraction & Processing

```bash
# Extract audio from video
ffmpeg -i video.mp4 -q:a 0 -map a audio.mp3

# Convert audio format
ffmpeg -i audio.wav -acodec libmp3lame -ab 192k audio.mp3

# Change audio sample rate
ffmpeg -i audio.wav -ar 44100 audio_44k.wav

# Merge multiple audio files
ffmpeg -i "concat:audio1.mp3|audio2.mp3" -acodec libmp3lame -ab 192k output.mp3
```

### ✂️ Trimming & Cutting

```bash
# Trim video (start at 10s, duration 30s)
ffmpeg -i input.mp4 -ss 10 -t 30 output.mp4

# Cut out a section (remove 10-30 seconds)
ffmpeg -i input.mp4 -vf "select='not(between(t,10,30))',setpts='N/(FRAME_RATE*TB)'" output.mp4

# Keep last 60 seconds of video
ffmpeg -sseof -60 -i input.mp4 -c copy output.mp4
```

### 🔗 Merging & Concatenating

```bash
# Merge video + audio
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -shortest output.mp4

# Concatenate videos (create concat.txt first)
ffmpeg -f concat -safe 0 -i concat.txt -c copy output.mp4

# Concat.txt format:
# file 'video1.mp4'
# file 'video2.mp4'
# file 'video3.mp4'
```

### 🖼️ Thumbnails & Snapshots

```bash
# Extract single frame at 30 seconds
ffmpeg -i video.mp4 -ss 00:00:30 -vframes 1 thumbnail.jpg

# Extract frames at intervals (every second)
ffmpeg -i video.mp4 -vf fps=1 frame_%03d.jpg

# Create thumbnail grid (contact sheet)
ffmpeg -i video.mp4 -vf fps=1/10,scale=200:200,tile=4x4 sheet.png
```

### 📝 Subtitles & Captions

```bash
# Add subtitle file to video
ffmpeg -i video.mp4 -i subtitle.srt -c:v copy -c:a copy -c:s mov_text output.mp4

# Burn subtitles into video
ffmpeg -i video.mp4 -vf subtitles=subtitle.srt output.mp4

# Extract subtitles from video
ffmpeg -i video.mp4 -map 0:s:0 subtitle.srt
```

### 🎨 Effects & Watermarks

```bash
# Add watermark/logo
ffmpeg -i video.mp4 -i watermark.png -filter_complex "overlay=10:10" output.mp4

# Rotate video
ffmpeg -i video.mp4 -vf "rotate=90*PI/180" output.mp4

# Flip video horizontally
ffmpeg -i video.mp4 -vf hflip output.mp4

# Add fade in/out
ffmpeg -i video.mp4 -vf "fade=t=in:st=0:d=2,fade=t=out:st=8:d=2" output.mp4

# Speed up/slow down video
ffmpeg -i video.mp4 -filter:v "setpts=0.5*PTS" output.mp4  # 2x speed
ffmpeg -i video.mp4 -filter:v "setpts=2*PTS" output.mp4    # 0.5x speed
```

### 🔊 Audio Adjustments

```bash
# Increase volume (2x)
ffmpeg -i input.mp3 -filter:a "volume=2.0" output.mp3

# Decrease volume (0.5x)
ffmpeg -i input.mp3 -filter:a "volume=0.5" output.mp3

# Normalize audio (auto-level)
ffmpeg -i input.mp3 -af loudnorm output.mp3

# Add silence (5 seconds at end)
ffmpeg -i input.mp3 -af "apad=whole_len=`echo 'scale=0; 44100 * 5' | bc`" output.mp3
```

### 📊 Information & Analysis

```bash
# Get file info
ffprobe -show_entries format video.mp4

# List all streams
ffmpeg -i video.mp4

# Get duration in seconds
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1:noprint_wrappers=1 video.mp4

# Get frame rate
ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 video.mp4
```

### 🔄 Batch Processing

```bash
# Convert all MP4 files to WebM
for file in *.mp4; do
  ffmpeg -i "$file" -c:v libvpx-vp9 -c:a libopus "${file%.mp4}.webm"
done

# Resize all videos to 720p
for file in *.mp4; do
  ffmpeg -i "$file" -vf scale=1280:720 "resized_$file"
done

# Extract audio from all videos
for file in *.mp4; do
  ffmpeg -i "$file" -q:a 0 -map a "${file%.mp4}.mp3"
done
```

## Common Presets

```bash
# Fast encoding (lower quality)
ffmpeg -i input.mp4 -preset fast -c:v libx264 output.mp4

# Balanced encoding
ffmpeg -i input.mp4 -preset medium -c:v libx264 output.mp4

# Best quality (slow)
ffmpeg -i input.mp4 -preset slow -c:v libx264 output.mp4

# Web-optimized
ffmpeg -i input.mp4 -c:v libx264 -preset fast -crf 23 -c:a aac output.mp4
```

## Useful Flags Reference

| Flag | Purpose |
|------|---------|
| `-i` | Input file |
| `-o` | Output file |
| `-c:v` | Video codec |
| `-c:a` | Audio codec |
| `-b:v` | Video bitrate |
| `-b:a` | Audio bitrate |
| `-vf` | Video filter |
| `-af` | Audio filter |
| `-ss` | Start time (seek) |
| `-t` | Duration |
| `-q:a` | Audio quality (0=best) |
| `-preset` | Encoding speed (ultrafast→veryslow) |
| `-crf` | Quality (0=best, 51=worst) |

## Resources

- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
- [Filter Documentation](https://ffmpeg.org/ffmpeg-filters.html)
- [Encoding Guide](https://trac.ffmpeg.org/wiki/Encode)

