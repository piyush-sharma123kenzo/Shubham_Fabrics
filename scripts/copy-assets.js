import fs from 'fs';
import path from 'path';

const filesToCopy = [
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/kurti_editorial_luxury_1789491901803.jpg',
    dest: 'public/kurti_editorial.jpg'
  },
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/pure_artisanal_textiles_luxury_1789491783261.jpg',
    dest: 'public/artisanal_fabrics_hero.jpg'
  },
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/cotton_blockprint_texture_1789491846272.jpg',
    dest: 'public/cotton_blockprint_texture.jpg'
  }
];

filesToCopy.forEach(({ src, dest }) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.resolve(dest));
    console.log(`Copied ${dest} successfully`);
  }
});
