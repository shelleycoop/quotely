#!/usr/bin/env python3
"""Generate simple branded PNGs without third-party image libraries."""

from __future__ import annotations

import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "assets"


def png(width: int, height: int, pixels: bytes) -> bytes:
    def chunk(tag: bytes, data: bytes) -> bytes:
        return struct.pack(">I", len(data)) + tag + data + struct.pack(
            ">I", zlib.crc32(tag + data) & 0xFFFFFFFF
        )

    raw = b"".join(b"\x00" + pixels[y * width * 4 : (y + 1) * width * 4] for y in range(height))
    return b"".join(
        [
            b"\x89PNG\r\n\x1a\n",
            chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)),
            chunk(b"IDAT", zlib.compress(raw, 9)),
            chunk(b"IEND", b""),
        ]
    )


def fill(w: int, h: int, color: tuple[int, int, int, int]) -> bytearray:
    buf = bytearray(w * h * 4)
    r, g, b, a = color
    for i in range(0, len(buf), 4):
        buf[i : i + 4] = bytes((r, g, b, a))
    return buf


def disk(buf: bytearray, w: int, h: int, cx: float, cy: float, radius: float, color: tuple[int, int, int, int]) -> None:
    r2 = radius * radius
    for y in range(h):
        dy = y + 0.5 - cy
        for x in range(w):
            dx = x + 0.5 - cx
            if dx * dx + dy * dy <= r2:
                i = (y * w + x) * 4
                buf[i : i + 4] = bytes(color)


def ellipse(buf: bytearray, w: int, h: int, cx: float, cy: float, rx: float, ry: float, color: tuple[int, int, int, int]) -> None:
    for y in range(h):
        dy = (y + 0.5 - cy) / ry
        for x in range(w):
            dx = (x + 0.5 - cx) / rx
            if dx * dx + dy * dy <= 1:
                i = (y * w + x) * 4
                buf[i : i + 4] = bytes(color)


def quote_marks(buf: bytearray, size: int, color: tuple[int, int, int, int], scale: float = 1.0) -> None:
    s = size
    # Two comma-like marks, slightly rotated in placement
    marks = [
        (0.38, 0.42),
        (0.58, 0.42),
    ]
    for mx, my in marks:
        cx, cy = s * mx, s * my
        ellipse(buf, s, s, cx, cy - 8 * scale, 42 * scale, 52 * scale, color)
        ellipse(buf, s, s, cx + 10 * scale, cy + 48 * scale, 28 * scale, 38 * scale, color)


def write(name: str, data: bytes) -> None:
    path = ROOT / name
    path.write_bytes(data)
    print(f"wrote {path} ({len(data)} bytes)")


def main() -> None:
    ROOT.mkdir(exist_ok=True)
    ink = (28, 25, 21, 255)
    terracotta = (196, 92, 38, 255)
    cream = (255, 248, 243, 255)
    transparent = (0, 0, 0, 0)

    size = 1024
    icon = fill(size, size, ink)
    disk(icon, size, size, size / 2, size / 2, 430, terracotta)
    quote_marks(icon, size, cream, scale=1.0)
    write("icon.png", png(size, size, bytes(icon)))

    fg = fill(size, size, transparent)
    disk(fg, size, size, size / 2, size / 2, 380, terracotta)
    quote_marks(fg, size, cream, scale=0.9)
    write("android-icon-foreground.png", png(size, size, bytes(fg)))

    bg = fill(size, size, ink)
    write("android-icon-background.png", png(size, size, bytes(bg)))

    mono = fill(size, size, transparent)
    disk(mono, size, size, size / 2, size / 2, 380, (255, 255, 255, 255))
    quote_marks(mono, size, (0, 0, 0, 255), scale=0.9)
    write("android-icon-monochrome.png", png(size, size, bytes(mono)))

    splash = fill(size, size, transparent)
    disk(splash, size, size, size / 2, size / 2, 320, terracotta)
    quote_marks(splash, size, cream, scale=0.75)
    write("splash-icon.png", png(size, size, bytes(splash)))

    fav = fill(192, 192, ink)
    disk(fav, 192, 192, 96, 96, 80, terracotta)
    ellipse(fav, 192, 192, 78, 82, 14, 18, cream)
    ellipse(fav, 192, 192, 112, 82, 14, 18, cream)
    write("favicon.png", png(192, 192, bytes(fav)))

    store = ROOT.parent / "assets" / "store"
    store.mkdir(exist_ok=True)
    fw, fh = 1024, 500
    feature = fill(fw, fh, ink)
    disk(feature, fw, fh, 220, 250, 160, terracotta)
    # scaled quote marks for feature graphic
    ellipse(feature, fw, fh, 190, 220, 28, 34, cream)
    ellipse(feature, fw, fh, 198, 268, 18, 24, cream)
    ellipse(feature, fw, fh, 250, 220, 28, 34, cream)
    ellipse(feature, fw, fh, 258, 268, 18, 24, cream)
    path = store / "feature-graphic.png"
    path.write_bytes(png(fw, fh, bytes(feature)))
    print(f"wrote {path}")


if __name__ == "__main__":
    main()
