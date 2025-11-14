import React, {useState} from "react";
import "./FormStyleSheet.css";
import {FaLock} from "react-icons/fa";
import {IoMailSharp} from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom";
import MessageBox from "../MessageBox/MessageBox.jsx";
import Input from "../Input.jsx";
import { getCurrentUser, getUserList } from "../../utils/userInfo.jsx";

function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setChecked] = useState(false);
    const [isCalled, setCalled] = useState(false);
    const [msgInput, setMsgInput] =useState("");

    let navigate = useNavigate();
    function handleChange(e){
        const {name, value} = e.target;
        if(name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
    }
    const onChangeEvent = (e)=>{
        setChecked(e.target.checked);
    }

    function handleClick(e){
        e.preventDefault();
        const userList = getUserList();
        if (email && password) {
          const user = userList.find(user => user.email === email && user.password === password);
          if(user){
            localStorage.setItem("currentUser",JSON.stringify(user));
            navigate("/Home");
          }
          else{
            setCalled(true);
            setMsgInput("Invalid email or password");
          }
        } else {
          setCalled(true);
          setMsgInput("Email and password cannot be empty");
          console.log(isCalled);
        }
    }

    return(
        <div className={"login form-wrapper"}>
          {/* Login Form */}
          <form action="">
              <h1>Welcome Home</h1>
              {/* Login Inputs */}
              <Input type={"email"} name={"email"} placeholder={"Email"} value={email} onChange={handleChange} required={true} icon={IoMailSharp}/>
              <Input type={"password"} name={"password"} placeholder={"Password"} value={password} onChange={handleChange} required={true} autoComplete="new-password" icon={FaLock}/>
              {/* Remember Forgot */}
              <div className={"remember-forgot"}>
                    <label><input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e)=>onChangeEvent(e)}
                    />Remember me</label>
                    <Link to={"/Forgot-Password"}>Forgot password?</Link>
                </div>
              {/* Login Button */}
              <button
                  className={"form-submit-button"}
                  type={"submit"}
                  onClick={handleClick}
              >Login
              </button>
              {/* Register Link */}
              {isCalled && <MessageBox onClose={() => setCalled(false)} message={msgInput} />}
                <div className={"register-link"}>
                    <p>Don't have an account?
                        <Link to={"/Register"}> Register</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;