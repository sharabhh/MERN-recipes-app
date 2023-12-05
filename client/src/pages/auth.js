import axios from "axios";
import React, { useState } from "react";
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"

export default function Auth() {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate()

  async function onSubmit(event){
event.preventDefault();
try{
const response = await axios.post('http://localhost:3001/auth/login',{username: username, password: password});

console.log(response)

setCookies("access_token",response.data.token)
window.localStorage.setItem("userID", response.data.userID)
navigate('/')
} catch(err){
  console.error(err)
}
  }

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      btnText="Login"
      onSubmit={onSubmit}
    />
  );
}

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

async function onSubmit(event){
event.preventDefault();
try{

    axios.post('http://localhost:3001/auth/register',{username, password});
    alert('Registration Completed!')

} catch(err){
    console.error(err)
}
}

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      btnText="Register"
      onSubmit={onSubmit}
    />
  );
}

function Form({
  username,
  setUsername,
  password,
  setPassword,
  btnText,
  onSubmit,
}) {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{btnText}</h2>
        <div className="form-group">
          <label htmlFor="username"> Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"> Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">{btnText}</button>
      </form>
    </div>
  );
}
