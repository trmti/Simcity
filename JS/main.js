import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';
import addPerson from '../server/utils/addPerson.js';
import { createMap } from '../server/utils/createMap.mjs';
import { makeGraph } from '../server/Daikusutora/dijkstra.mjs';
const baseURL = 'http://localhost:8080';

var stage, g, persons, realRoute;
var idMap = {};
var finished = true;

async function start(xSize, ySize, PERSONS) {
  kaboom({
    background: [255, 255, 255],
    width: xSize * 50 + 100,
    height: ySize * 50 + 100,
  });

  loadSprite('hilight', '/images/flame.png');
  loadSprite('hilight_red', '/images/flame_red.png');
  loadSprite('avoid', '/images/unko.png');

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
  stage = createMap(xSize, ySize);
  g = makeGraph(stage);

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
    const player = document.getElementById('player');
    const home = document.getElementById('home');
    const goTo = document.getElementById('goTo');
    const route = document.getElementById('route');

    let currentId = 0;
    let avoid = [0, 0];

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

    Object.keys(persons).map((index) => {
      const obj = add([
        sprite('person'),
        pos(persons[index].pos[1] * 50 + 50, persons[index].pos[0] * 50 + 50),
        area(),
        cleanup(),
        'person',
      ]);
      persons[index].route.forEach((road) => {
        add([
          sprite('hilight'),
          pos(road[1] * 50 + 50, road[0] * 50 + 50),
          area(),
          cleanup(),
          'hilight',
        ]);
      });

      idMap[obj._id] = index;
    });

    async function next() {
      if (!finished) {
        return;
      }
      finished = false;
      const newPoses = await Promise.all(
        Object.keys(persons).map(async (index) => {
          const res = persons[index].route.shift();
          if (persons[index].route.length === 0) {
            const res_avoid = await (
              await fetch(`${baseURL}/newGoal`, {
                method: 'POST',
                body: JSON.stringify(res),
              })
            ).json();
            const route = res_avoid.route;
            avoid = res_avoid.avoid;
            persons[index].home = res;
            persons[index].to = route[route.length - 1];

            if (index == currentId) {
              realRoute = await (
                await fetch(`${baseURL}/dijkstra`, {
                  method: 'POST',
                  body: JSON.stringify({
                    from: res,
                    to: persons[index].to,
                  }),
                })
              ).json();

              destroyAll('hilight_red');
              realRoute.forEach((road) => {
                add([
                  sprite('hilight_red'),
                  pos(road[1] * 50 + 50, road[0] * 50 + 50),
                  area(),
                  cleanup(),
                  'hilight_red',
                ]);
              });

              destroyAll('hilight');
              route.forEach((road) => {
                add([
                  sprite('hilight'),
                  pos(road[1] * 50 + 50, road[0] * 50 + 50),
                  area(),
                  cleanup(),
                  'hilight',
                ]);
              });

              destroyAll('avoid');
              add([
                sprite('avoid'),
                pos(avoid[1] * 50 + 50, avoid[0] * 50 + 50),
                area(),
                cleanup(),
                'avoid',
              ]);
            }
            persons[index].avoid = avoid;
            persons[index].route = route;
          }

          return res;
        })
      );
      const personalInfo = persons[currentId];
      route.textContent = `route: ${JSON.stringify(personalInfo.route)}`;

      destroyAll('person');
      newPoses.forEach((newPos, index) => {
        if (
          index == currentId &&
          newPos[1] == avoid[1] &&
          newPos[0] == avoid[0]
        ) {
          setTimeout(async () => {
            const unko = document.getElementById('unko');
            const body = document.querySelector('body');
            unko.style.visibility = 'visible';
            body.classList.add('shivering');
            await new Promise((resolve, reject) =>
              setTimeout(() => {
                resolve();
              }, 1000)
            );
            unko.style.visibility = 'hidden';
            body.classList.remove('shivering');
          }, 0);
        }
        const obj = add([
          sprite('person'),
          pos(newPos[1] * 50 + 50, newPos[0] * 50 + 50),
          area(),
          cleanup(),
          'person',
        ]);
        idMap[obj._id] = index;
      });

      finished = true;
    }

    onHover('person', async (person) => {
      currentId = idMap[person._id];
      const personInfo = persons[currentId];
      player.textContent = `Player: ${currentId}`;
      home.textContent = `home: ${JSON.stringify(personInfo.home)}`;
      goTo.textContent = `goTo: ${JSON.stringify(personInfo.to)}`;
      route.textContent = `route: ${JSON.stringify(personInfo.route)}`;
    });

    onKeyPress('space', async () => {
      await next();
    });

    const btn = document.getElementById('auto');
    let playing = false;
    let intervalId;
    btn.addEventListener('click', () => {
      playing = !playing;
      if (playing) {
        btn.textContent = 'Stop';
        intervalId = setInterval(async () => {
          await next();
        }, 200);
      } else {
        btn.textContent = 'Start Auto Mode';
        clearInterval(intervalId);
      }
    });
  });

  await fetch('http://localhost:8080/createMap', {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(stage),
  });
  persons = addPerson(g, stage, PERSONS);
  go('game', {
    stage,
    persons,
  });
}

async function main() {
  let xSize = 10;
  let ySize = 10;
  let PERSONS = 1;
  await start(xSize, ySize, PERSONS);
}

main();
