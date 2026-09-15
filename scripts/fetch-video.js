import https from 'https';
import fs from 'fs';

// Try direct public luxury fashion CDN videos
const candidateVideos = [
  'https://assets.mixkit.co/videos/43098/43098-720.mp4',
  'https://assets.mixkit.co/videos/41399/41399-720.mp4',
  'https://assets.mixkit.co/videos/41270/41270-720.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(checkUrl(res.headers.location));
      }
      resolve({ url, status: res.statusCode, length: res.headers['content-length'] });
    }).on('error', (e) => resolve({ url, error: e.message }));
  });
}

(async () => {
  for (const url of candidateVideos) {
    const res = await checkUrl(url);
    console.log(res);
  }
})();
