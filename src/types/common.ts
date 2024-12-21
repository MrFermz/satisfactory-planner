import { Alien } from './alien';
import { Ammo } from './ammo';
import { Communication } from './communication';
import { Consume } from './consume';
import { Container } from './container';
import { Electronic } from './electronic';
import { Ficsmas } from './ficsmas';
import { Fuel } from './fuel';
import { Hand } from './hand';
import { IndustrialPart } from './industrial';
import { Ingot } from './ingot';
import { Liquid } from './liquid';
import { Mineral } from './mineral';
import { Nuclear } from './nuclear';
import { Ore } from './ore';
import { Special } from './special';
import { StandartPart } from './standart-part';

export type Quality = 'impure' | 'normal' | 'pure';

export type Recipe = SmelterRecipe | ConstructorRecipe | AssemblerRecipe | FoundryRecipe;

export type ExtractorValue = {
  id: string;
  type: Quality;
  value: number;
};

export type SmelterRecipe = {
  id: string;
  type: [Ore | Mineral | Ficsmas];
  value: [number];
  output: [number];
  result: Ingot | Ficsmas;
};

export type RefineryRecipe = {
  type: [Ore | Liquid, (Ore | Liquid)?];
  value: [number, number?];
  output: [number, number?];
  result: [Liquid | Mineral, (Liquid | Mineral)?];
};

export type ConstructorRecipe = {
  id: string;
  type: (Ore | Ingot | StandartPart | Fuel | Electronic | Ficsmas | Special | Alien)[];
  value: [number];
  output: [number];
  result:
    | Ficsmas
    | StandartPart
    | Electronic
    | Container
    | Mineral
    | Fuel
    | Alien
    | Special
    | Ammo
    | Ore;
};

export type FoundryRecipe = {
  id: string;
  type: [
    Ore | Ingot | StandartPart | Fuel | Electronic | Ficsmas | Special | Alien | Mineral,
    Ore | Ingot | StandartPart | Fuel | Electronic | Ficsmas | Special | Alien | Mineral,
  ];
  value: [number, number];
  output: [number];
  result: [
    | Ficsmas
    | StandartPart
    | Electronic
    | Container
    | Mineral
    | Fuel
    | Alien
    | Special
    | Ammo
    | Ore
    | Ingot,
  ];
};

export type AssemblerRecipe = {
  id?: string;
  type: [
    (
      | Ficsmas
      | StandartPart
      | Ingot
      | Mineral
      | IndustrialPart
      | Electronic
      | Nuclear
      | Communication
      | Special
      | Ammo
      | Fuel
      | Consume
      | Ore
      | Container
      | IndustrialPart
    ),
    (
      | Ficsmas
      | StandartPart
      | Ingot
      | Mineral
      | IndustrialPart
      | Electronic
      | Nuclear
      | Communication
      | Special
      | Ammo
      | Fuel
      | Consume
      | Ore
      | Container
      | IndustrialPart
    ),
  ];
  value: [number, number];
  output: [number];
  result: [
    | Ficsmas
    | Electronic
    | Special
    | StandartPart
    | IndustrialPart
    | Nuclear
    | Container
    | Ammo
    | Consume
    | Fuel
    | Mineral
    | Communication
    | Hand,
  ];
};
