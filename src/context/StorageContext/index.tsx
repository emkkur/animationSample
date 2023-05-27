import {createContext, useContext} from 'react';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

enum StorageKeys {
  AUTHTOKEN = 'AUTHTOKEN',
}

type typeMapReturnType =
  | typeof storage.getString
  | typeof storage.getBoolean
  | typeof storage.getNumber;

const typeMap: {[key in StorageKeys]: typeMapReturnType} = {
  AUTHTOKEN: storage.getString,
};

type MMKVDataType = string | boolean | number | undefined;

type StorageContextType = {
  readStorage: (key: keyof typeof StorageKeys) => MMKVDataType;
  writeStorage: (key: keyof typeof StorageKeys, value: MMKVDataType) => void;
  deleteStorage: (key: keyof typeof StorageKeys) => void;
};

const defaultContext: StorageContextType = {
  readStorage: _ => '',
  writeStorage: _ => null,
  deleteStorage: () => null,
};

const StorageContext = createContext<StorageContextType>(defaultContext);

const StorageProvider = (children: Element) => {
  const readStorage: StorageContextType['readStorage'] = key => {
    return typeMap[key](key);
  };

  const writeStorage: StorageContextType['writeStorage'] = (key, value) => {
    if (!value) {
      return;
    }
    storage.set(key, value);
  };

  const deleteStorage: StorageContextType['deleteStorage'] = key => {
    storage.delete(key);
  };

  return (
    <StorageContext.Provider
      value={{readStorage, writeStorage, deleteStorage}}
      {...children}
    />
  );
};

const useStorage = () => {
  return {...useContext(StorageContext)};
};

export {useStorage, StorageProvider};
