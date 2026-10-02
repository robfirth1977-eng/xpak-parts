# Bowel Diary

A private bowel diary that works on any phone or computer. Patients log each visit, then create a PDF report for their doctor. All data stays on the patient's device. Nothing is sent anywhere.

## What it does

- Logs each bowel movement: Bristol stool type, ease, emptying, pain, blood or mucus, and notes
- Daily notes for food, drink, sleep and stress
- PDF report with a summary, a stool type chart and the full daily log
- Backup and restore to a file
- Can be installed on the home screen and works offline

## Making a version for a clinic

1. Copy the whole `bowel-diary` folder.
2. Put the clinic's logo in the folder, for example `logo.png`.
3. Open `brand.js` and fill in the details:

```js
window.BRAND = {
  clinicName: "Riverside Pelvic Health",
  logo: "logo.png",
  color: "#5b3fa0",
  contact: "01234 567890 · hello@riverside.co.uk",
  instructions: "Please fill this in for 7 days and bring the PDF report to your appointment.",
  days: 7
};
```

4. Open `sw.js` and change the number in `VERSION` (for example `v3` to `v4`), so phones that already have the app get the update.
5. Optional: change `name` and `short_name` in `manifest.json` and replace the icon files if the clinic wants its own app icon.
6. Put the folder on a website (see below) and give patients the link.

The clinic's colour is used for the buttons and the PDF. If the colour is pale, the app uses dark text on top of it so it stays readable.

## Putting it online

It must be served from a website address (starting `https://`) to install on phones and work offline. Any simple static hosting works, for example GitHub Pages, Netlify or Cloudflare Pages. No server or database is needed.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The app |
| `brand.js` | Clinic branding settings |
| `manifest.json` | App name and icons for installing |
| `sw.js` | Makes the app work offline |
| `jspdf.umd.min.js` | Library that makes the PDF (jsPDF 2.5.2, MIT licence) |
| `icon*.png`, `icon.svg`, `apple-touch-icon.png` | App icons |
