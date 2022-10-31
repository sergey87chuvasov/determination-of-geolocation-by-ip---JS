export function addOffset(map) {
  const offsetY = map.getSize().y * 0.15;
  // console.log(offset); // object with coordiantes Point {x: 564, y: 732}

  map.panBy([0, -offsetY], { animate: false });
}
