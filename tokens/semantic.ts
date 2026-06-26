import { primitives as p } from './primitives';

export const semantic = {
  color: {
    bg: {
      default: p.color.white,
      subtle:  p.color['gray-100'],
      ink:     p.color.black,
    },
    text: {
      default:  p.color.black,
      'on-dark': p.color.white,
      subtle:   p.color['gray-100'],
    },
    border: {
      default: p.color['gray-100'],
    },
    interactive: {
      primary:       p.color['yellow-400'],
      'primary-hover': p.color['gold-400'],
    },
    status: {
      pink:   p.color['pink-100'],
      rose:   p.color['rose-100'],
      purple: p.color['purple-100'],
      olive:  p.color['olive-100'],
      mint:   p.color['mint-100'],
      peach:  p.color['peach-100'],
    },
  },
  typography: {
    h1: {
      fontFamily: p.font.family.serif,
      fontSize:   p.font.size.h1,
      lineHeight: p.font.lineHeight.h1,
      fontWeight: p.font.weight.regular,
    },
    h2: {
      fontFamily: p.font.family.serif,
      fontSize:   p.font.size.h2,
      lineHeight: p.font.lineHeight.h2,
      fontWeight: p.font.weight.regular,
    },
    description: {
      fontFamily: p.font.family.pixel,
      fontSize:   p.font.size.description,
      lineHeight: p.font.lineHeight.description,
      fontWeight: p.font.weight.regular,
    },
    h3: {
      fontFamily: p.font.family.grotesk,
      fontSize:   p.font.size.h3,
      lineHeight: p.font.lineHeight.h3,
      fontWeight: p.font.weight.semibold,
    },
    h4: {
      fontFamily: p.font.family.grotesk,
      fontSize:   p.font.size.h4,
      lineHeight: p.font.lineHeight.h4,
      fontWeight: p.font.weight.semibold,
    },
    'text-pixel': {
      fontFamily: p.font.family.pixel,
      fontSize:   p.font.size['text-pixel'],
      lineHeight: p.font.lineHeight['text-pixel'],
      fontWeight: p.font.weight.regular,
    },
    'text-grotesk': {
      fontFamily: p.font.family.grotesk,
      fontSize:   p.font.size['text-grotesk'],
      lineHeight: p.font.lineHeight['text-grotesk'],
      fontWeight: p.font.weight.regular,
    },
    'text-bold': {
      fontFamily: p.font.family.grotesk,
      fontSize:   p.font.size['text-grotesk'],
      lineHeight: p.font.lineHeight['text-grotesk'],
      fontWeight: p.font.weight.bold,
    },
    caps: {
      fontFamily:    p.font.family.grotesk,
      fontSize:      p.font.size.caps,
      lineHeight:    p.font.lineHeight.caps,
      fontWeight:    p.font.weight.regular,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
  },
} as const;

export type Semantic = typeof semantic;
