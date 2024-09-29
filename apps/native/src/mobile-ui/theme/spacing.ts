import { isTablet } from 'react-native-device-info';

const defaultSpacing = {
  '0.25-x': 1,
  '0.5-x': 2,
  '0.625-x': 2.5,
  '0.75-x': 3,
  '1-x': 4,
  '1.25-x': 5,
  '1.5-x': 6,
  '1.75-x': 7,
  '2-x': 8,
  '2.5-x': 10,
  '2.75-x': 11,
  '3-x': 12,
  '3.5-x': 14,
  '4-x': 16,
  '4.5-x': 18,
  '5-x': 20,
  '5.25-x': 21,
  '5.5-x': 22,
  '6-x': 24,
  '6.5-x': 26,
  '7-x': 28,
  '7.5-x': 30,
  '8-x': 32,
  '9-x': 36,
  '9.5-x': 38,
  '10-x': 40,
  '11-x': 44,
  '11.5-x': 46,
  '12-x': 48,
  '13-x': 52,
  '14-x': 56,
  '14.5-x': 58,
  '15-x': 60,
  '16-x': 64,
  '18-x': 72,
  '18.5-x': 74,
  '20-x': 80,
  '22-x': 88,
  '23-x': 92,
  '24-x': 96,
  '25-x': 100,
  '26-x': 104,
  '28-x': 112,
  '29-x': 116,
  '30-x': 120,
  '32-x': 128,
  '33-x': 132,
  '40-x': 160,
  '50-x': 200,
  '85-x': 340,
};

export const spacing = Object.fromEntries(
  Object.entries(defaultSpacing).map((e) => {
    const keyName = e[0];
    const value = e[1];
    if (isTablet()) {
      return [keyName, value * 1.5];
    } else {
      return [keyName, value];
    }
  }),
);
