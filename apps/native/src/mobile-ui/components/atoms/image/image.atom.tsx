import { ImageSourcePropType, ImageStyle, Image as NativeImage } from 'react-native';

interface CustomImageProps {
  source: ImageSourcePropType;
  style?: ImageStyle;
}

export const Image = ({ ...props }: CustomImageProps) => {
  return <NativeImage {...props} />;
};
