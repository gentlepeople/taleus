import { EnumGender, EnumOAuthProviderType } from '@gentlepeople/taleus-schema';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(EnumGender, {
  name: 'EnumGender',
  description: undefined,
});
registerEnumType(EnumOAuthProviderType, {
  name: 'EnumOAuthProviderType',
  description: undefined,
});
