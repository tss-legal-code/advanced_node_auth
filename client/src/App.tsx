import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';

const App: FC = () => {

  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);


  return (
    <div>
      <h1>{store.isAuth ? `Hello ${store.user.email}` : `Please login or register`}</h1>
      <LoginForm />
    </div>
  );
};

export default observer(App);
