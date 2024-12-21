import { Build, Mark } from 'src/types/building';

export const MARKS: Mark[] = [1, 2, 4];

export const EXTRACTORS: Build[] = [
  { type: 'miner', data: { mark: 1, quality: 'normal' } },
  { type: 'oil-extractor', data: { mark: 2, quality: 'normal' } },
  { type: 'water-extractor', data: { mark: 1, quality: 'normal' } },
  { type: 'resource-well-pressurizer', data: { quality: 'normal' } },
  { type: 'resource-well-extractor' },
];

export const PRODUCTIONS: Build[] = [
  { type: 'smelter' },
  { type: 'foundry' },
  { type: 'constructor' },
  { type: 'assembler' },
  { type: 'manufacturer' },
  { type: 'refinery' },
  { type: 'packager' },
  { type: 'blender' },
  { type: 'particle-accelerator' },
  { type: 'quantum-encoder' },
  { type: 'converter' },
];

export const GENERATORS: Build[] = [
  { type: 'biomass-burner' },
  { type: 'coal-powered-generator' },
  { type: 'fuel-powered-generator' },
  { type: 'nuclear-power-plant' },
  { type: 'alien-power-augmenter' },
];
