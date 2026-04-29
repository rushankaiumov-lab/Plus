#!/usr/bin/env python3
import argparse
from pathlib import Path

from PIL import Image, ImageChops
from playwright.sync_api import sync_playwright


def screenshot_url(url: str, out_path: Path, width: int, height: int, wait_ms: int) -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport={"width": width, "height": height}, device_scale_factor=1)
        page = context.new_page()
        page.goto(url, wait_until="networkidle")
        page.wait_for_timeout(wait_ms)
        page.screenshot(path=str(out_path), full_page=False)
        context.close()
        browser.close()


def diff_images(reference_path: Path, actual_path: Path, diff_path: Path):
    reference = Image.open(reference_path).convert("RGBA")
    actual = Image.open(actual_path).convert("RGBA")

    if reference.size != actual.size:
        actual = actual.resize(reference.size)

    diff = ImageChops.difference(reference, actual)
    diff_bbox = diff.getbbox()

    if diff_bbox is None:
        diff.save(diff_path)
        return 0, 0.0

    # Count non-transparent changed pixels
    alpha = diff.split()[-1]
    changed_pixels = sum(1 for px in alpha.getdata() if px > 0)
    total_pixels = reference.size[0] * reference.size[1]
    percent = (changed_pixels / total_pixels) * 100 if total_pixels else 0
    diff.save(diff_path)
    return changed_pixels, percent


def main():
    parser = argparse.ArgumentParser(description="Capture screen and compare against reference image.")
    parser.add_argument("--url", required=True, help="URL to screenshot")
    parser.add_argument("--reference", required=True, help="Path to reference image")
    parser.add_argument("--actual-out", default="visual-check/actual.png", help="Output path for captured screenshot")
    parser.add_argument("--diff-out", default="visual-check/diff.png", help="Output path for diff image")
    parser.add_argument("--wait-ms", type=int, default=1200, help="Wait time after page load before screenshot")
    args = parser.parse_args()

    reference_path = Path(args.reference).resolve()
    actual_path = Path(args.actual_out).resolve()
    diff_path = Path(args.diff_out).resolve()

    reference = Image.open(reference_path)
    width, height = reference.size

    actual_path.parent.mkdir(parents=True, exist_ok=True)
    diff_path.parent.mkdir(parents=True, exist_ok=True)

    screenshot_url(args.url, actual_path, width, height, args.wait_ms)
    changed_pixels, changed_percent = diff_images(reference_path, actual_path, diff_path)

    print(f"reference: {reference_path}")
    print(f"actual:    {actual_path}")
    print(f"diff:      {diff_path}")
    print(f"changed_pixels: {changed_pixels}")
    print(f"changed_percent: {changed_percent:.4f}%")


if __name__ == "__main__":
    main()
