const roads = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const homes = [100, 101, 102];
const roadDirections = {
  cross: [0, 1, 2, 3],
  T: { 0: [0, 1, 3], 1: [0, 1, 2], 2: [1, 2, 3], 3: [0, 2, 3] },
  L: { 0: [0, 1], 1: [1, 2], 2: [2, 3], 3: [0, 3] },
};

function spreadRoad(map, point, direction) {
  const x = point[0];
  const y = point[1];
  let res = JSON.parse(JSON.stringify(map));
  switch (direction) {
    case 0:
      // 上方向
      for (let i = 0; y - i >= 0; i++) {
        res[y - i][x] = 0;
      }
      break;

    case 1:
      // 右方向
      for (let j = 0; x + j < map[y].length; j++) {
        res[y][x + j] = 1;
      }
      break;

    case 2:
      // 下方向
      for (let k = 0; y + k < map.length; k++) {
        res[y + k][x] = 0;
      }
      break;

    case 3:
      for (let l = 0; x - l >= 0; l++) {
        res[y][x - l] = 1;
      }
      break;

    default:
      throw new Error('Unexpected direction');
  }
  return res;
}

function formMap(map) {
  let res = JSON.parse(JSON.stringify(map));

  map.forEach((line, yIndex) => {
    line.forEach((object, xIndex) => {
      const top = yIndex !== 0 ? map[yIndex - 1][xIndex] : undefined;
      const right =
        xIndex !== map[yIndex].length - 1 ? map[yIndex][xIndex + 1] : undefined;
      const bottom =
        yIndex !== map.length - 1 ? map[yIndex + 1][xIndex] : undefined;
      const left = xIndex !== 0 ? map[yIndex][xIndex - 1] : undefined;

      if (!roads.includes(object)) return;
      // cross
      if (
        roads.includes(top) &&
        roads.includes(right) &&
        roads.includes(bottom) &&
        roads.includes(left)
      ) {
        res[yIndex][xIndex] = 2;
      }

      // T
      else if (
        roads.includes(top) &&
        roads.includes(right) &&
        roads.includes(left)
      ) {
        res[yIndex][xIndex] = 7;
      } else if (
        roads.includes(top) &&
        roads.includes(right) &&
        roads.includes(bottom)
      ) {
        res[yIndex][xIndex] = 8;
      } else if (
        roads.includes(right) &&
        roads.includes(bottom) &&
        roads.includes(left)
      ) {
        res[yIndex][xIndex] = 9;
      } else if (
        roads.includes(top) &&
        roads.includes(bottom) &&
        roads.includes(left)
      ) {
        res[yIndex][xIndex] = 10;
      }

      // L
      else if (roads.includes(top) && roads.includes(right)) {
        res[yIndex][xIndex] = 3;
      } else if (roads.includes(right) && roads.includes(bottom)) {
        res[yIndex][xIndex] = 4;
      } else if (roads.includes(bottom) && roads.includes(left)) {
        res[yIndex][xIndex] = 5;
      } else if (roads.includes(left) && roads.includes(top)) {
        res[yIndex][xIndex] = 6;
      }

      // I
      else if (
        object === 0 &&
        (roads.includes(left) || roads.includes(right))
      ) {
        res[yIndex][xIndex] = 1;
      } else if (
        object === 1 &&
        (roads.includes(top) || roads.includes(bottom))
      ) {
        res[yIndex][xIndex] = 0;
      }
    });
  });

  return res;
}

export function createMap(xSize, ySize) {
  let map = Array.from(Array(xSize)).map(() =>
    Array.from(Array(ySize)).map(() => -1)
  );

  const count = Math.floor((xSize * ySize) / 2);

  for (let i = 0; i < count; i++) {
    const point = [
      Math.floor(Math.random() * xSize),
      Math.floor(Math.random() * ySize),
    ];
    const roadType = Math.floor(Math.random() * 10) + 1;

    const top = point[1] !== 0 ? map[point[1] - 1][point[0]] : undefined;
    const right =
      point[0] !== map[point[1]].length - 1
        ? map[point[1]][point[0] + 1]
        : undefined;
    const bottom =
      point[1] !== map.length - 1 ? map[point[1] + 1][point[0]] : undefined;
    const left = point[0] !== 0 ? map[point[1]][point[0] - 1] : undefined;

    if (top === -1 && right === -1 && bottom === -1 && left === -1) {
      // L字
      if (roadType < 6) {
        const directionType = Math.floor(Math.random() * 4);

        roadDirections.L[directionType].forEach((direction) => {
          map = spreadRoad(map, point, direction);
        });
      }
      // T字
      else if (roadType < 9) {
        const directionType = Math.floor(Math.random() * 4);

        roadDirections.T[directionType].forEach((direction) => {
          map = spreadRoad(map, point, direction);
        });
      }
      // cross
      else {
        roadDirections.cross.forEach((type) => {
          map = spreadRoad(map, point, type);
        });
      }
    }
  }

  // home
  map.forEach((line, yIndex) => {
    line.forEach((object, xIndex) => {
      if (object === -1) {
        map[yIndex][xIndex] = homes[Math.floor(Math.random() * homes.length)];
      }
    });
  });

  return formMap(map);
  // return map;
}
