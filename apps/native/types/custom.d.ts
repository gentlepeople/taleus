declare type Controller<ControllerInput = void, ControllerResult = undefined> = (
  input: ControllerInput,
) => ControllerResult;
declare type Hook<HookInput, HookReturn> = (input: HookInput) => HookReturn;
declare type Util<UtilInput, UtilReturn> = (input: UtilInput) => UtilReturn;

declare module '*.png' {
  const value: string;
  export default value;
}
