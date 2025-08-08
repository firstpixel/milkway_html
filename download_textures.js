// download_textures.js
const fs = require('fs');
const https = require('https');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);

const textures = {
  sun:      'https://www.solarsystemscope.com/textures/download/2k_sun.jpg',
  mercury:  'https://www.solarsystemscope.com/textures/download/2k_mercury.jpg',
  venus:    'https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg',
  earth:    'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg',
  moon:     'https://www.solarsystemscope.com/textures/download/2k_moon.jpg',
  mars:     'https://www.solarsystemscope.com/textures/download/2k_mars.jpg',
  jupiter:  'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg',
  saturn:   'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg',
  uranus:   'https://www.solarsystemscope.com/textures/download/2k_uranus.jpg',
  neptune:  'https://www.solarsystemscope.com/textures/download/2k_neptune.jpg'
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

(async () => {
  for (const [name, url] of Object.entries(textures)) {
    const dest = path.join(imagesDir, `${name}.jpg`);
    console.log(`Downloading ${name}...`);
    try {
      await downloadFile(url, dest);
      console.log(`✅ Saved ${dest}`);
    } catch (err) {
      console.error(`❌ Failed ${name}:`, err.message);
    }
  }
})();
