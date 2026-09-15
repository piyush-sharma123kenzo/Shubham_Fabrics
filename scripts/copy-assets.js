import fs from 'fs';
import path from 'path';

const filesToCopy = [
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/dupatta_rose_gold_editorial_1789492310988.jpg',
    dest: 'public/dupatta_rose_gold.jpg'
  },
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/chikankari_ivory_ethnic_set_1789492344921.jpg',
    dest: 'public/chikankari_ivory_set.jpg'
  },
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/anarkali_crimson_editorial_1789492373209.jpg',
    dest: 'public/anarkali_crimson.jpg'
  },
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/sharara_peach_editorial_1789492422546.jpg',
    dest: 'public/sharara_peach.jpg'
  },
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/coord_linen_oatmeal_editorial_1789492448294.jpg',
    dest: 'public/coord_linen_oatmeal.jpg'
  },
  {
    src: 'C:/Users/piyus/.gemini/antigravity-ide/brain/b788c9f1-f01e-43ba-9697-7110c70e1285/traditional_emerald_brocade_1789492475112.jpg',
    dest: 'public/traditional_emerald_brocade.jpg'
  }
];

filesToCopy.forEach(({ src, dest }) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.resolve(dest));
    console.log(`Copied ${dest} successfully`);
  }
});
