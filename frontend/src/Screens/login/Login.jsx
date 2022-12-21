import React, { useState } from "react";
import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Heading from "../Components/Heading";

const Login = () => {
const [userName , setUserName] = useState("")
const [passWord , setPassWord] = useState("")

const onLoginClick = () => {
    console.log(userName);
}


  return (
    <div>
      <Heading />
      <div className="container_login">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          className="login_form"
        >
          <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e) => {
                setUserName(e.target.value)
            }}/>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => {
                setPassWord(e.target.value)
            }}
          />
          <Button variant="contained" onClick={onLoginClick}>LogIn</Button>
        </Box>
      </div>
    </div>
  );
};

export default Login;
