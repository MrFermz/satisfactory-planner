import { Quality, Recipe } from './common';
import { Ficsmas } from './ficsmas';
import { Ingot } from './ingot';
import { Liquid } from './liquid';
import { Mineral } from './mineral';
import { Ore } from './ore';

type Extractor =
  | 'miner'
  | 'oil-extractor'
  | 'water-extractor'
  | 'resource-well-pressurizer'
  | 'resource-well-extractor';

export type Production =
  | 'smelter'
  | 'foundry'
  | 'constructor'
  | 'assembler'
  | 'manufacturer'
  | 'refinery'
  | 'packager'
  | 'blender'
  | 'particle-accelerator'
  | 'quantum-encoder'
  | 'converter';

type Generator =
  | 'biomass-burner'
  | 'coal-powered-generator'
  | 'fuel-powered-generator'
  // | 'geothermal-generator'
  | 'nuclear-power-plant'
  // | 'power-storage'
  | 'alien-power-augmenter';

export type Mark = 1 | 2 | 4;

export type Build = {
  id?: string;
  type: Extractor | Production | Generator;
  label?: string;
  data?: Miner;
};

export type Output = {
  type?: Ore | Liquid | Mineral | Ficsmas | Ingot;
  value: number;
};

// Extractor
export type Miner = {
  type?: Extractor;
  mark?: Mark;
  quality?: Quality;
  input?: Ore;
  output?: [Output, Output?];
  clockSpeed?: number;
};

export type OilExtractor = {
  type?: Extractor;
  mark?: Mark;
  quality?: Quality;
  input?: Liquid;
  output?: [Output, Output?];
  clockSpeed?: number;
};

export type WaterExtractor = {
  type?: Extractor;
  mark?: Mark;
  quality?: Quality;
  input?: Liquid;
  output?: [Output, Output?];
  clockSpeed?: number;
};

// Production
export type Smelter = {
  type?: Production;
  input?: Ore;
  output?: [Output?];
  clockSpeed?: number;
  recipe?: Recipe;
};

export type Foundry = {
  type?: Production;
  input?: Ore;
  output?: [Output?];
  clockSpeed?: number;
};

export type Constructor = {
  type?: Production;
  input?: Ore;
  output?: [Output?];
  clockSpeed?: number;
  recipe?: Recipe;
};

export type Assembler = {
  type?: Production;
  input?: Ore;
  output?: [Output];
  clockSpeed?: number;
};

export type Manufacturer = {
  type?: Production;
  input?: Ore;
  output?: [Output];
  clockSpeed?: number;
};

export type Refinery = {
  type?: Production;
  input?: [Ore | Liquid, (Ore | Liquid)?];
  output?: [Output, Output?];
  clockSpeed?: number;
};

export type Packager = {
  type?: Production;
  input?: Ore;
  output?: [Output, Output?];
  clockSpeed?: number;
};

export type Blender = {
  type?: Production;
  input?: Ore;
  output?: [Output, Output?];
  clockSpeed?: number;
};

export type ParticleAccelerator = {
  type?: Production;
  input?: Ore;
  output?: [Output, Output?];
  clockSpeed?: number;
};

export type QuantumEncoder = {
  type?: Production;
  input?: Ore;
  output?: [Output, Output?];
  clockSpeed?: number;
};

export type Converter = {
  type?: Production;
  input?: Ore;
  output?: [Output, Output?];
  clockSpeed?: number;
};

// Generator
export type BiomassBurner = {
  type?: Generator;
  input?: Ore;
  output?: [Output];
  clockSpeed?: number;
};

export type CoalPoweredGenerator = {
  type?: Generator;
  input?: Ore;
  output?: [Output];
  clockSpeed?: number;
};

export type FuelPoweredGenerator = {
  type?: Generator;
  input?: Ore;
  output?: [Output];
  clockSpeed?: number;
};

export type NuclearPowerPlant = {
  type?: Generator;
  input?: Ore;
  output?: [Output];
  clockSpeed?: number;
};

export type AlienPowerAugmenter = {
  type?: Generator;
  input?: Ore;
  output?: [Output];
  clockSpeed?: number;
};
