# Application Icon

The application icon (`icon.svg`) is provided in SVG format. To generate PNG icons for different platforms:

## Using ImageMagick (Recommended)

```bash
# Install ImageMagick
# macOS: brew install imagemagick
# Ubuntu: sudo apt-get install imagemagick
# Windows: Download from https://imagemagick.org

# Generate icons
convert -background none icon.svg -resize 512x512 icon.png
convert -background none icon.svg -resize 256x256 icon@2x.png
convert -background none icon.svg -resize 128x128 icon@1x.png
```

## Using Online Converters

If you don't have ImageMagick, you can use online SVG to PNG converters like:
- https://cloudconvert.com/svg-to-png
- https://convertio.co/svg-png/

Upload `icon.svg` and download in the following sizes:
- 512x512 (icon.png)
- 256x256 (icon@2x.png)
- 128x128 (icon@1x.png)
- 16x16 (icon-16.png) - for Windows
- 32x32 (icon-32.png) - for Windows

## Platform-Specific Icons

### macOS (.icns)
Use the `iconutil` tool (comes with Xcode):
```bash
mkdir icon.iconset
sips -z 16 16     icon.png --out icon.iconset/icon_16x16.png
sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
sips -z 256 256   icon.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out icon.iconset/icon_512x512@2x.png
iconutil -c icns icon.iconset
```

### Windows (.ico)
Use an online ICO converter or a tool like `magick`:
```bash
magick convert icon.png icon.ico
```

### Linux
Most Linux systems use PNG directly. The AppImage, deb, and rpm packages will use the PNG file.

## electron-builder Support

electron-builder can automatically generate platform-specific icons from a single 512x512 PNG file. Just name it:
- macOS: `icon.icns` or `icon.png`
- Windows: `icon.ico` or `icon.png`
- Linux: `icon.png`

Place the icon files in the `assets/` directory or in the build resources directory.
