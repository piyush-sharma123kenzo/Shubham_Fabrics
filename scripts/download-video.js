import https from 'https';
import fs from 'fs';

const videoUrl = 'https://assets.mixkit.co/videos/43098/43098-720.mp4';
const dest = 'public/suit_set_walking.mp4';

function downloadFile(url, target) {
  const file = fs.createWriteStream(target);
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      return downloadFile(res.headers.location, target);
    }
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Saved', target, 'Size:', fs.statSync(target).size);
    });
  }).on('error', (e) => {
    fs.unlink(target, () => {});
    console.error(e);
  });
}

downloadFile(videoUrl, dest);
