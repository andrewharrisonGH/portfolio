export type Point3D = [number, number, number];
export type Angles = [number, number, number];

/** Rigid rotations about x, then y, then z, in degrees. */
export function rotate([x, y, z]: Point3D, angles: Angles): Point3D {
  const [a, b, c] = angles.map((angle) => angle * Math.PI / 180);
  const y1 = y * Math.cos(a) - z * Math.sin(a);
  const z1 = y * Math.sin(a) + z * Math.cos(a);
  const x2 = x * Math.cos(b) + z1 * Math.sin(b);
  const z2 = -x * Math.sin(b) + z1 * Math.cos(b);
  return [x2 * Math.cos(c) - y1 * Math.sin(c), x2 * Math.sin(c) + y1 * Math.cos(c), z2];
}

/** Schematic binning only: no atom types, densities, or research tensors. */
export function voxelCentre(point: Point3D, size = 0.55): Point3D {
  return point.map((coordinate) => Math.floor(coordinate / size) * size + size / 2) as Point3D;
}

/** Synthetic curved fragment, unrelated to a PDB structure. */
export function schematicFragment(): Point3D[] {
  return Array.from({ length: 44 }, (_, index) => {
    const t = index / 43;
    return [1.25 * Math.cos(t * Math.PI * 5.5), (t - 0.5) * 5.1, 1.25 * Math.sin(t * Math.PI * 5.5)];
  });
}
