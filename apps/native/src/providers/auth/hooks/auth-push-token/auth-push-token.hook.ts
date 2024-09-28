// import { ChannelIO } from 'react-native-channel-plugin';
// import { OneSignal } from 'react-native-onesignal';
// import { useDidMount } from 'rooks';

// type IAuthPushTokenHookInput = {
//   userId: string | null;
// };
// type IAuthPushTokenHookReturn = void;

// export const useAuthPushToken: Hook<IAuthPushTokenHookInput, IAuthPushTokenHookReturn> = ({
//   userId,
// }) => {
//   useDidMount(() => {
//     (async () => {
//       try {
//         const oneSignalPushToken = OneSignal.User.pushSubscription.getPushSubscriptionToken();
//         const pushToken = oneSignalPushToken;
//         ChannelIO.initPushToken(pushToken);
//       } catch (e) {
//         console.log(e);
//       }
//     })();
//   });
// };
