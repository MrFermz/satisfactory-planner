export type Liquid =
  | 'water'
  | 'crude-oil'
  | 'heavy-oil-residue'
  | 'fuel'
  | 'liquid-biofuel'
  | 'turbo-fuel'
  | 'alumina-solution'
  | 'sulfuric-acid'
  | 'nitric-acid'
  | 'dissolved-silica';

export type Liquids = {
  id: Liquid;
  label: string;
  value: Liquid;
};
