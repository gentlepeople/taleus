import { ModalOptions, ModalStackConfig, createModalStack } from 'react-native-modalfy';



export type IModalStackParams = {
//   DeleteRecord: {
//     title: string;
//     content: string;
//     okayButton: Omit<ComponentProps<typeof Button>, 'children' | 'loading'> & {
//       label: string;
//       onPress?: () => void;
//     };
//     onPop?: () => void;
//   };
//   BottomSheetButtons: {
//     editButton: Omit<ComponentProps<typeof Button>, 'children' | 'loading'> & {
//       onPress: () => void;
//     };
//     deleteButton: Omit<ComponentProps<typeof Button>, 'children' | 'loading'> & {
//       onPress: () => void;
//     };
//     onPop?: () => void;
//   };
//   Dialog: {
//     title?: string | ReactElement;
//     content?: string;
//     okayButton?:
//       | boolean
//       | (Omit<ComponentProps<typeof Button>, 'children' | 'loading'> & {
//           label: string | ReactElement;
//           onClose?: () => void;
//         });
//     cancelButton?:
//       | boolean
//       | (Omit<ComponentProps<typeof Button>, 'children'> & {
//           label: string | ReactElement;
//           onClose?: () => void;
//         });
//     children?: ReactElement;
//     onPop?: () => void;
//   };
};

const modalConfig: ModalStackConfig = {
  
};

const defaultOptions: ModalOptions = {
  backdropOpacity: 0.6,
  disableFlingGesture: true,
  backBehavior: 'none',
};

export const modalStack = createModalStack<IModalStackParams>(modalConfig, defaultOptions);