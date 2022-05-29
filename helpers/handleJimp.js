const Jimp = require("jimp");

async function handleJimp(filePath) {
  const image = await Jimp.read(filePath);
  await image.scaleToFit(250, 250);
  await image.writeAsync(filePath);
}

module.exports = handleJimp;
