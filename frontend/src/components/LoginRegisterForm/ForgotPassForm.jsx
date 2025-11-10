import React, {useState} from "react";
import "./FormStyleSheet.css";
import MessageBox from "../MessageBox/MessageBox.jsx";
import Input from "../Input.jsx";
function ForgotPassForm(){
    const [email, setEmail] = useState("");
    const [isCalled, setCalled] = useState(false);
    const [msg, setMsg] = useState("");
    function handleNewPass(e) {
        e.preventDefault();
        setCalled(true);
        if(!email)setMsg("Email area must be filled!");
        else setMsg("New password is send!");
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    return(
        <div className={"form-wrapper"} >
            <form action="">
                <Input type={"email"} placeholder={"Type your email"} value={email} onChange={handleEmail}/>
                <button className={"form-submit-button"} type={"submit"} onClick={handleNewPass}>Send New Password</button>
                {isCalled ? <MessageBox message={msg} onClose={() => {
                    setCalled(false);
                    setMsg("");
                }}/> : null}
            </form>
        </div>
    );
}
export default ForgotPassForm;