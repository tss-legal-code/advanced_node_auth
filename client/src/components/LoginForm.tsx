import React, { FC, useContext, useState } from 'react';
import { Context } from '..';

const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { store } = useContext(Context);

  return (
    <div>
      <input
        onChange={evt => setEmail(evt.target.value)}
        value={email}
        type="text"
        placeholder="email"
      />
      <input
        onChange={evt => setPassword(evt.target.value)}
        value={password}
        type="text"
        placeholder="password"
      />
      <button onClick={() => store.login(email, password)}>Login</button>
      <button onClick={() => store.registration(email, password)}>Register</button>
    </div>
  );
};

export default LoginForm;