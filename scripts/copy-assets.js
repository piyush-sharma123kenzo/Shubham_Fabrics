import fs from 'fs';
import path from 'path';

const filesToCopy = [
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/cotton_printed_fabric_swatch_1789494541303.jpg',
    dest: 'public/fabric_cotton.jpg'
  },
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/fabric_rayon_swatch_1789494572483.jpg',
    dest: 'public/fabric_rayon.jpg'
  },
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/fabric_georgette_swatch_1789494605029.jpg',
    dest: 'public/fabric_georgette.jpg'
  },
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/fabric_silk_swatch_1789494631492.jpg',
    dest: 'public/fabric_silk.jpg'
  },
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/fabric_linen_swatch_1789494659844.jpg',
    dest: 'public/fabric_linen.jpg'
  },
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/fabric_crepe_swatch_1789494694952.jpg',
    dest: 'public/fabric_crepe.jpg'
  },
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/fabric_muslin_swatch_1789494722518.jpg',
    dest: 'public/fabric_muslin.jpg'
  }
];

filesToCopy.forEach(({ src, dest }) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.resolve(dest));
    console.log(`Copied ${dest} successfully`);
  }
});
