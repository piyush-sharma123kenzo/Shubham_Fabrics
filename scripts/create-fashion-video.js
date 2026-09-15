import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const img1 = 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/suit_salwar_walk_pose_1_1789496985824.jpg';
const img2 = 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/suit_salwar_walk_pose_2_1789497004066.jpg';
const img3 = 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/suit_salwar_walk_pose_3_1789497028241.jpg';

fs.copyFileSync(img1, 'public/suit_salwar_walk_1.jpg');
fs.copyFileSync(img2, 'public/suit_salwar_walk_2.jpg');
fs.copyFileSync(img3, 'public/suit_salwar_walk_3.jpg');

// Using loop filter for smooth video creation
const ffmpeg = ffmpegPath.path;
const outputVideo = path.resolve('public/suit_salwar_walking.mp4');

// We can build a beautiful video with loop & zoompan / framerate
const cmd = `"${ffmpeg}" -y -loop 1 -t 3.5 -i "public/suit_salwar_walk_1.jpg" -loop 1 -t 3.5 -i "public/suit_salwar_walk_2.jpg" -loop 1 -t 3.5 -i "public/suit_salwar_walk_3.jpg" -filter_complex "[0:v]scale=1280:960,fps=30,format=yuv420p[v0];[1:v]scale=1280:960,fps=30,format=yuv420p[v1];[2:v]scale=1280:960,fps=30,format=yuv420p[v2];[v0][v1][v2]concat=n=3:v=1:a=0[v]" -map "[v]" -c:v libx264 -preset fast -pix_fmt yuv420p "${outputVideo}"`;

console.log('Encoding video with ffmpeg...');
exec(cmd, (err, stdout, stderr) => {
  if (err) {
    console.error('Error:', err, stderr);
  } else {
    console.log('SUCCESS! Video generated at', outputVideo, 'Size:', fs.statSync(outputVideo).size);
  }
});
