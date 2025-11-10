import React, {Children,useState} from "react";
import Input from "../Input.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import { saveRooms} from "../../utils/saveRooms.jsx";
import MessageBox from "../MessageBox/MessageBox.jsx";

export default function RoomSetup() {
    const navigate = useNavigate();
    const [msg, setMsg]= useState("");
    const [isCalled, setCalled] = useState(false);
    const [roomNumbers, setRoomNumbers] = useState({
        bedroom: "",
        livingRoom: "",
        kitchen: "",
        bathroom: "",
        toilet: "",
    });
    function handleInput(e) {
        const {name, value} = e.target;
        // only numbers
        if (/^\d*$/.test(value)) {
            setRoomNumbers((prev)=>({
                ...prev,
                [name]:value,
            }));
        }
    }

    function handleClick(e) {
        e.preventDefault();
        const {bedroom, livingRoom, kitchen, bathroom, toilet}=roomNumbers;
        // show warn if there is no room input
        if(
            !bedroom &&
            !livingRoom &&
            !kitchen &&
            !bathroom &&
            !toilet
        ){
            setMsg("Please enter at least one room number.");
            setCalled(true);
            return;
        }
        // create room data
        const roomData = {
            bedroom: Array.from({length: Number(bedroom) || 0}, (_, i)=>({
                id: i+1,
                type:"bedroom",
                lightOn:false,
                temperature:22,
            })),
            livingRoom: Array.from({length: Number(livingRoom) || 0}, (_, i) =>({
                id: i+1,
                type: "livingRoom",
                lightOn: false,
                temperature: 23,
            })),
            kitchen: Array.from({length:Number(kitchen) || 0 }, (_,i)=>({
                id: i+1,
                type: "kitchen",
                lightOn: false,
                waterOn: true,
                temperature: 24,
            })),
            bathroom:Array.from({length: Number(bathroom) || 0 }, (_, i) => ({
                id: i + 1,
                type: "bathroom",
                waterOn: true,
                temperature: 21,
            })),
            toilet: Array.from({length: Number(toilet) || 0 }, (_, i)=>({
                id: i + 1,
                type: "toilet",
                waterOn: true,
                temperature: 21,
            })),
        };
        saveRooms(roomData);
        navigate("/Home");
    }

    return (
        <div className={"form-wrapper"}>
            <form>
                <Input type={"text"} value={roomNumbers.bedroom} name={"bedroom"}  onChange={handleInput} placeholder={"Bedroom number"}/>
                <Input type={"text"} value={roomNumbers.livingRoom} name={"livingRoom"} onChange={handleInput} placeholder={"Living room number"}/>
                <Input type={"text"} value={roomNumbers.kitchen} name={"kitchen"} onChange={handleInput} placeholder={"Kitchen number"}/>
                <Input type={"text"} value={roomNumbers.bathroom} name={"bathroom"} onChange={handleInput} placeholder={"Bathroom number"}/>
                <Input type={"text"} value={roomNumbers.toilet} name={"toilet"} onChange={handleInput} placeholder={"Toilet number"}/>
                <button type={"submit"} className={"form-submit-button"} onClick={handleClick}>Submit</button>
                {isCalled ? <MessageBox message={msg} onClose={() => {
                    setCalled(false);
                    setMsg("");
                }}/> : null }
            </form>
        </div>

    );
}
