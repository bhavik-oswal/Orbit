import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [userData, setUserData] = useState({});

    const {user, setUser } = React.useContext(UserDataContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const newUser = {
            email: email,
            password: password,
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser);
        if(response.status === 200) {
          const data = response.data;
          setUser(data);
          localStorage.setItem('token', data.token);
          navigate('/home');
        }
        
        setEmail('');
        setPassword('');
    };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <h2 className="w-16 mb-10 text-xl font-bold">Orbit</h2>
        <form onSubmit={(e) => {submitHandler(e)}}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="••••••••"
          />
          <button className="bg-black text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">New here? <Link to='/signup' className="text-blue-600">Create an account</Link></p>
      </div>
      <div>
        <Link to='/captain-login' className="bg-[#FFA116] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base">Sign in as Captain</Link>
      </div>
    </div>
  );
};

export default UserLogin;
