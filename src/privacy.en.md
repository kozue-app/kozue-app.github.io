# Kozue Privacy Policy

Last updated: November 22, 2026

[Español](PRIVACY.es.md)

Kozue is a feed reader (RSS, Atom, JSON Feed) for Windows. This policy explains what data Kozue handles and where it goes.

**In short:** Kozue has no servers of its own. It collects no usage data, has no analytics or advertising, and sends nothing to its developer. What you do in Kozue stays on your PC or goes to the services you choose.

## Controller

Yukio Mizuta (Giovanni Ceballos Contreras)  
c/o Autorenglück #49349  
Albert-Einstein-Str. 47  
02977 Hoyerswerda  
Germany  
Email: [hello@kozue.app](mailto:hello@kozue.app)

## What Kozue stores on your PC

In Kozue's data folder, in your Windows account:

- Your settings and your accounts (the service address and user name).
- The passwords, keys and tokens of your accounts, encrypted with Windows data protection (only your Windows user can decrypt them).
- Your feeds, folders and articles: those Kozue downloads in serverless mode and those it keeps for offline reading.
- Your tags, saved links, filters and the playback position of what you listen to or watch.
- A log of Kozue's errors (`errores.json`). It may include addresses of your services or feeds; Kozue removes them, along with keys, email addresses and your Windows user name, before showing the log or before you send it.

None of this leaves your PC except in the cases below. You can delete it by uninstalling Kozue or removing an account in Kozue.

## What Kozue connects to

Kozue only connects to what you choose to use:

- **Your feed service** (Miniflux, Feedbin, Inoreader, Nextcloud News or another), with your credentials, to read and mark your articles. If you use Kozue's sync, your tags, saved links, filters and channels are stored on that same service. That service handles your data under its own policy.
- **The websites and feeds you subscribe to**: without a server, Kozue downloads feeds and site icons directly. When you ask for an article's full text, it downloads the article's page.
- **What articles contain**: images, audio, video and embedded content (for example, YouTube videos, which Kozue loads from `youtube-nocookie.com`) load from their servers when you open the article.
- **YouTube and Twitch**, if you add channels to Live or a YouTube address: Kozue checks their sites to see what is live and to find a channel's feed.
- **Radio stations and podcasts** you listen to.
- **Optional services you set up yourself** (Live and Nostr): Kozue requests what you need through the address you enter.

In all these connections, the receiving server sees your IP address and the usual data of a web request, as with any browser. Kozue adds no identifiers of its own.

## Error reports

Kozue never sends errors on its own. In Settings → Diagnostics you can view, copy or save the error log. "Send to GitHub…" opens your browser with a ready-made report (Kozue and Windows versions, language, service type without its address, and the errors, without private data). You review it and send it yourself, with your GitHub account. Reports are public and GitHub handles them under its own policy.

## Downloads and updates

If you download Kozue from the Microsoft Store, winget or GitHub, Microsoft or GitHub handle the data of that download under their own policies. Kozue does not receive that data.

## This website (kozue.app)

The kozue.app website is hosted on GitHub Pages (GitHub, Inc.). When you visit it, GitHub receives your IP address and the usual data of a web request to serve the pages and protect the service, under its own privacy policy. The website uses no cookies, analytics or third-party content: fonts are served from the website itself. If you choose a language, it is saved in your browser (local storage) to show you that language next time; it never leaves your browser.

## Children

Kozue is not directed at children under 16 and collects no one's data.

## Your rights

Since Kozue does not send your data to its developer, everything it stores is on your PC and under your control. For any question about this policy or about your data protection rights (access, rectification, erasure, objection…), write to the email above. You can also lodge a complaint with the data protection authority of your country.

## Changes

If this policy changes, the new version will be published here with its date.
