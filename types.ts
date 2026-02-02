
export enum Screen {
  LANDING = 'LANDING',
  PREFERENCES = 'PREFERENCES',
  RESULT = 'RESULT'
}

export type FontStyle = 'modern' | 'elegant' | 'handwritten' | 'classic';
export type CardStyle = 'clean' | 'gradient' | 'glass' | 'dots' | 'stripes' | 'hearts';
export type BorderStyle = 'none' | 'thin' | 'thick' | 'double' | 'dashed';

export interface Preferences {
  color: string;
  bloom: string;
  companion: string;
  treat: string;
  fontStyle: FontStyle;
  cardStyle: CardStyle;
  borderStyle: BorderStyle;
}

export interface QuoteData {
  text: string;
  author: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
  value: string;
}
