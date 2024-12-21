export type Ore =
  | 'coal'
  | 'limestone'
  | 'bauxite'
  | 'caterium-ore'
  | 'copper-ore'
  | 'iron-ore'
  | 'uranium'
  | 'raw-quartz'
  | 'sulfur'
  | 'sam';

export type Ores = {
  id: Ore;
  label: string;
  value: Ore;
};
