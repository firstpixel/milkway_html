# 1. Make sure you have Node.js installed
node -v

# 2. Save this script as download_textures.js

# 3. Run it to fetch all planet textures
node download_textures.js

# 4. You’ll now have an images/ folder with all .jpg files

# 5. Open your HTML file in a local server so WebGL can load the images:
npx http-server .
