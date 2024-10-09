export type IFormattedTime = {
  period: string;
  formattedHourWithZero: string | number;
  formattedMinuteWithZero: string | number;
};

export type ITimeSubmitModalParams = {
  formattedTime: IFormattedTime;
  onSubmit: () => Promise<void>;
};
