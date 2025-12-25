# Factory Tour Video Setup

## How to Add Your Factory Tour Video

To display your factory tour video in the modal popup:

1. **Prepare your video file:**
   - Format: MP4 (recommended for best browser compatibility)
   - Recommended resolution: 1920x1080 (Full HD) or 1280x720 (HD)
   - File name: `factory-tour.mp4`

2. **Place the video file:**
   - Copy your `factory-tour.mp4` file to the root directory of this project
   - Path should be: `C:\Users\admin\Downloads\latest-katllp\factory-tour.mp4`

3. **Video will automatically:**
   - Play muted (no audio)
   - Play at 0.75x speed (slower playback)
   - Loop continuously
   - Show video controls for user interaction

## Current Configuration

- **Video Source:** `/factory-tour.mp4`
- **Playback Speed:** 0.75x (configurable in `components/VideoModal.tsx`)
- **Audio:** Muted by default
- **Controls:** Enabled (play/pause, seek, fullscreen)

## To Change Video Settings

Edit `components/VideoModal.tsx`:
- **Playback speed:** Change `videoRef.current.playbackRate = 0.75;` (line 14)
- **Audio:** Change `videoRef.current.muted = true;` (line 16)
- **Loop:** Modify the `loop` attribute on the `<video>` tag (line 64)

## Placeholder Video

Until you add your video file, the video player will show a "file not found" message. This is normal and will be resolved once you add your `factory-tour.mp4` file.
