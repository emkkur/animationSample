import {createContext, useContext, useState} from 'react';
import {useStorage} from '../StorageContext';

type AuthContextType = {
  userToken: string | null;
  userName: string | null;
  userId: string | null;
  login: (onComplete?: () => void) => void;
  logout: (onComplete?: () => void) => void;
};

const defaultState: AuthContextType = {
  userToken: null,
  userId: null,
  userName: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultState);

const AuthProvider = (children: Element) => {
  const [userToken, setUserToken] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  const {writeStorage, deleteStorage} = useStorage();

  const login = () => {
    writeStorage('AUTHTOKEN', 'coolvalue12');
    setUserToken('');
    setUserName('');
    setUserId('');
  };

  const logout = () => {
    deleteStorage('AUTHTOKEN');
  };

  return (
    <AuthContext.Provider
      value={{userToken, userId, userName, login, logout}}
      {...children}
    />
  );
};

const useAuth = () => {
  return {...useContext(AuthContext)};
};

export {useAuth, AuthProvider};
