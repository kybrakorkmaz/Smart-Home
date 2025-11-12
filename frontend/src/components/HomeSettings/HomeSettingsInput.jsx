import React from "react";

export default function HomeSettingsInput({ name, value, onClick, iconOn, iconOff }){
  return(
    <div
      className={"setting"}
      onClick={() => onClick(name)}
      title={name.charAt(0).toUpperCase() + name.slice(1)}
    >
      {value ? iconOn : iconOff}
    </div>
  );
}