export const DELIVERY_ITEMS = {
  APPLE: 'apple',
  BANANA: 'banana',
  BLUEBERRY: 'blueberry',
  GRAPES: 'grapes',
  PINEAPPLE: 'pineapple',
} as const;
export type DELIVERY_ITEMS =
  (typeof DELIVERY_ITEMS)[keyof typeof DELIVERY_ITEMS];
