import sharp from "sharp";
import fs from "fs";
import path from "path";

const osRoot = process.env.OS_ASSET;
const pubRoot = process.env.PUB_ROOT;

const jobs = [
  { src: "hammock-on-tropical-beach-cebu-philippines-2026-03-25-01-35-10-utc.jpg", dest: "assets/img/about/03.jpg", w: 330, h: 512 },
  { src: "woman-in-swimsuit-sitting-on-a-wooden-pier-by-a-tu-2026-03-09-02-34-00-utc.jpg", dest: "assets/img/about/05.jpg", w: 284, h: 411 },
  { src: "whalesharks-swimming-in-ocean-drone-aerial-footage-2026-03-19-22-07-21-utc.jpg", dest: "assets/img/about/accent.jpg", w: 196, h: 109 },
  { src: "landscape-of-the-bohol-region-the-chocolate-hills-2026-03-25-00-51-34-utc.jpg", dest: "assets/img/travel-bg.jpg", w: 1920, h: 800, skipIfExists: true },
  { src: "kawasan-falls-in-cebu-philippines-2026-03-24-16-48-34-utc.jpg", dest: "assets/img/choose-us-bg-2.jpg", w: 1920, h: 900 },
  { src: "tropical-beach-in-coron-philippines-2026-01-08-07-51-49-utc.jpg", dest: "assets/img/video-bg.jpg", w: 1200, h: 600 },
  ...[1,2,3,4].map((n,i)=>({ src: `happy_guest/g${n}.jpg`, dest: `assets/img/team/${String(i+1).padStart(2,"0")}.jpg`, w: 306, h: 348 })),
  ...[5,6,7,8,9,10].map((n,i)=>({ src: `happy_guest/g${n}.jpg`, dest: `assets/img/instagram/${String(i+1).padStart(2,"0")}.jpg`, w: 400, h: 400 })),
];

const written = [];
const skipped = [];

for (const job of jobs) {
  const destPath = path.join(pubRoot, job.dest);
  if (job.skipIfExists && fs.existsSync(destPath)) {
    skipped.push({ dest: job.dest, reason: "already exists" });
    continue;
  }
  const srcPath = path.join(osRoot, job.src);
  if (!fs.existsSync(srcPath)) throw new Error(`Missing source: ${srcPath}`);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  await sharp(srcPath).resize(job.w, job.h, { fit: "cover", position: "centre" }).jpeg({ quality: 85, mozjpeg: true }).toFile(destPath);
  const meta = await sharp(destPath).metadata();
  written.push({ dest: job.dest, from: job.src, width: meta.width, height: meta.height, bytes: fs.statSync(destPath).size });
}

console.log(JSON.stringify({ written, skipped }, null, 2));
