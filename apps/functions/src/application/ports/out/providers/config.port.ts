export const CONFIG_PORT = Symbol('CONFIG_PORT');

export interface IConfigPort {
  get(configType: string): void;
  get isDevelopment(): boolean;
}
