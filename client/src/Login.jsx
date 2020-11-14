import React, { useState } from "react";
import {TextField, Button} from '@material-ui/core/';
import {Link } from "react-router-dom";

function Login(props) {

  return(
    <div>
      LOGIN
      <form noValidate autoComplete="off">
        <TextField id="user" label="Username" />
        <TextField id="pass" label="Password" />
      </form>
      <Link to="/home">
      <Button variant="contained">Login</Button>
      </Link>
    </div>
  )
}

export default Login;
