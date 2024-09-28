import { useModal as useNativeModal } from 'react-native-modalfy';
import { IModalStackParams } from '../../screens/modal';

export const useModal = () => useNativeModal<IModalStackParams>();
