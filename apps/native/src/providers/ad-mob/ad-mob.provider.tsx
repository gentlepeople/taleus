import { createContext, ReactNode, useCallback, useContext, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import mobileAds, {
  BannerAd,
  MaxAdContentRating,
  RewardedInterstitialAd,
  useForeground,
} from 'react-native-google-mobile-ads';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { EAdType, getAdUnitId } from './utils';

export type IAdMobContext = {
  showRewardedInterstitialAd: () => void;
  bannerAd: {
    bannerAdUnitId: string;
    bannerRef: React.MutableRefObject<BannerAd>;
  };
};

export const AdMobContext = createContext<IAdMobContext | null>(null);

type IAdMobProviderProps = {
  children: ReactNode;
};

export const AdMobProvider = ({ children }: IAdMobProviderProps) => {
  // TODO:민기 should setup react-native-admob-native-ads
  const bannerRef = useRef<BannerAd>(null);
  const bannerAdUnitId = getAdUnitId(EAdType.BANNER);
  const rewarededInterstitialAd = RewardedInterstitialAd.createForAdRequest(
    getAdUnitId(EAdType.REWARDED_INTERSTITIAL),
    {},
  );

  const isLoaded = rewarededInterstitialAd.loaded;

  const showRewardedInterstitialAd = useCallback(() => {
    rewarededInterstitialAd.show();

    if (!isLoaded) {
      rewarededInterstitialAd.load();
    }
  }, [rewarededInterstitialAd, isLoaded]);

  const getDeviceId = useCallback(async () => {
    const deviceId = await DeviceInfo.getUniqueId();

    return deviceId;
  }, [DeviceInfo]);

  const setAdMobConfig = useCallback(async (deviceId: string) => {
    await mobileAds().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.T,
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: true,
      testDeviceIdentifiers: ['EMULATOR', deviceId],
    });
  }, []);

  const initialize = useCallback(async () => {
    await mobileAds().initialize();
  }, []);

  const requestTrackingPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const status = await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
      if (status === RESULTS.GRANTED) {
        console.log('Tracking permission granted.');
      } else {
        console.log('Tracking permission denied.');
      }
    }
  }, []);

  // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
  // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  useEffect(() => {
    (async () => {
      await requestTrackingPermission();
      const deviceId = await getDeviceId();
      console.log(deviceId, 'device id for admob');
      await setAdMobConfig(deviceId);
      await initialize();
    })();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      rewarededInterstitialAd.load();
    }
  }, [isLoaded]);

  return (
    <AdMobContext.Provider
      value={{
        showRewardedInterstitialAd,
        bannerAd: {
          bannerAdUnitId,
          bannerRef,
        },
      }}
    >
      {children}
    </AdMobContext.Provider>
  );
};

export const useAdMob = () => {
  const context = useContext(AdMobContext);

  if (!context) {
    throw new Error('useAdMob must be used within a AdMobProvider');
  }
  return context;
};
