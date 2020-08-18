import React, {useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth.js";


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [isLoading, setIsLoading] = useState(false)
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    })
    console.log(login);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    axiosWithAuth()
      .post('/login', login)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push("/protected");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="loginWin">
      <h1>Lets Play With Bubbles!</h1>
      {isLoading ? (
        <div className="spinner"><h2>Loading Page...</h2></div>
      ) : (
          null
        )}
      <form className="logon" onSubmit={handleSubmit}>
        <legend className="auth">Login Here</legend>
        <label>
        Username:
        <input className="formInput"
          type='text'
          name='username'
          value={login.username}
          onChange={handleChange}
          placeholder='Username'
        />
        </label>
        <label>
          Password:
        <input className="formInput"
          type='password'
          name='password'
          value={login.password}
          onChange={handleChange}
          placeholder='Password'
        />
        </label>
        <button className="loginButton">Submit</button>
      </form>

    </div>
  );
};

export default Login;
