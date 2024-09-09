import {
  EnumGender,
  EnumMissionCategory,
  EnumOAuthProviderType,
  EnumResponseType,
} from '@gentlepeople/taleus-schema';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(EnumGender, {
  name: 'EnumGender',
  description: undefined,
});
registerEnumType(EnumOAuthProviderType, {
  name: 'EnumOAuthProviderType',
  description: undefined,
});
registerEnumType(EnumMissionCategory, {
  name: 'EnumMissionCategory',
  description: undefined,
});
registerEnumType(EnumResponseType, {
  name: 'EnumResponseType',
  description: undefined,
});
