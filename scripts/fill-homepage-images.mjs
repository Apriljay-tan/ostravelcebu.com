import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC = "D:/O'S TRAVEL WEBSITE/OS_Travel/Os_asset";
const IMG = path.join(process.cwd(), 'public', 'assets', 'img');

const files = fs.readdirSync(SRC);
const find = (needle) => {
  const f = files.find((x) => x.toLowerCase().includes(needle.toLowerCase()));
  if (!f) throw new Error('No source match for: ' + needle);
  return path.join(SRC, f);
};

const P = {
  chocolateAerial: find('aerial-view-of-the-chocolate'),
  hangingBridge: find('hanging-bridge'),
  monkey: find('capuchin-monkey'),
  hammockCebu: find('hammock-on-tropical-beach-cebu'),
  kawasan: find('kawasan-falls'),
  boholLandscape: find('landscape-of-the-bohol'),
  leaningPalm: find('leaning-palm'),
  ph216: find('philippines-216'),
  ph231: find('philippines-231'),
  coron: find('tropical-beach-in-coron'),
  whaleshark: find('whalesharks-swimming'),
  womanPier: find('woman-in-swimsuit-sitting-on-a-wooden-pier'),
  seaTurtle: find('young-woman-swimming-with-rare-green-sea-turtle'),
};

// target (relative to public/assets/img) -> source photo
const map = {
  // Hero
  'hero/hero2.jpg': P.coron,
  // About section
  'about/03.jpg': P.hammockCebu,
  'about/05.jpg': P.womanPier,
  // Destination slider
  'destination/new/01.jpg': P.kawasan,
  'destination/new/02.jpg': P.whaleshark,
  'destination/new/03.jpg': P.chocolateAerial,
  'destination/new/04.jpg': P.seaTurtle,
  // Backgrounds
  'choose-us-bg-2.jpg': P.boholLandscape,
  'video-bg.jpg': P.leaningPalm,
  // Featured tours
  'feature/01.jpg': P.ph216,
  'feature/02.jpg': P.hangingBridge,
  'feature/03.jpg': P.ph231,
  'feature/04.jpg': P.monkey,
  // Testimonial side image
  'testimonial/01.jpg': P.womanPier,
  // Blog thumbnails
  'news/04.jpg': P.kawasan,
  'news/05.jpg': P.chocolateAerial,
  'news/06.jpg': P.hangingBridge,
  'news/07.jpg': P.hammockCebu,
  // Instagram strip
  'instagram/01.jpg': P.coron,
  'instagram/02.jpg': P.kawasan,
  'instagram/03.jpg': P.whaleshark,
  'instagram/04.jpg': P.chocolateAerial,
  'instagram/05.jpg': P.seaTurtle,
  'instagram/06.jpg': P.leaningPalm,
  'instagram/bg.jpg': P.boholLandscape,
};

const run = async () => {
  for (const [rel, src] of Object.entries(map)) {
    const target = path.join(IMG, rel);
    if (!fs.existsSync(target)) {
      console.log(`SKIP (missing target) ${rel}`);
      continue;
    }
    // keep the original file's exact dimensions so the layout never shifts
    const meta = await sharp(target).metadata();
    const w = meta.width || 1200;
    const h = meta.height || 800;
    const buf = await sharp(src)
      .resize(w, h, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(target, buf);
    const kb = (buf.length / 1024).toFixed(0);
    console.log(`OK  ${rel}  ${w}x${h}  (${kb} KB)`);
  }
};

run().then(() => console.log('Homepage images filled.')).catch((e) => {
  console.error(e);
  process.exit(1);
});
