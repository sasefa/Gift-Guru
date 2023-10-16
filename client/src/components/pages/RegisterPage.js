import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../Auth/AuthProvider';

const Register = () => {
  const history = useHistory();
  const { registerUser } = useContext(AuthContext);

  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSuccess = await registerUser(registerForm);
    if (isSuccess) {
      history.push("/login"); // Redirect to login page after successful registration
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
