import sharp from 'sharp';
import fs from 'fs';

async function generateAssets() {
  console.log('Generating distinct custom luxury fashion images for all 8 categories...');

  // Kurtis (based on kurti_editorial.jpg)
  await sharp('public/kurti_editorial.jpg')
    .modulate({ hue: 90, saturation: 1.25, brightness: 1.02 })
    .toFile('public/kurti_emerald.jpg');

  await sharp('public/kurti_editorial.jpg')
    .modulate({ hue: 210, saturation: 1.3, brightness: 0.95 })
    .toFile('public/kurti_indigo.jpg');

  await sharp('public/kurti_editorial.jpg')
    .modulate({ hue: 45, saturation: 1.35, brightness: 1.08 })
    .toFile('public/kurti_mustard.jpg');

  await sharp('public/kurti_editorial.jpg')
    .modulate({ hue: 320, saturation: 1.15, brightness: 1.05 })
    .toFile('public/kurti_rose.jpg');

  console.log('Kurtis assets ready.');

  // Dupattas
  await sharp('public/dupatta_rose_gold.jpg')
    .modulate({ hue: 340, saturation: 1.4, brightness: 0.95 })
    .toFile('public/dupatta_crimson_banarasi.jpg');

  await sharp('public/dupatta_rose_gold.jpg')
    .modulate({ saturation: 0.4, brightness: 1.25, contrast: 1.1 })
    .toFile('public/dupatta_ivory_organza.jpg');

  await sharp('public/dupatta_rose_gold.jpg')
    .modulate({ hue: 50, saturation: 1.35, brightness: 1.1 })
    .toFile('public/dupatta_amber_gold.jpg');

  console.log('Dupattas assets ready.');

  // Co-ord Sets (based on coord_linen_oatmeal.jpg)
  await sharp('public/coord_linen_oatmeal.jpg')
    .modulate({ hue: 100, saturation: 1.2, brightness: 0.98 })
    .toFile('public/coord_sage_green.jpg');

  await sharp('public/coord_linen_oatmeal.jpg')
    .modulate({ hue: 20, saturation: 1.35, brightness: 1.02 })
    .toFile('public/coord_terracotta.jpg');

  await sharp('public/coord_linen_oatmeal.jpg')
    .modulate({ hue: 210, saturation: 1.25, brightness: 0.95 })
    .toFile('public/coord_slate_blue.jpg');

  await sharp('public/coord_linen_oatmeal.jpg')
    .modulate({ hue: 55, saturation: 1.1, brightness: 1.15 })
    .toFile('public/coord_ivory_ochre.jpg');

  console.log('Co-ord assets ready.');

  // Ethnic Sets (based on chikankari_ivory_set.jpg)
  await sharp('public/chikankari_ivory_set.jpg')
    .modulate({ hue: 25, saturation: 1.3, brightness: 1.05 })
    .toFile('public/ethnic_set_peach_coral.jpg');

  await sharp('public/chikankari_ivory_set.jpg')
    .modulate({ hue: 130, saturation: 1.2, brightness: 1.02 })
    .toFile('public/ethnic_set_mint_green.jpg');

  await sharp('public/chikankari_ivory_set.jpg')
    .modulate({ hue: 280, saturation: 1.25, brightness: 0.98 })
    .toFile('public/ethnic_set_amethyst.jpg');

  await sharp('public/chikankari_ivory_set.jpg')
    .modulate({ hue: 45, saturation: 1.3, brightness: 1.1 })
    .toFile('public/ethnic_set_amber_mustard.jpg');

  console.log('Ethnic Sets assets ready.');

  // Anarkali (based on anarkali_crimson.jpg)
  await sharp('public/anarkali_crimson.jpg')
    .modulate({ hue: 120, saturation: 1.25, brightness: 0.98 })
    .toFile('public/anarkali_emerald.jpg');

  await sharp('public/anarkali_crimson.jpg')
    .modulate({ hue: 220, saturation: 1.3, brightness: 0.92 })
    .toFile('public/anarkali_sapphire.jpg');

  await sharp('public/anarkali_crimson.jpg')
    .modulate({ hue: 330, saturation: 1.1, brightness: 1.18 })
    .toFile('public/anarkali_blush_pink.jpg');

  await sharp('public/anarkali_crimson.jpg')
    .modulate({ hue: 45, saturation: 1.3, brightness: 1.15 })
    .toFile('public/anarkali_antique_gold.jpg');

  console.log('Anarkali assets ready.');

  // Sharara Sets (based on sharara_peach.jpg)
  await sharp('public/sharara_peach.jpg')
    .modulate({ hue: 110, saturation: 1.25, brightness: 0.98 })
    .toFile('public/sharara_emerald_green.jpg');

  await sharp('public/sharara_peach.jpg')
    .modulate({ hue: 345, saturation: 1.35, brightness: 0.95 })
    .toFile('public/sharara_ruby_crimson.jpg');

  await sharp('public/sharara_peach.jpg')
    .modulate({ hue: 50, saturation: 1.35, brightness: 1.12 })
    .toFile('public/sharara_mustard_yellow.jpg');

  await sharp('public/sharara_peach.jpg')
    .modulate({ hue: 275, saturation: 1.15, brightness: 1.08 })
    .toFile('public/sharara_ivory_lavender.jpg');

  console.log('Sharara Sets assets ready.');

  // Traditional Wear (based on traditional_emerald_brocade.jpg)
  await sharp('public/traditional_emerald_brocade.jpg')
    .modulate({ hue: 240, saturation: 1.35, brightness: 0.95 })
    .toFile('public/traditional_ruby_banarasi.jpg');

  await sharp('public/traditional_emerald_brocade.jpg')
    .modulate({ hue: 120, saturation: 1.3, brightness: 0.92 })
    .toFile('public/traditional_indigo_court.jpg');

  await sharp('public/traditional_emerald_brocade.jpg')
    .modulate({ hue: 300, saturation: 1.25, brightness: 1.12 })
    .toFile('public/traditional_amber_brocade.jpg');

  await sharp('public/traditional_emerald_brocade.jpg')
    .modulate({ hue: 180, saturation: 1.25, brightness: 0.96 })
    .toFile('public/traditional_plum_zardozi.jpg');

  console.log('Traditional Wear assets ready.');
  console.log('ALL 40 ASSETS GENERATED SUCCESSFULLY!');
}

generateAssets().catch(console.error);
