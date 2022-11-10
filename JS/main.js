import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';
import stage from './road.json' assert { 'type': 'json' };
import persons from './persons.json' assert { 'type': 'json' };

const baseURL = 'http://localhost:8080';
const moves = [0, 1];

kaboom({
  background: [255, 255, 255],
});

// building size is 50 x 50
loadSprite('home1', '/images/house_red.png');
loadSprite('home2', '/images/building.png');
loadSprite('person', '/images/peaple.png');

loadSprite('load', '/images/douro.png');

scene('game', ({ stage, persons }) => {
  gravity(0);
  const formattedStage = stage.map((line) => line.join(''));
  addLevel(formattedStage, {
    width: 50,
    height: 50,
    pos: vec2(50, 50),
    0: () => [sprite('load'), area(), body(), cleanup()],
    1: () => [sprite('home1'), area(), body(), cleanup()],
    2: () => [sprite('home2'), area(), body(), cleanup()],
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
      console.log(move);
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
      console.log(direction);
      personObjs[index].move(direction[0], direction[1]);
    });
  });
});

async function start() {
  await fetch(`${baseURL}/createMap`, {
    method: 'POST',
    body: JSON.stringify(stage),
  });
  go('game', {
    stage,
    persons,
  });
}

start();
