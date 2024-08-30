export const CONFIG_PORT = Symbol('CONFIG_PORT');

export interface ConfigPort {
  get(configType: string): void;
  get isDevelopment(): boolean;
}
