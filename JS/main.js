import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';

import { createMap } from './utils/createMap.js';

import persons from './persons.json' assert { 'type': 'json' };

const baseURL = 'http://localhost:8080';
const moves = [0, 1];

const xSize = 20;
const ySize = 20;

kaboom({
  background: [255, 255, 255],
  width: xSize * 50 + 100,
  height: ySize * 50 + 100,
});

// building size is 50 x 50
loadSprite('home1', '/images/buildings/house_red.png');
loadSprite('home2', '/images/buildings/house_blue.png');
loadSprite('home3', '/images/buildings/building.png');

loadSprite('person', '/images/peaple.png');

loadSprite('road0', '/images/roads/douro0.png');
loadSprite('road1', '/images/roads/douro1.png');
loadSprite('road2', '/images/roads/douro2.png');
loadSprite('road3', '/images/roads/douro3.png');
loadSprite('road4', '/images/roads/douro4.png');
loadSprite('road5', '/images/roads/douro5.png');
loadSprite('road6', '/images/roads/douro6.png');
loadSprite('road7', '/images/roads/douro7.png');
loadSprite('road8', '/images/roads/douro8.png');
loadSprite('road9', '/images/roads/douro9.png');
loadSprite('road10', '/images/roads/douro10.png');

function addObj(src, index) {
  return [
    sprite(src),
    pos(index[0] * 50 + 50, index[1] * 50 + 50),
    area(),
    body(),
    cleanup(),
  ];
}

scene('game', ({ stage, persons }) => {
  gravity(0);
  // window.addEventListener('scroll', (event) => {
  //   console.log('scroll', window.scrollX, window.scrollY);
  //   camPos(window.scrollX, window.scrollY);
  // });

  stage.map((y, yIndex) => {
    y.map((x, xIndex) => {
      const pos = [xIndex, yIndex];
      switch (x) {
        case -1:
          break;
        case 0:
          add(addObj('road0', pos));
          break;
        case 1:
          add(addObj('road1', pos));
          break;
        case 2:
          add(addObj('road2', pos));
          break;
        case 3:
          add(addObj('road3', pos));
          break;
        case 4:
          add(addObj('road4', pos));
          break;
        case 5:
          add(addObj('road5', pos));
          break;
        case 6:
          add(addObj('road6', pos));
          break;
        case 7:
          add(addObj('road7', pos));
          break;
        case 8:
          add(addObj('road8', pos));
          break;
        case 9:
          add(addObj('road9', pos));
          break;
        case 10:
          add(addObj('road10', pos));
          break;
        case 100:
          add(addObj('home1', pos));
          break;
        case 101:
          add(addObj('home2', pos));
          break;
        case 102:
          add(addObj('home3', pos));
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
  const stage = createMap(xSize, ySize);

  go('game', {
    stage,
    persons,
  });
}

start();
