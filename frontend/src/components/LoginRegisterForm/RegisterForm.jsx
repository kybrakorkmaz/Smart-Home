import React, { useState} from "react";
import MessageBox from "../MessageBox/MessageBox.jsx";
import Input from "../Input.jsx";
import { getUser, saveUser } from "../../utils/userInfo.jsx";



function RegisterForm(){
  const [formData, setFormData] = useState({
        fullName: "",
        date: "",
        email: "",
        password: "",
        confirmPassword: "",
        city:""
    });

    const [isPolicyChecked, setPolicyChecked] = useState(false);
    const [msg, setMsg] = useState("");
    const [isCalled, setCalled] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    function handleChange(e) {
        const {name, value} = e.target;
        if(name === "fullName") setFormData(prev=>({...prev, [name]: value}));
        else if(name === "date") setFormData(prev=>({...prev, [name]: value}));
        else if(name === "email") setFormData(prev => ({...prev, [name]: value}));
        else if(name === "password")  setFormData(prev=>({...prev, [name]:value}));
        else if(name === "confirmPassword") setFormData(prev=>({...prev, [name]: value}));
        else if(name === "city") setFormData(prev=>({...prev, [name]: value}));
        else if (name === "policy-checkbox") setPolicyChecked(e.target.checked);
        else{
            console.log("sth happened");
        }
    }

    function handleClicked(e) {
        e.preventDefault();
        const anyNull = Object.values(formData).filter(value => value === "");
        if(!isPolicyChecked && anyNull.length > 0){
            setMsg("Please read the policy and all fields must be filled!");
            setCalled(true);
            console.log(msg);
        }else if(!isPolicyChecked){
            setMsg("Please read the policy!");
            setCalled(true);
            console.log(msg);
        }else if(anyNull.length > 0){
            setMsg("All fields must be filled!");
            setCalled(true);
            console.log(msg);
        }else{
          //get users from localStorage
          const users = getUser();
          if (!emailRegex.test(formData.email)) {
            setMsg("Please enter a valid email address!");
            setCalled(true);
            return;
          }
          if (users.find(user => user.email === formData.email)) {
            setMsg("This email address is already taken!");
            setCalled(true);
            setFormData({
              fullName: "",
              date: "",
              email: "",
              password: "",
              confirmPassword: "",
              city: ""
            });
            return;
          }
          //check if there are any users, if not set first id
          const userId = users.length > 0 ? (users.length) + 1: 1;
          //create new object for new user
          const newUser = {
            id: Number(userId),
            ...formData,
          };

          const updatedUsers = [...users, newUser];
          saveUser(updatedUsers);
          setMsg("Registration successful!");
          setCalled(true);

          setFormData({
            fullName: "",
            date: "",
            email: "",
            password: "",
            confirmPassword: "",
            city: ""
          });
          setPolicyChecked(false);
        }
        
    }

    return(
        <div className={"register form-wrapper"}>
          {/* Register Form */}
            <form action="">
              <h1>Be A Member</h1>
              {/* Register Inputs */}
              <Input type={"text"} placeholder={"Full Name"} value={formData.fullName} name={"fullName"} onChange={handleChange}/>
              <Input type={"date"} value={formData.date} name={"date"} onChange={handleChange}/>
              <Input type={"text"} placeholder={"Email"} value={formData.email} name={"email"} onChange={handleChange}/>
              <Input type={"text"} placeholder={"Password"} value={formData.password} name={"password"} onChange={handleChange}/>
              <Input type={"text"} placeholder={"Confirm Password"} value={formData.confirmPassword} name={"confirmPassword"} onChange={handleChange}/>
              <Input type={"text"} placeholder={"City"} value={formData.confirmPassword} name={"city"} onChange={handleChange}/>
              {/* Policy Box */}
              <div className={"policy-box"}>
                <label><input
                  type="checkbox"
                  checked={isPolicyChecked}
                  onChange={(e)=>handleChange(e)}
                  name={"policy-checkbox"}
                /> I read the policy</label>
              </div>
              {/* Register Button */}
              <button className={"form-submit-button"}
                      type={"submit"}
                      onClick={handleClicked}
              >Register</button>
              {/* Message Box */}
              {isCalled ? <MessageBox onClose={() => {
                  setCalled(false);
                  setMsg("");
              }} message={msg}/> : null}
            </form>
        </div>
    );
}
export default RegisterForm;