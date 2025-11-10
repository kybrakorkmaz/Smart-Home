import React, {useState} from "react";
import {MdOutlineBedroomChild} from "react-icons/md";
import { LuBath, LuToilet } from "react-icons/lu";
import { TbLamp, TbLampOff, TbToolsKitchen3 } from "react-icons/tb";
import {FaArrowLeft, FaArrowRight, FaCouch} from "react-icons/fa";
import {getRooms, saveRooms} from "../../utils/saveRooms.jsx";
import { RiWaterFlashFill, RiWaterFlashLine } from "react-icons/ri";

export default function Room({type, data}){
    const [seeProperties, setSeeProperties] = useState(false);
    const [roomData, setRoomData]= useState(data);
    const getIcon = () =>{
        switch (type){
            case "bedroom": return  <MdOutlineBedroomChild className={"icons"} />;
            case "bathroom": return <LuBath className={"icons"}/>;
            case "kitchen": return <TbToolsKitchen3 className={"icons"}/>;
            case "toilet": return <LuToilet className={"icons"}/>;
            case "livingRoom": return <FaCouch className={"icons"}/>;
            default: return null;
        }
    };

    const handleChange = (key, value) => {
        const updated = {...roomData, [key]:value};
        setRoomData(updated);
        //update localStorage
        const allRooms = getRooms();
        const updatedList = allRooms[type].map((room)=>
            room.id === updated.id ? updated : room
        )
        const newData = {...allRooms, [type]: updatedList};
        saveRooms(newData);
    }

    return(
        <div className="room">
            {!seeProperties ? (
                <div className={"room-front"}>
                    {getIcon()}
                    <h2>{type.charAt(0).toUpperCase() + type.slice(1, type.length)+ " " + roomData.id}</h2>
                    <p>
                        Temperature: {roomData.temperature ?? "--"}°C <br/>
                        {roomData.lightOn !== undefined && (
                            <>Light: {roomData.lightOn ? "On" : "Off"} <br/></>
                        )}
                        {roomData.waterOn !== undefined && (
                            <>Water: {roomData.waterOn ? "On" : "Off"} <br/></>
                        )}
                    </p>
                    <div className={"prop-wrapper"}>
                        <label>Properties <button onClick={()=>setSeeProperties(true)}><FaArrowRight className={"detail-icon"}/></button>
                        </label>
                    </div>
                </div>
            ):(
                <div className={"room-back"}>
                    <h2>{type.charAt(0).toUpperCase() + type.slice(1, type.length)+ " " + roomData.id}</h2>
                    {"temperature" in roomData && (
                        <div className={"room-prop"}>
                          <div className={"temperature-wrapper"}>
                            <label htmlFor={"range"}>
                              Temperature:
                            </label>
                            <div id={"temperature-bar"}>
                              <input
                                className={"input-box"}
                                type="range"
                                min={-50}
                                max={50}
                                value={roomData.temperature}
                                onChange={(e) =>
                                  handleChange("temperature", Number(e.target.value))
                                }
                              />
                              <div className={"temperature-value"}>
                                <label>{roomData.temperature}</label>
                              </div>
                            </div>
                          </div>
                        </div>
                    )}
                  {"lightOn" in roomData && (
                    <div className="room-prop">
                      <span
                        onClick={() => handleChange("lightOn", !roomData.lightOn)}
                      >
                        {roomData.lightOn
                          ? <TbLamp
                            className={"icons"}
                            fill={"gold"}
                          />
                          : <TbLampOff
                            className={"icons"}
                          />}

                      </span>
                    </div>
                  )}
                    {"waterOn" in roomData && (
                      <div className="room-prop">
                        <span className={"room-prop-icons water"}
                          onClick={() => handleChange("waterOn", !roomData.waterOn)}
                        >
                          {roomData.waterOn ?
                            <RiWaterFlashFill
                              className={"icons"}
                              fill={"#89cff0"}
                            /> :
                            <RiWaterFlashLine
                              className={"icons"}
                            />}
                        </span>
                      </div>
                    )}
                    <button onClick={() => setSeeProperties(false)}><FaArrowLeft className={"detail-icon"}/></button>
                </div>
            )}
        </div>
    );
}