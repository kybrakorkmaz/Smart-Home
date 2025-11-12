import React from "react";
import HomeSettingsInput from "./HomeSettingsInput.jsx";
import { SETTINGS_CONFIG } from "../../utils/settingsConfig.jsx";

export default function HomeSettings({ type, settings, onClick }){
  const config = SETTINGS_CONFIG[type]; // get properties
  return(
    <section className={"settings"}>
      {config.map(({key, label, iconOn, iconOff}) => (
        <HomeSettingsInput
          key={key}
          name={key}
          value={settings[key]}
          onClick={onClick}
          iconOn={iconOn}
          iconOff={iconOff}
          label={label}
        />
      ))}
    </section>
  )
}