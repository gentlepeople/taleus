import { EnumMissionCategory } from '@gentlepeople/taleus-codegen';

type IConvertCategoryUtilInput = EnumMissionCategory;
type IConvertCategoryUtilOutput = string;

export const convertCategory: Util<IConvertCategoryUtilInput, IConvertCategoryUtilOutput> = (
  category,
) => {
  const convertedCategoryMapping = {
    [EnumMissionCategory.HAPPINESS_N_THANKS]: '행복과 감사',
    [EnumMissionCategory.POSITIVE_N_ATTRACTION]: '긍정적 특성과 매력',
    [EnumMissionCategory.INFLUENCE_N_CHANGE]: '영향과 변화',
    [EnumMissionCategory.FEAR_N_DIFFICULTY]: '두려움과 어려움',
    [EnumMissionCategory.DISAPPOINTMENT]: '서운함',
    [EnumMissionCategory.CONFLICT_RESOLUTION]: '갈등 해결',
    [EnumMissionCategory.EXPECTATION_AND_ROLE]: '기대와 역할',
    [EnumMissionCategory.GROWTH_AND_LEARNING]: '성장과 배움',
  };

  return convertedCategoryMapping[category];
};
