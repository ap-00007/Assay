import { ImageSourcePropType } from 'react-native';

export const BANK_LOGOS: Record<string, ImageSourcePropType> = {
  hdfc: require('../assets/logos/banks/hdfc.png'),
  icici: require('../assets/logos/banks/icici.png'),
  axis: require('../assets/logos/banks/axis.png'),
  sbi: require('../assets/logos/banks/sbi.png'),
  'state bank': require('../assets/logos/banks/sbi.png'),
  kotak: require('../assets/logos/banks/kotak.png'),
  pnb: require('../assets/logos/banks/pnb.png'),
  bob: require('../assets/logos/banks/bob.png'),
  'bank of baroda': require('../assets/logos/banks/bob.png'),
  canara: require('../assets/logos/banks/canara.png'),
  union: require('../assets/logos/banks/union.png'),
  indusind: require('../assets/logos/banks/indusind.png'),
  idfc: require('../assets/logos/banks/idfc.png'),
  yesbank: require('../assets/logos/banks/yesbank.png'),
  federal: require('../assets/logos/banks/federal.png'),
  rbl: require('../assets/logos/banks/rbl.png'),
  paytm: require('../assets/logos/banks/paytm.png'),
  airtelbank: require('../assets/logos/banks/airtelbank.png'),
  groww: require('../assets/logos/banks/groww.png'),
  zerodha: require('../assets/logos/banks/zerodha.png'),
};

export const MERCHANT_LOGOS: Record<string, ImageSourcePropType> = {
  starbucks: require('../assets/logos/merchants/starbucks.png'),
  uber: require('../assets/logos/merchants/uber.png'),
  amazon: require('../assets/logos/merchants/amazon.png'),
  swiggy: require('../assets/logos/merchants/swiggy.png'),
  zomato: require('../assets/logos/merchants/zomato.png'),
  netflix: require('../assets/logos/merchants/netflix.png'),
  bookmyshow: require('../assets/logos/merchants/bookmyshow.png'),
  apple: require('../assets/logos/merchants/apple.png'),
  google: require('../assets/logos/merchants/google.png'),
  spotify: require('../assets/logos/merchants/spotify.png'),
  zepto: require('../assets/logos/merchants/zepto.png'),
  blinkit: require('../assets/logos/merchants/blinkit.png'),
  flipkart: require('../assets/logos/merchants/flipkart.png'),
  makemytrip: require('../assets/logos/merchants/makemytrip.png'),
  cult: require('../assets/logos/merchants/cult.png'),
  gym: require('../assets/logos/merchants/cult.png'),
  airtel: require('../assets/logos/merchants/airtel.png'),
  jio: require('../assets/logos/merchants/jio.png'),
  tea: require('../assets/logos/merchants/chaipoint.png'),
  chai: require('../assets/logos/merchants/chaipoint.png'),
  'tea & coffee': require('../assets/logos/merchants/chaipoint.png'),
  coffee: require('../assets/logos/merchants/starbucks.png'),
  metro: require('../assets/logos/merchants/metro.png'),
  cabs: require('../assets/logos/merchants/uber.png'),
  'auto & quick cabs': require('../assets/logos/merchants/uber.png'),
  snacks: require('../assets/logos/merchants/blinkit.png'),
  groceries: require('../assets/logos/merchants/blinkit.png'),
  'impulse buys': require('../assets/logos/merchants/amazon.png'),
  dining: require('../assets/logos/merchants/swiggy.png'),
  cinema: require('../assets/logos/merchants/bookmyshow.png'),
  music: require('../assets/logos/merchants/spotify.png'),
};

/**
 * Returns a static logo source if available, or null
 */
export function getBrandLogoSource(name: string): ImageSourcePropType | null {
  if (!name) return null;
  const key = name.toLowerCase().trim();

  // Exact or partial check in Banks
  for (const [k, src] of Object.entries(BANK_LOGOS)) {
    if (key === k || key.includes(k)) {
      return src;
    }
  }

  // Exact or partial check in Merchants
  for (const [k, src] of Object.entries(MERCHANT_LOGOS)) {
    if (key === k || key.includes(k)) {
      return src;
    }
  }

  return null;
}
