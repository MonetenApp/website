#!/usr/bin/env python3
"""Checks the website before it is published.

A local link or image must point to a file in site/, because GitHub Pages serves nothing else.
A page must load nothing from another host, because the privacy page promises that.
A text must have no em or en dash, the writing rule of the Moneten project.
"""
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
site = root / "site"
errors = []

for page in sorted(site.glob("*.html")):
	html = page.read_text(encoding="utf-8")
	for tag in re.findall(r"<(?:img|source|script|link|iframe|video|audio)\b[^>]*>", html):
		for url in re.findall(r'\b(?:src|srcset|href)="([^"]+)"', tag):
			if re.match(r"(?:https?:)?//", url) and not re.search(r'\brel="canonical"', tag):
				errors.append(f"{page.name}: loads {url} from another host")
	for value in re.findall(r'\b(?:href|src|srcset)="([^"]*)"', html):
		for url in re.split(r"\s*,\s*", value):
			path = re.split(r"[#?\s]", url.strip())[0]
			if path and path != "./" and ":" not in path and not path.startswith("//") and not (site / path).exists():
				errors.append(f"{page.name}: {path} does not exist")

for text in [*site.glob("*.html"), *site.glob("*.css"), root / "README.md"]:
	for number, line in enumerate(text.read_text(encoding="utf-8").splitlines(), 1):
		if "–" in line or "—" in line:
			errors.append(f"{text.relative_to(root)}:{number}: em or en dash")

print("\n".join(errors) or "Website check passed.")
sys.exit(1 if errors else 0)
