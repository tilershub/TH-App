// src/__tests__/utils/estimator.test.ts
import { computeEstimate } from '@/utils/estimator';

describe('estimator', () => {
  it('computes tiles and costs for a 10x10 ft room, 600x600mm', () => {
    const res = computeEstimate({
      lengthFt: 10, widthFt: 10,
      tileWmm: 600, tileHmm: 600,
      tilePricePerSqm: 3500,
      skirtingFt: 0,
      laborFloorPerSqft: 300,
      laborSkirtingPerFt: 0,
      wastagePct: 8,
    });
    expect(res.areaSqft).toBe(100);
    expect(res.tilesNeeded).toBeGreaterThan(0);
    expect(res.totalCost).toBeGreaterThan(0);
  });

  it('increases tiles with higher wastage', () => {
    const a = computeEstimate({ lengthFt: 10, widthFt: 10, tileWmm: 600, tileHmm: 600, tilePricePerSqm: 0, skirtingFt: 0, laborFloorPerSqft: 0, laborSkirtingPerFt: 0, wastagePct: 0 });
    const b = computeEstimate({ lengthFt: 10, widthFt: 10, tileWmm: 600, tileHmm: 600, tilePricePerSqm: 0, skirtingFt: 0, laborFloorPerSqft: 0, laborSkirtingPerFt: 0, wastagePct: 15 });
    expect(b.tilesNeeded).toBeGreaterThanOrEqual(a.tilesNeeded);
  });
});
