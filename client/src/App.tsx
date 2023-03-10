import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

const App: FC = () => {

  const { store } = useContext(Context);

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (!store.isAuth) {
    return (
      <>
        <LoginForm />
      </>
    );
  }

  return (
    <div>
      <h1>{store.isAuth ? `Hello ${store.user.email}` : `Please login or register`}</h1>
      <h1>{store.isActivated ? `Account is activated` : `Please, activate account to get all benefits!`}</h1>
      <button onClick={() => store.logout()}>logout</button>
      <div>
        <button onClick={getUsers}>Get list of users</button>
      </div>
      {users.map(user => <div key={user.email}>{user.email}</div>)}
    </div>
  );
};

export default observer(App);
