const roads = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const homes = [100];
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
  for (let i = 0; i < Math.ceil(map.length / 10); i++) {
    const point = [
      Math.floor(Math.random() * xSize),
      Math.floor(Math.random() * ySize),
    ];
    roadDirections.cross.forEach((type) => {
      map = spreadRoad(map, point, type);
    });
  }

  for (let j = 0; j < Math.ceil(map.length / 5); j++) {
    const point = [
      Math.floor(Math.random() * xSize),
      Math.floor(Math.random() * ySize),
    ];
    const type = Math.floor(Math.random() * 4);

    roadDirections.T[type].forEach((direction) => {
      map = spreadRoad(map, point, direction);
    });
  }

  for (let k = 0; k < Math.ceil(map.length / 5); k++) {
    const point = [
      Math.floor(Math.random() * xSize),
      Math.floor(Math.random() * ySize),
    ];
    const type = Math.floor(Math.random() * 4);

    roadDirections.L[type].forEach((direction) => {
      map = spreadRoad(map, point, direction);
    });
  }

  return formMap(map);
}
