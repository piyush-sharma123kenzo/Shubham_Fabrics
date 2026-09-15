import sharp from 'sharp';
import fs from 'fs';

const srcLogo = 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/.user_uploaded/media_1789495458157.jpg';

async function processLogo() {
  const { data, info } = await sharp(srcLogo)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rawData = Buffer.from(data);
  const darkData = Buffer.from(data);

  for (let i = 0; i < info.width * info.height; i++) {
    const r = rawData[i * 4];
    const g = rawData[i * 4 + 1];
    const b = rawData[i * 4 + 2];

    const colorDist = Math.sqrt(
      Math.pow(255 - r, 2) + Math.pow(255 - g, 2) + Math.pow(255 - b, 2)
    );

    if (colorDist < 30) {
      rawData[i * 4 + 3] = 0;
      darkData[i * 4 + 3] = 0;
    } else if (colorDist < 60) {
      const alpha = Math.floor(((colorDist - 30) / 30) * 255);
      rawData[i * 4 + 3] = alpha;
      darkData[i * 4 + 3] = alpha;
    }

    // Color conversion for dark mode
    if (darkData[i * 4 + 3] > 10) {
      if (r < 80 && g < 90 && b < 140) {
        darkData[i * 4] = 250;     // Ivory
        darkData[i * 4 + 1] = 246;
        darkData[i * 4 + 2] = 238;
      }
    }
  }

  // 1. Full transparent logo (dark navy & gold)
  await sharp(rawData, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .trim()
    .png()
    .toFile('public/logo_full.png');

  // 2. Full transparent logo (ivory & gold for dark headers)
  await sharp(darkData, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .trim()
    .png()
    .toFile('public/logo_full_light.png');

  // 3. Just the Monogram icon (crop top 54%)
  await sharp('public/logo_full.png')
    .metadata()
    .then(async (m) => {
      const h = Math.floor(m.height * 0.54);
      await sharp('public/logo_full.png')
        .extract({ left: 0, top: 0, width: m.width, height: h })
        .trim()
        .png()
        .toFile('public/logo_icon.png');
    });

  await sharp('public/logo_full_light.png')
    .metadata()
    .then(async (m) => {
      const h = Math.floor(m.height * 0.54);
      await sharp('public/logo_full_light.png')
        .extract({ left: 0, top: 0, width: m.width, height: h })
        .trim()
        .png()
        .toFile('public/logo_icon_light.png');
    });

  console.log('Successfully generated all transparent logo assets in public/');
}

processLogo().catch(console.error);
