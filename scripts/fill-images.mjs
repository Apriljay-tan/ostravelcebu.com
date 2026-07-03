import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC = "D:/O'S TRAVEL WEBSITE/OS_Travel/Os_asset";
const IMG = path.join(process.cwd(), 'public', 'assets', 'img');

// resolve a source file by a substring of its name
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

// job: { src, out, w, h, q }
const jobs = [
  // Happy Guests gallery (square-ish cards)
  { src: P.ph216,           out: 'guests/01.jpg',  w: 1200, h: 900 },
  { src: P.seaTurtle,       out: 'guests/02.jpg',  w: 1200, h: 900 },
  { src: P.whaleshark,      out: 'guests/03.jpg',  w: 1200, h: 900 },
  { src: P.chocolateAerial, out: 'guests/04.jpg',  w: 1200, h: 900 },
  { src: P.kawasan,         out: 'guests/05.jpg',  w: 1200, h: 900 },
  { src: P.coron,           out: 'guests/06.jpg',  w: 1200, h: 900 },
  { src: P.ph231,           out: 'guests/07.jpg',  w: 1200, h: 900 },
  { src: P.monkey,          out: 'guests/08.jpg',  w: 1200, h: 900 },
  { src: P.womanPier,       out: 'guests/09.jpg',  w: 1200, h: 900 },

  // Legitimacy Corner cards (placeholder visuals until real permits are added)
  { src: P.hammockCebu,     out: 'legitimacy/dti.jpg',             w: 1000, h: 700 },
  { src: P.leaningPalm,     out: 'legitimacy/business-permit.jpg', w: 1000, h: 700 },
  { src: P.hangingBridge,   out: 'legitimacy/bir.jpg',             w: 1000, h: 700 },

  // Wide banner for breadcrumb headers
  { src: P.boholLandscape,  out: 'breadcrumb/os-banner.jpg', w: 1920, h: 560 },
];

const run = async () => {
  for (const j of jobs) {
    const outPath = path.join(IMG, j.out);
    await sharp(j.src)
      .resize(j.w, j.h, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(outPath);
    const kb = (fs.statSync(outPath).size / 1024).toFixed(0);
    console.log(`OK  ${j.out}  (${kb} KB)`);
  }
};

run().then(() => console.log('All images processed.')).catch((e) => {
  console.error(e);
  process.exit(1);
});
