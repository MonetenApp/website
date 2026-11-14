# Website

This repository holds the website of [Moneten](https://github.com/MonetenApp/Moneten), the open-source banking app for the Mac, at [monetenapp.com](https://monetenapp.com). The site is in German. It has no build step, no scripts, and no resources from other hosts, so the privacy page can say that the site sets no cookies and loads nothing from other servers.

- `site/index.html` presents the app, the extensions, and the state of the project.
- `site/impressum.html` and `site/datenschutz.html` are the legal pages of Adanos Software GmbH, which runs the site.
- `site/style.css` takes its colors from the app icon and follows the light or dark appearance of the system.
- `site/img/` holds the app icon, the screenshots as WebP in a light and a dark version, and `og-image.jpg` for link previews.

## Checks

`python3 scripts/check.py` runs on every pull request. It fails when a local link or image in `site/` points to a file that does not exist, when a page loads a resource from another host, or when a text has an em or en dash. Links to other sites are fine. Run it before a pull request.

## Publishing

The workflow `.github/workflows/pages.yml` publishes `site/` to GitHub Pages on every push to `main`. Before its first run:

1. Set the Pages source of the repository to "GitHub Actions".
2. Set the custom domain to monetenapp.com and turn on "Enforce HTTPS".
3. Point the DNS records of monetenapp.com to GitHub Pages, and add a `www` CNAME record to `monetenapp.github.io`.

If the workflow ran before Pages was on, it failed. Start the workflow "Pages" by hand in the Actions tab.

## Screenshots

The screenshots show the made-up data of the debug harness of the app, never real accounts. To make new ones in the Moneten repository, build the app with `scripts/build-app.sh debug`. Start it with `MONETEN_DATA_DIR` and `MONETEN_DEBUG_DIR` set to empty folders and with the arguments `"-NSWindow Frame main" "120 60 1440 900 0 0 1800 1130"`, which open the main window at 1440 by 900 points. Send the commands `create`, `seed`, `select Girokonto`, `appearance light` or `appearance dark`, and `view list` or `view barChart`, and capture the window with `screencapture -o -l <window number>`. Scale the images to 2080 pixels wide and convert them with `cwebp -q 88`.

Check a change by opening `site/index.html` in a browser, in the light and the dark appearance and at the width of a phone.
