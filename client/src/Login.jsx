import React, { useState } from "react";
import {TextField, Button} from '@material-ui/core/';
import {Link } from "react-router-dom";

function Login(props) {
  const [click, setClick] = useState(false);
  
  let handleClick = () => {
    setClick(true)
  }

  if (click){
    return(
      <div className="loginPage">
      <form noValidate autoComplete="off">
        <div className = "username"><TextField  id="user" label="Username" /></div>
        <div className = "password" ><TextField  id="pass" label="Password" /></div>
      </form>
      <Link to="/home">
        <div className="loginButton3"><Button className = "loginButton2" variant="contained">Login</Button></div>
      </Link>
    </div>
    )
  }

  return(
    <div className="starterPage">
      <div className = 'loginButton'><Button className = 'loginButton'  onClick={()=>{handleClick()}} variant="contained">Login</Button></div>
    </div>
  )
}

export default Login;
