# O's Travel Website — Editing Guide

Everything you need to change **text**, **images**, **contact info**, and **tour packages** yourself.
No coding background needed — just open the file, change the words between the quotes, and save.

---

## 1. How to run / view the website

Open a terminal in the `turmet-nextjs` folder and run:

```
npm run dev
```

Then open **http://localhost:3000** in your browser. Leave the terminal open while working — the
site updates automatically every time you save a file. Press `Ctrl + C` in the terminal to stop it.

> ⚠️ **Never run `npm run build` while `npm run dev` is running.** It corrupts the cache and you'll
> see "Internal Server Error". If that happens: stop the server, delete the `.next` folder, run
> `npm run dev` again.

---

## 2. The two things you'll edit

| You want to change… | You edit… |
|---|---|
| **Words / text / info** | a `.tsx` file inside `src/app/...` (text lives between `quotes` or `>like this<`) |
| **A picture** | a file inside `public/assets/img/...` (replace the file, keep the same name) |

**Golden rule for editing text:** only change the words. Don't delete the `<` `>` `"` symbols around them.

---

## 3. How to change IMAGES

All images live in **`public/assets/img/`**. To replace any picture:
1. Find the matching file (see tables below).
2. Put your new photo there with the **exact same file name** (e.g. your new hero photo must be named `hero2.jpg`).
3. Refresh the browser. Done — no code change needed.

> 💡 Best image format: `.jpg`. Keep files **under ~400 KB** so the site stays fast. If your photos
> are huge (phone/camera photos are often 5–40 MB), use the helper in section 7 to shrink them.

### Your custom pages

| Image file (inside `public/assets/img/`) | Where it shows |
|---|---|
| `logo/os-logo.png` | Logo — top header, footer, browser tab |
| `breadcrumb/os-banner.jpg` | The banner photo at the top of every inner page |
| `guests/01.jpg` … `guests/09.jpg` | Happy Guests gallery photos |
| `legitimacy/dti.jpg` | "DTI Business Name Registration" card |
| `legitimacy/business-permit.jpg` | "Mayor's / Business Permit" card |
| `legitimacy/bir.jpg` | "BIR Certificate of Registration" card |

> The 3 legitimacy images are just scenery placeholders. **Replace them with photos/scans of your
> real permits** when you have them.

### Homepage images

| Image file (inside `public/assets/img/`) | Where it shows |
|---|---|
| `hero/hero2.jpg` | Big top hero background |
| `about/03.jpg`, `about/05.jpg` | The two photos in the "About O's Travel" section |
| `destination/new/01.jpg` → `04.jpg` | The 4 sliding destination cards (Moalboal, Oslob, Bohol, Cebu) |
| `feature/01.jpg` → `04.jpg` | The 4 "Most Popular Tours" cards |
| `choose-us-bg-2.jpg` | "Why choose us" section background |
| `video-bg.jpg` | The video / story section background |
| `testimonial/01.jpg` | Photo beside customer reviews |
| `news/04.jpg` → `07.jpg` | The 4 blog/news thumbnails |
| `instagram/01.jpg` → `06.jpg` | The Instagram photo strip near the footer |

---

## 4. How to change TEXT / INFO

Open the file, find the words, change them between the quotes/tags, save.

### Contact details (phone, email, address) — appears in several places

| What | File to open | Look for |
|---|---|---|
| Footer (bottom of every page) | `src/app/Components/Footer/Footer1.tsx` | the address, `ostravelandtoursservices@gmail.com`, `0933 459 1419` |
| Contact page cards | `src/app/Components/Contact/Contact.tsx` | "Our Office", the email, the phone |
| Contact page map | `src/app/Components/Contact/Contact.tsx` | the `<iframe ...>` line — change `Talamban,+Cebu+City` to a new location |

> If you change your phone/email, update it in **both** `Footer1.tsx` **and** `Contact.tsx`.

### Page-by-page text

| Page | Main file(s) to edit for its words |
|---|---|
| **Home — hero headline** | `src/app/Components/HeroBanner/HeroBanner2.tsx` |
| **Home — About section** | `src/app/Components/About/About2.tsx` |
| **Home — destination cards** | `src/app/Components/Destination/Destination2.tsx` (the `location` and `title` lines) |
| **Home — popular tours** | `src/app/Components/FeaturedTour/FeaturedTour1.tsx` (the `location`, `title`, `price` lines) |
| **Home — reviews** | `src/app/Components/Testimonial/Testimonial2.tsx` |
| **Home — blog** | `src/app/Components/Blog/Blog2.tsx` |
| **About page** | `src/app/Components/About/About2.tsx` (+ `Choose1`, `Counter4`, `Team1` for that page) |
| **Legitimacy Corner** | `src/app/Components/Legitimacy/Legitimacy.tsx` (trust points, document titles, CTA) |
| **Happy Guests** | `src/app/Components/HappyGuests/HappyGuests.tsx` (photo captions + the reviews) |
| **Contact** | `src/app/Components/Contact/Contact.tsx` |
| **Tour Packages** | `src/app/Components/TourPackages/packagesData.ts` (see section 5) |
| **Top menu links** | `src/app/Components/Header/Nav.tsx` |
| **Footer links / columns** | `src/app/Components/Footer/Footer1.tsx` |

**Example — changing the gallery captions** (in `HappyGuests.tsx`):
```
{ img: '/assets/img/guests/01.jpg', caption: 'Cebu City Tour' },
```
Change only `Cebu City Tour` to whatever you want. Leave the rest as-is.

---

## 5. How to edit TOUR PACKAGES (prices & itineraries)

Everything on the Tour Packages page comes from **one file**:
`src/app/Components/TourPackages/packagesData.ts`

- `joinerPackages` = the Joiner tab. Each has a single `price` like `'₱1,580 / Pax'`.
- `privatePackages` = the Private tab. Each has a `pricing` list from 1 pax to 12 pax.

**To change a price:** find the package by its `title`, edit the number in `price` (joiner) or in the
`pricing` list (private). Example:
```
price: '₱1,580 / Pax',          // joiner — change the number
{ pax: '2 pax', price: '₱3,412/pax' },   // private — change the number
```

**To edit an itinerary line:** each package has `blocks`. Inside `items: [ ... ]` every line in quotes
is one bullet point. Change the words, add a new `'line',`, or delete a line.

**To remove a package:** delete its whole `{ ... },` block.
**To add a package:** copy an existing `{ ... },` block, paste it, and change the details. Keep the
commas between blocks.

> Tip: make a copy of `packagesData.ts` before big changes, so you can undo by restoring it.

---

## 6. Logo & colors

- **Logo:** replace `public/assets/img/logo/os-logo.png` (keep the name). It shows in the header,
  footer, and browser tab automatically.
- **Brand color:** the teal is set once in `src/app/assets/main.css` near the top:
  ```
  --theme: #1CA8CB;
  ```
  Change that hex code to recolor buttons and accents across the whole site.

---

## 7. Shrinking big photos before using them (optional helper)

If your photos are very large, drop them into the `Os_asset` folder, open a terminal in
`turmet-nextjs`, and run:

```
node scripts/fill-homepage-images.mjs
```
This refills the homepage images from `Os_asset` (auto-shrunk). To change which photo goes where,
open `scripts/fill-homepage-images.mjs` and edit the `map` list. There's also
`scripts/fill-images.mjs` for the gallery / legitimacy / banner images.

(You only need these scripts if you want auto-shrinking. Otherwise just drop a normal-sized `.jpg`
straight into `public/assets/img/...` — that's the simplest way.)

---

## 8. If something breaks

1. **"Internal Server Error" / blank page:** stop the server (`Ctrl + C`), delete the `.next` folder,
   run `npm run dev` again.
2. **An image shows blank:** the file name or folder doesn't match. Check the spelling and that it's
   in the right `public/assets/img/...` folder.
3. **A page won't load after editing text:** you probably deleted a quote `"`, comma `,`, or a
   `<` `>`. Undo your last change (`Ctrl + Z`) and try again, changing only the words.

---

*Made for O's Travel and Tours Services — Talamban, Cebu City.*
```
