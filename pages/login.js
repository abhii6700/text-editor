import React, { useState } from "react";
import axios from "../axios";
import Link from "next/link";
import { useRouter } from "next/router";
import {TOKEN} from '../constants/AccessToken'
import Button from "@material-tailwind/react/Button";

function Login(props) {
  const router = useRouter();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/user/login", loginDetails);
      localStorage.setItem(TOKEN, `${response.data.auth_token}`);
      localStorage.setItem("role", `${response.data.role}`);
      response.data.auth_token && props.setIsLoggedIn(true) && router.push("/");
      
      
    } catch (err) {
      console.log(err);
    }
    
  };

  return (
    <div className="flex justify-center mt-44 rounded">
      <div className="bg-[#f8f9fa] p-6 flex flex-col gap-8 items-center">
        <h1>Login to continue</h1>
        <input
          className=" px-5 py-2 rounded text-base outline-none"
          type="email"
          name="email"
          placeholder="Enter Email address"
          onChange={handleChange}
        />
        <input
          className=" px-5 py-2 rounded text-base outline-none"
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />
        <Button
          color="blue"
          buttonType="filled"
          size="regular"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          type= 'submit'
          onClick={handleClick}
        >
          Login
        </Button>

        <p className="text-xs">
          Don’t have an account?{" "}
          <span className="text-blue-700 font-medium">
            <Link href="/signup">Signup</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
