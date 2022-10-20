export default function Collision() {
  const player = k.add([k.rect(32, 64), k.pos(k.width() * 0.5, 0), k.body()]);

  // add a floor
  k.add([k.pos(0, k.height()), k.rect(k.width(), 50), k.solid()]);
}
