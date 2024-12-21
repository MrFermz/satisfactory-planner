import { ExtractorValue, Quality, RefineryRecipe } from 'src/types/common';

export const QUALITIES: Quality[] = ['impure', 'normal', 'pure'];

export const EXTRACTOR_VALUES: ExtractorValue[] = [
  { id: '9e60afa3-da4a-4344-a389-ffd40ff737ee', type: 'impure', value: 30 },
  { id: '6c9321d8-479b-4261-b8a6-6bca00706caf', type: 'normal', value: 60 },
  { id: '12960f37-2330-462b-a517-8e3df013feb0', type: 'pure', value: 120 },
];

export const REFINERY_RECIPE: RefineryRecipe[] = [
  {
    type: ['bauxite', 'water'],
    value: [120, 180],
    output: [120, 50],
    result: ['alumina-solution', 'silica'],
  },
];
