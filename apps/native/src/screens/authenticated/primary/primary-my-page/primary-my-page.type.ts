export type IWebViewParams = {
  title: string;
  uri: string;
};

export type IOpenDialogModalParams = {
  title: string;
  onPressCancel: () => Promise<void>;
};
