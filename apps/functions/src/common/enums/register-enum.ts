import {
  EnumGender,
  EnumMissionCategory,
  EnumOAuthProviderType,
  EnumResponseType,
  EnumSubscriptionStatus,
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
registerEnumType(EnumSubscriptionStatus, {
  name: 'EnumSubscriptionStatus',
  description: undefined,
});
