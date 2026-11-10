import test from 'node:test';
import assert from 'node:assert/strict';
import { rotate, voxelCentre, schematicFragment } from '../src/lib/rotation.ts';

test('rigid rotations preserve distances within the paired schematic geometry', () => {
  const points = schematicFragment();
  for (const angles of [[0, 0, 0], [90, 180, 270], [35, 125, 310], [360, 360, 360]]) {
    const transformed = points.map((point) => rotate(point, angles));
    for (let i = 1; i < points.length; i++) {
      const distance = (a, b) => Math.hypot(...a.map((value, j) => value - b[j]));
      assert.ok(Math.abs(distance(points[0], points[i]) - distance(transformed[0], transformed[i])) < 1e-10);
    }
  }
});

test('orientation changes the representation and a full turn restores it', () => {
  const point = [1, 2, 3];
  assert.notDeepEqual(rotate(point, [0, 90, 0]), point);
  rotate(point, [360, 360, 360]).forEach((value, index) => assert.ok(Math.abs(value - point[index]) < 1e-10));
});

test('voxel centres are within half a bin of positive and negative coordinates', () => {
  for (const point of [...schematicFragment(), [-1.1, 0, 1.1]]) {
    voxelCentre(point).forEach((value, index) => {
      assert.ok(Math.abs(value - point[index]) <= 0.275 + 1e-12);
      assert.ok(Number.isFinite(value));
    });
  }
});
