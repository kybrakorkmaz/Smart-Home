import './App.css'
import LoginForm from "./components/LoginRegisterForm/LoginForm.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterForm from "./components/LoginRegisterForm/RegisterForm.jsx";
import ForgotPassForm from "./components/LoginRegisterForm/ForgotPassForm.jsx";
import Home from "./components/HomeComponents/Home.jsx";
import RoomSetup from "./components/RoomComponents/RoomSetup.jsx";
function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<LoginForm/>}/>
            <Route path={"/Register"} element={<RegisterForm/>}/>
            <Route path={"/Forgot-Password"} element={<ForgotPassForm/>}/>
            <Route path={"/Home"} element={<Home/>} />
            <Route path={"/Room-Setup"} element={<RoomSetup/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
