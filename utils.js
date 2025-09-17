export function kineticEnergy(mass, velocity) {
  return 0.5 * mass * velocity * velocity;
}

export function tntEquivalent(joules) {
  return joules / 4.184e9; // J to tons of TNT
}

export function meteorMass(volume, density) {
  return volume * density;
}

export function polygonArea(vertices) {
  let area = 0;
  for (let i = 0; i < vertices.length; i++) {
    let j = (i + 1) % vertices.length;
    area += vertices[i].x * vertices[j].y;
    area -= vertices[j].x * vertices[i].y;
  }
  return Math.abs(area / 2);
}

export function airDensity(altitude) {
  const rho0 = 1.225; // kg/m3 at sea level
  const H = 8500; // scale height in meters
  return rho0 * Math.exp(-altitude / H);
}

export function dragForce(velocity, area, Cd = 1.0) {
  const rho = airDensity(0); // simplified at sea level
  return 0.5 * rho * velocity * velocity * Cd * area;
}
