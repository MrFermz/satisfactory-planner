import { NodeTypes } from '@xyflow/react';

import { MinerNode } from './extraction/miner-node';
import { OilExtractorNode } from './extraction/oil-extractor-node';
import { ResourceWellExtractorNode } from './extraction/resource-well-extractor-node';
import { ResourceWellPressurizerNode } from './extraction/resource-well-pressurizer-node';
import { WaterExtractorNode } from './extraction/water-extractor-node';
import { AlienPowerAugmenterNode } from './generator/alien-power-augmenter';
import { BiomassBurnerNode } from './generator/biomass-burner-node';
import { CoalPoweredGeneratorNode } from './generator/coal-powered-generator-node';
import { FuelPoweredGeneratorNode } from './generator/fuel-powered-generator-node';
import { NuclearPowerPlantNode } from './generator/nuclear-power-plant-node';
import { AssemblerNode } from './production/assembler-node';
import { BlenderNode } from './production/blender-node';
import { ConstructorNode } from './production/constructor-node';
import { ConverterNode } from './production/converter';
import { FoundryNode } from './production/foundry-node';
import { ManufacturerNode } from './production/manufacturer-node';
import { PackagerNode } from './production/packager-node';
import { ParticleAcceleratorNode } from './production/particle-accelerator';
import { QuantumEncoderNode } from './production/quantum-encoder';
import { RefineryNode } from './production/refinery-node';
import { SmelterNode } from './production/smelter-node';

export const nodeTypes: NodeTypes = {
  // extractor
  miner: MinerNode,
  'oil-extractor': OilExtractorNode,
  'water-extractor': WaterExtractorNode,
  'resource-well-extractor': ResourceWellExtractorNode,
  'resource-well-pressurizer': ResourceWellPressurizerNode,

  // production
  smelter: SmelterNode,
  foundry: FoundryNode,
  constructor: ConstructorNode,
  assembler: AssemblerNode,
  manufacturer: ManufacturerNode,
  refinery: RefineryNode,
  packager: PackagerNode,
  blender: BlenderNode,
  'particle-accelerator': ParticleAcceleratorNode,
  'quantum-encoder': QuantumEncoderNode,
  converter: ConverterNode,

  // generator
  'biomass-burner': BiomassBurnerNode,
  'coal-powered-generator': CoalPoweredGeneratorNode,
  'fuel-powered-generator': FuelPoweredGeneratorNode,
  'nuclear-power-plant': NuclearPowerPlantNode,
  'alien-power-augmenter': AlienPowerAugmenterNode,
};
