import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';
// import { useMMKVFlipper } from 'react-native-mmkv-flipper-plugin';

export interface IMMKVContext {
  keystore: TypedMMKVInterface<IMMKVKeystoreString, IMMKVKeystoreNumber, IMMKVKeystoreBoolean>;
}

export const MMKVContext = createContext<IMMKVContext | null>(null);

export interface TypedMMKVInterface<StringKeysT, NumberKeysT, BoolKeysT> {
  /**
   * Set a value for the given `key`.
   */
  set: (key: StringKeysT | NumberKeysT | BoolKeysT, value: boolean | string | number) => void;
  /**
   * Get a boolean value for the given `key`.
   *
   * @default false
   */
  getBoolean: (key: BoolKeysT) => boolean;
  /**
   * Get a string value for the given `key`.
   *
   * @default undefined
   */
  getString: (key: StringKeysT) => string | undefined;
  /**
   * Get a number value for the given `key`.
   *
   * @default 0
   */
  getNumber: (key: NumberKeysT) => number;
  /**
   * Delete the given `key`.
   */
  delete: (key: StringKeysT | NumberKeysT | BoolKeysT) => void;
  /**
   * Get all keys.
   *
   * @default []
   */
  getAllKeys: () => Array<StringKeysT | NumberKeysT | BoolKeysT>;
  /**
   * Delete all keys.
   */
  clearAll: () => void;
  /** */
  addOnValueChangedListener: (onValueChanged: (key: string) => void) => { remove: () => void };
}

export function createKeyStore<
  StringKeysT extends string = never,
  NumberKeysT extends string = never,
  BoolKeysT extends string = never,
>(): TypedMMKVInterface<StringKeysT, NumberKeysT, BoolKeysT> {
  const _keyStore = new MMKV();

  return {
    set: (key, value) => _keyStore.set(key, value),
    getBoolean: (key) => _keyStore.getBoolean(key),
    getString: (key) => _keyStore.getString(key),
    getNumber: (key) => _keyStore.getNumber(key),
    delete: (key) => _keyStore.delete(key),
    getAllKeys: () => _keyStore.getAllKeys() as Array<StringKeysT | NumberKeysT | BoolKeysT>,
    clearAll: () => _keyStore.clearAll(),
    addOnValueChangedListener: (onValueChanged: (key: string) => void) =>
      _keyStore.addOnValueChangedListener(onValueChanged),
  };
}

type IMMKVProviderProps = {
  children: ReactNode;
};

export enum EnumMMKVKeystoreString {
  'ANSWER_BEFORE_SIGN_IN' = 'ANSWER_BEFORE_SIGN_IN',
  'LAST_REMINDER_TIME_DAY' = 'LAST_REMINDER_TIME_DAY',
  'LAST_REMINDER_TIME_MINUTES' = 'LAST_REMINDER_TIME_MINUTES',
}

type IMMKVKeystoreString = EnumMMKVKeystoreString;

export enum EnumMMKVKeystoreNumber {
  'EXAMPLE' = 'EXAMPLE',
}

type IMMKVKeystoreNumber = EnumMMKVKeystoreNumber;

export enum EnumMMKVKeystoreBoolean {
  'EXAMPLE' = 'EXAMPLE',
}

type IMMKVKeystoreBoolean = EnumMMKVKeystoreBoolean;

export const MMKVProvider = ({ children }: IMMKVProviderProps) => {
  const [keystore, setKeystore] = useState<
    TypedMMKVInterface<IMMKVKeystoreString, IMMKVKeystoreNumber, IMMKVKeystoreBoolean>
  >(createKeyStore<IMMKVKeystoreString, IMMKVKeystoreNumber, IMMKVKeystoreBoolean>());
  useEffect(() => {
    const listener = keystore.addOnValueChangedListener((changedKey) => {
      setKeystore(createKeyStore<IMMKVKeystoreString, IMMKVKeystoreNumber, IMMKVKeystoreBoolean>());
    });

    // cleanup function
    return () => {
      listener.remove();
    };
  }, []);

  return <MMKVContext.Provider value={{ keystore }}>{children}</MMKVContext.Provider>;
};

export const useMMKV = () => {
  const context = useContext(MMKVContext);

  if (!context) {
    throw new Error('useMMKV must be used within a MMKVProvider');
  }
  return context;
};
