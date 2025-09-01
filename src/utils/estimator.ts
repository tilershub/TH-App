// src/utils/estimator.ts
export type EstimatorInputs = {
  lengthFt: number;
  widthFt: number;
  tileWmm: number;
  tileHmm: number;
  tilePricePerSqm: number;
  skirtingFt: number;
  laborFloorPerSqft: number;
  laborSkirtingPerFt: number;
  wastagePct: number;
};

export type EstimatorResult = {
  areaSqft: number;
  areaSqm: number;
  tilesNeeded: number;
  adhesiveKg: number;
  adhesiveBags20: number;
  groutKg: number;
  skirtingTiles: number;
  tileCost: number;
  laborCost: number;
  totalCost: number;
};

export function mm2sqm(mmW: number, mmH: number) {
  return (mmW / 1000) * (mmH / 1000);
}
export const SQM_TO_SQFT = 10.7639;

export function computeEstimate(i: EstimatorInputs): EstimatorResult {
  const areaSqft = i.lengthFt * i.widthFt;
  const areaSqm = areaSqft / SQM_TO_SQFT;

  const tileAreaSqm = mm2sqm(i.tileWmm, i.tileHmm);
  const tilesNeeded = tileAreaSqm ? Math.ceil((areaSqm / tileAreaSqm) * (1 + i.wastagePct / 100)) : 0;

  const tileCost = Math.round(areaSqm * (i.tilePricePerSqm || 0));

  const adhesiveKg = Math.ceil(areaSqm * 4.0);
  const adhesiveBags20 = Math.ceil(adhesiveKg / 20);
  const groutKg = Math.ceil(areaSqm * 0.4);

  const tileWidthFt = (i.tileWmm / 1000) * 3.28084;
  const skirtingTiles = tileWidthFt ? Math.ceil((i.skirtingFt || 0) / tileWidthFt) : 0;

  const laborCost = Math.round(areaSqft * (i.laborFloorPerSqft || 0) + (i.skirtingFt || 0) * (i.laborSkirtingPerFt || 0));
  const materialsCost = tileCost;
  const totalCost = materialsCost + laborCost;

  return { areaSqft, areaSqm, tilesNeeded, adhesiveKg, adhesiveBags20, groutKg, skirtingTiles, tileCost, laborCost, totalCost };
}
