import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';

import { createMap } from './utils/createMap.js';

import persons from './persons.json' assert { 'type': 'json' };

const baseURL = 'http://localhost:8080';
const moves = [0, 1];

kaboom({
  background: [255, 255, 255],
});

// building size is 50 x 50
loadSprite('home', '/images/buildings/house_red.png');
loadSprite('person', '/images/peaple.png');

loadSprite('load0', '/images/roads/douro0.png');
loadSprite('load1', '/images/roads/douro1.png');
loadSprite('load2', '/images/roads/douro2.png');
loadSprite('load3', '/images/roads/douro3.png');
loadSprite('load4', '/images/roads/douro4.png');
loadSprite('load5', '/images/roads/douro5.png');
loadSprite('load6', '/images/roads/douro6.png');
loadSprite('load7', '/images/roads/douro7.png');
loadSprite('load8', '/images/roads/douro8.png');
loadSprite('load9', '/images/roads/douro9.png');
loadSprite('load10', '/images/roads/douro10.png');

scene('game', ({ stage, persons }) => {
  gravity(0);

  stage.map((y, yIndex) => {
    y.map((x, xIndex) => {
      switch (x) {
        case -1:
          break;
        case 0:
          add([
            sprite('load0'),
            pos(xIndex * 50 + 50, yIndex * 50 + 50),
            area(),
            body(),
            cleanup(),
          ]);
          break;
        case 1:
          add([
            sprite('load1'),
            pos(xIndex * 50 + 50, yIndex * 50 + 50),
            area(),
            body(),
            cleanup(),
          ]);
          break;
        case 2:
          add([
            sprite('load2'),
            pos(xIndex * 50 + 50, yIndex * 50 + 50),
            area(),
            body(),
            cleanup(),
          ]);
          break;
        case 3:
          add([
            sprite('load3'),
            pos(xIndex * 50 + 50, yIndex * 50 + 50),
            area(),
            body(),
            cleanup(),
          ]);
          break;
        case 4:
          add([
            sprite('load4'),
            pos(xIndex * 50 + 50, yIndex * 50 + 50),
            area(),
            body(),
            cleanup(),
          ]);
          break;
        case 5:
          add([
            sprite('load5'),
            pos(xIndex * 50 + 50, yIndex * 50 + 50),
            area(),
            body(),
            cleanup(),
          ]);
          break;
        case 6:
          add([
            sprite('load6'),
            pos(xIndex * 50 + 50, yIndex * 50 + 50),
            area(),
            body(),
            cleanup(),
          ]);
          break;
        case 7:
          add([
            sprite('load7'),
            pos(xIndex * 50 + 50, yIndex * 50 + 50),
            area(),
            body(),
            cleanup(),
          ]);
          break;
        case 8:
          add([
            sprite('load8'),
            pos(xIndex * 50 + 50, yIndex * 50 + 50),
            area(),
            body(),
            cleanup(),
          ]);
          break;
        case 9:
          add([
            sprite('load9'),
            pos(xIndex * 50 + 50, yIndex * 50 + 50),
            area(),
            body(),
            cleanup(),
          ]);
          break;
        case 10:
          add([
            sprite('load10'),
            pos(xIndex * 50 + 50, yIndex * 50 + 50),
            area(),
            body(),
            cleanup(),
          ]);
          break;
        case 100:
          add([
            sprite('home'),
            pos(xIndex * 50 + 50, yIndex * 50 + 50),
            area(),
            body(),
            cleanup(),
          ]);
          break;
      }
    });
  });

  persons.map((person) => {
    add([
      sprite('person'),
      pos(person.pos[0] * 50 + 50, person.pos[1] * 50 + 50),
      area(),
      cleanup(),
      'person',
    ]);
  });

  onKeyPress('space', () => {
    const personObjs = get('person');
    moves.forEach((move, index) => {
      let direction;
      switch (move) {
        case 0:
          direction = [0, -3000];
          break;
        case 1:
          direction = [3000, 0];
          break;
        case 2:
          direction = [0, 3000];
          break;
        case 3:
          direction = [-3000, 0];
          break;
      }
      personObjs[index].move(direction[0], direction[1]);
    });
  });
});

async function start() {
  const stage = createMap(10, 10);
  console.log(stage);
  go('game', {
    stage,
    persons,
  });
}

start();
