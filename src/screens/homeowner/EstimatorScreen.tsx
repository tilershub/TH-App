
import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { spacing } from '@/utils/theme';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

type TileSize = { label: string; mmW: number; mmH: number };
import { computeEstimate, SQM_TO_SQFT } from '@/utils/estimator';

const TILE_SIZES: TileSize[] = [
  { label: '300 x 300 mm', mmW: 300, mmH: 300 },
  { label: '600 x 600 mm', mmW: 600, mmH: 600 },
  { label: '600 x 1200 mm', mmW: 600, mmH: 1200 },
  { label: '750 x 1500 mm', mmW: 750, mmH: 1500 },
  { label: '200 x 1200 mm (plank)', mmW: 200, mmH: 1200 },
];

function mm2sqm(mmW: number, mmH: number) {
  return (mmW / 1000) * (mmH / 1000); // m^2
}
// using SQM_TO_SQFT from util

export default function EstimatorScreen() {
  const [lengthFt, setLengthFt] = useState('10');
  const [widthFt, setWidthFt] = useState('10');
  const [tileIdx, setTileIdx] = useState(1); // default 600x600
  const [tilePrice, setTilePrice] = useState('3500'); // LKR per sqm (example)
  const [skirtingFt, setSkirtingFt] = useState('0');
  const [laborFloor, setLaborFloor] = useState('300'); // LKR/sqft
  const [laborSkirting, setLaborSkirting] = useState('120'); // LKR/ft
  const [wastagePct, setWastagePct] = useState('8');

  const calc = useMemo(() => {
    const L = parseFloat(lengthFt) || 0;
    const W = parseFloat(widthFt) || 0;
    const areaSqft = L * W;
    const areaSqm = areaSqft / SQM_TO_SQFT;

    const ts = TILE_SIZES[tileIdx];
    const tileAreaSqm = mm2sqm(ts.mmW, ts.mmH);
    const tilesNeeded = tileAreaSqm ? Math.ceil((areaSqm / tileAreaSqm) * (1 + (parseFloat(wastagePct)||0)/100)) : 0;

    const tilePriceSqm = parseFloat(tilePrice) || 0;
    const tileCost = Math.round(areaSqm * tilePriceSqm);

    // Materials (very simple baseline formulas; adjust in estimator_configs later)
    const adhesiveKg = Math.ceil(areaSqm * 4.0); // 4kg per sqm baseline
    const adhesiveBags20 = Math.ceil(adhesiveKg / 20);
    const groutKg = Math.ceil(areaSqm * 0.4);

    // Skirting estimate: pieces along given length using tile height as skirting height
    const skFt = parseFloat(skirtingFt) || 0;
    const tileWidthFt = (ts.mmW/1000) * 3.28084;
    const skirtingTiles = tileWidthFt ? Math.ceil(skFt / tileWidthFt) : 0;

    // Labor
    const laborFloorRate = parseFloat(laborFloor) || 0;
    const laborSkRate = parseFloat(laborSkirting) || 0;
    const laborCost = Math.round(areaSqft * laborFloorRate + skFt * laborSkRate);

    const materialsCost = tileCost; // if you price adhesive/grout, add here
    const totalCost = materialsCost + laborCost;

    const L = parseFloat(lengthFt) || 0;
    const W = parseFloat(widthFt) || 0;
    const ts = TILE_SIZES[tileIdx];
    const res = computeEstimate({
      lengthFt: L, widthFt: W,
      tileWmm: ts.mmW, tileHmm: ts.mmH,
      tilePricePerSqm: parseFloat(tilePrice) || 0,
      skirtingFt: parseFloat(skirtingFt) || 0,
      laborFloorPerSqft: parseFloat(laborFloor) || 0,
      laborSkirtingPerFt: parseFloat(laborSkirting) || 0,
      wastagePct: parseFloat(wastagePct) || 0,
    });
    return { ...res, ts };  }, [lengthFt, widthFt, tileIdx, tilePrice, skirtingFt, laborFloor, laborSkirting, wastagePct]);

  const exportPDF = async () => {
    try {
      const html = `
        <html><body>
        <h2>TILERSHUB Estimate</h2>
        <p><b>Area:</b> ${calc.areaSqft.toFixed(2)} sqft (${calc.areaSqm.toFixed(2)} sqm)</p>
        <p><b>Tile:</b> ${calc.ts.label}</p>
        <h3>Quantities</h3>
        <ul>
          <li>Tiles (incl. wastage): <b>${calc.tilesNeeded}</b></li>
          <li>Adhesive: <b>${calc.adhesiveKg} kg</b> (~${calc.adhesiveBags20} x 20kg)</li>
          <li>Grout: <b>${calc.groutKg} kg</b></li>
          <li>Skirting tiles: <b>${calc.skirtingTiles}</b></li>
        </ul>
        <h3>Costs (LKR)</h3>
        <ul>
          <li>Tile cost: <b>${calc.tileCost.toLocaleString('en-LK')}</b></li>
          <li>Labor total: <b>${calc.laborCost.toLocaleString('en-LK')}</b></li>
          <li><b>Total (materials + labor): ${calc.totalCost.toLocaleString('en-LK')}</b></li>
        </ul>
        <p style="font-size:12px;opacity:0.7">* Formulas are baseline and should be tuned under Admin → Estimator Configs.</p>
        </body></html>`;
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (e: any) {
      Alert.alert('PDF Error', e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: spacing(2), gap: spacing(1.5) }}>
      <Card>
        <Text style={{ fontWeight:'800', fontSize:16 }}>Inputs</Text>
        <Input label="Length (ft)" keyboardType="decimal-pad" value={lengthFt} onChangeText={setLengthFt} />
        <Input label="Width (ft)" keyboardType="decimal-pad" value={widthFt} onChangeText={setWidthFt} />
        <Input label="Tile Price (LKR per sqm)" keyboardType="decimal-pad" value={tilePrice} onChangeText={setTilePrice} />
        <Input label="Skirting Length (ft, optional)" keyboardType="decimal-pad" value={skirtingFt} onChangeText={setSkirtingFt} />
        <Input label="Labor Rate - Floor (LKR per sqft)" keyboardType="decimal-pad" value={laborFloor} onChangeText={setLaborFloor} />
        <Input label="Labor Rate - Skirting (LKR per ft)" keyboardType="decimal-pad" value={laborSkirting} onChangeText={setLaborSkirting} />
        <Input label="Wastage (%)" keyboardType="decimal-pad" value={wastagePct} onChangeText={setWastagePct} />
        <Text style={{ opacity:0.7, marginTop: 6 }}>Tile Size: {TILE_SIZES[tileIdx].label}</Text>
        {/* Simple next/prev selector */}
        <View style={{ flexDirection:'row', gap: 8, marginTop: 8 }}>
          <Button title="Prev Size" variant="outline" onPress={() => setTileIdx(Math.max(0, tileIdx-1))} />
          <Button title="Next Size" variant="outline" onPress={() => setTileIdx(Math.min(TILE_SIZES.length-1, tileIdx+1))} />
        </View>
      </Card>

      <Card>
        <Text style={{ fontWeight:'800', fontSize:16 }}>Results</Text>
        <Text>Area: {calc.areaSqft.toFixed(2)} sqft ({calc.areaSqm.toFixed(2)} sqm)</Text>
        <Text>Tiles (incl. wastage): {calc.tilesNeeded}</Text>
        <Text>Adhesive: {calc.adhesiveKg} kg (~{calc.adhesiveBags20} x 20kg)</Text>
        <Text>Grout: {calc.groutKg} kg</Text>
        <Text>Skirting tiles: {calc.skirtingTiles}</Text>
        <Text style={{ marginTop: 8, fontWeight:'700' }}>Costs (LKR)</Text>
        <Text>Tile cost: {calc.tileCost.toLocaleString('en-LK')}</Text>
        <Text>Labor: {calc.laborCost.toLocaleString('en-LK')}</Text>
        <Text>Total: {calc.totalCost.toLocaleString('en-LK')}</Text>
        <Button title="Export PDF" style={{ marginTop: 12 }} onPress={exportPDF} />
      </Card>
    </ScrollView>
  );
}
