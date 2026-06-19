import { Country } from '../types';

export const COUNTRIES: Country[] = [
  { code: 'LR', name: 'Liberia',       flag: '🇱🇷', dialCode: '+231', currency: 'LRD' },
  { code: 'SL', name: 'Sierra Leone',  flag: '🇸🇱', dialCode: '+232', currency: 'SLL' },
  { code: 'GH', name: 'Ghana',         flag: '🇬🇭', dialCode: '+233', currency: 'GHS' },
  { code: 'NG', name: 'Nigeria',       flag: '🇳🇬', dialCode: '+234', currency: 'NGN' },
  { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮', dialCode: '+225', currency: 'XOF' },
  { code: 'GN', name: 'Guinea',        flag: '🇬🇳', dialCode: '+224', currency: 'GNF' },
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1',   currency: 'USD' },
  { code: 'GB', name: 'United Kingdom',flag: '🇬🇧', dialCode: '+44',  currency: 'GBP' },
];

export const DEFAULT_COUNTRY = COUNTRIES[0];
