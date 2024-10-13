import { Platform } from 'react-native';
import Config from 'react-native-config';
import { TestIds } from 'react-native-google-mobile-ads';

export enum EAdType {
  REWARDED_INTERSTITIAL = 'REWARDED_INTERSTITIAL',
  INTERSTITIAL = 'INTERSTITIAL',
  BANNER = 'BANNER',
  NATIVE = 'NATIVE',
}

export const getAdUnitId = (type: EAdType) => {
  if (type === EAdType.REWARDED_INTERSTITIAL) {
    if (__DEV__) {
      return TestIds.REWARDED_INTERSTITIAL;
    }

    if (Platform.OS === 'ios') {
      return Config.IOS_REWARDED_INTERSTITIAL_AD_UNIT_ID;
    }

    if (Platform.OS === 'android') {
      return Config.ANDROID_REWARDED_INTERSTITIAL_AD_UNIT_ID;
    }
  }

  if (type === EAdType.BANNER) {
    if (__DEV__) {
      return TestIds.BANNER;
    }

    if (Platform.OS === 'ios') {
      return Config.IOS_BANNER_AD_UNIT_ID;
    }

    if (Platform.OS === 'android') {
      return Config.ANDROID_BANNER_AD_UNIT_ID;
    }
  }

  if (type === EAdType.NATIVE) {
    if (__DEV__) {
      // should update by other library
      // return TestIds.;
    }

    if (Platform.OS === 'ios') {
      return Config.IOS_NATIVE_AD_UNIT_ID;
    }

    if (Platform.OS === 'android') {
      return Config.ANDROID_NATIVE_AD_UNIT_ID;
    }
  }

  if (type === EAdType.INTERSTITIAL) {
    if (__DEV__) {
      return TestIds.INTERSTITIAL;
    }

    if (Platform.OS === 'ios') {
      return Config.IOS_INTERSTITIAL_AD_UNIT_ID;
    }

    if (Platform.OS === 'android') {
      return Config.ANDROID_INTERSTITIAL_AD_UNIT_ID;
    }
  }
};
