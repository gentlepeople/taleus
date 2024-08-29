import { enum_gender } from '@gentlepeople/taleus-schema';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(enum_gender, {
  name: 'EGender',
  description: undefined,
});
