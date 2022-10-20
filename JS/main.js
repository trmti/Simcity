import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';

const map = [
  [0, 1, 0],
  [0, 0, 0],
  [2, 0, 1],
];

kaboom({
  background: [255, 255, 255],
});

// building size is 30 x 30
loadSprite('test', '/images/house_red.png');
add([sprite('test')]);
