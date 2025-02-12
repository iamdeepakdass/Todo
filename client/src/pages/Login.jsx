import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log(res);

        toast(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast("Incorrect Email or password");
    }
  };

  return (
    <div>
      <Input
        value={user.email}
        onChange={changeHandler}
        type="text"
        placeholder="Email"
        name="email"
        className="w-1/4 p-2 m-2 rounded-lg"
      />
      <Input
        value={user.password}
        onChange={changeHandler}
        type="password"
        placeholder="Password"
        name="password"
        className="w-1/4 p-2 m-2 rounded-lg"
      />
      <Button onClick={loginHandler}>Login</Button>
    </div>
  );
};

export default Login;
