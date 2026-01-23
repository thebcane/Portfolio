const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');

// Create directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Create simple SVG placeholders
const createPlaceholder = (width, height, text, filename) => {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#2a2a2a"/>
  <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#ffd700" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;
  fs.writeFileSync(path.join(imagesDir, filename), svg);
};

// Avatar
createPlaceholder(200, 200, 'BC', 'avatar.jpg');

// Testimonial avatars
createPlaceholder(100, 100, 'DL', 'avatar-1.jpg');
createPlaceholder(100, 100, 'JM', 'avatar-2.jpg');
createPlaceholder(100, 100, 'EE', 'avatar-3.jpg');

// Project images
for (let i = 1; i <= 9; i++) {
  createPlaceholder(800, 600, `Project ${i}`, `project-${i}.jpg`);
}

// Client logos
for (let i = 1; i <= 4; i++) {
  createPlaceholder(200, 80, `Client ${i}`, `logo-${i}.png`);
}

console.log('Placeholder images created successfully!');
