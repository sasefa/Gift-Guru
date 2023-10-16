import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../Auth/AuthProvider';

const Login = () => {
  const history = useHistory();
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // loginUser is a function exposed from the AuthProvider which sends the form data to the backend for validation
    const isSuccess = await loginUser(loginForm);
    if (isSuccess) {
      history.push("/"); // Redirect to home page after successful login
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
