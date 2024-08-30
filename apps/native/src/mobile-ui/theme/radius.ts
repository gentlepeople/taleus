import { isTablet } from 'react-native-device-info';

const defaultRadius = {
  '0.5-x': 2,
  '1-x': 4,
  '1.25-x': 5,
  '1.5-x': 6,
  '2-x': 8,
  '2.5-x': 10,
  '3-x': 12,
  '3.5-x': 14,
  '4-x': 16,
  '4.5-x': 18,
  '5-x': 20,
  '6-x': 24,
  '7-x': 28,
  '7.5-x': 30,
  '8-x': 32,
  '9-x': 36,
  '10-x': 40,
  '11-x': 44,
  '14-x': 56,
  '16-x': 64,
  '24-x': 96,
  '25-x': 100,
  '50-x': 200,
};

export const radius = Object.fromEntries(
  Object.entries(defaultRadius).map((e) => {
    const keyName = e[0];
    const value = e[1];
    if (isTablet() && typeof value === 'number') {
      return [keyName, value * 1.5];
    } else {
      return [keyName, value];
    }
  })
);
