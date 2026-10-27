# Google Play listing copy

Host `privacy-policy.md` at a public URL (GitHub Pages, your site, or Google Drive as a published page) and paste that URL into Play Console. Play requires a privacy policy URL even for apps that store data only on-device.

## App name

Quotely

## Short description (max 80 characters)

A quiet quotes reader. Daily line, rooms to browse, favorites that stay on-device.

## Full description

Quotely is a small library of lines worth keeping — wisdom, stoic calm, courage, love, work, and a little humor.

Open it in the morning for one quote chosen for the day. Wander ten rooms when you want more. Keep the ones that stay with you. Share a line when someone else might need it.

What you get
• A new quote each day, chosen from the library
• Ten collections you can browse without an account
• Search by author, theme, or a word you remember
• Favorites stored only on this device
• Copy and share in one tap
• Paper and ink themes, or follow the system
• Optional local reminder at 8:00 — no marketing messages

Quotely works offline. There are no ads and no sign-in.

Quotes are attributed to their speakers. They are short excerpts for reflection, not a substitute for the original works.

## Category

Lifestyle (or Books & Reference)

## Tags

quotes, daily quote, inspiration, stoic, wisdom, offline

## Content rating

Everyone. No user-generated content, no social features, no violence.

## Data safety form (typical answers)

- Does the app collect or share user data? **No**
- Is data encrypted in transit? **Not applicable** (no account, no upload)
- Can users request deletion? **Not applicable** (nothing stored on your servers; they can clear app data)
- Optional: notifications are local; declare POST_NOTIFICATIONS

If you later add analytics, crash reporting, or ads, you must update this form and the privacy policy before shipping.

## Store assets you still need

Play Console will ask for:

1. High-res icon 512×512 (`assets/icon.png` after generating)
2. Feature graphic 1024×500
3. At least 2 phone screenshots (1080×1920 is a safe size)
4. Privacy policy URL
5. A signed Android App Bundle from `eas build -p android --profile production`

## Build & submit

```bash
npm i -g eas-cli
eas login
eas build:configure
eas build -p android --profile production
eas submit -p android --latest
```

Create an upload keystore when EAS asks; keep the credentials. Set `android.package` (`com.quotely.app`) uniquely if that id is taken.
