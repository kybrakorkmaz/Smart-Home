import {
  FaDoorClosed,
  FaDoorOpen,
  FaLightbulb,
  FaRegLightbulb,
  FaRegWindowClose,
  FaRegWindowMaximize,
} from "react-icons/fa";
import { TbTemperature, TbTemperatureOff } from "react-icons/tb";
import { RiWaterFlashFill, RiWaterFlashLine } from "react-icons/ri";
import { FcElectricity } from "react-icons/fc";

export const SETTINGS_CONFIG = {
  general: [
    {
      key: "light",
      label: "Light",
      iconOn: <FaLightbulb className={"settings-icon"}/>,
      iconOff: <FaRegLightbulb className={"settings-icon"}/>,
    },
    {
      key:"heat",
      label:"Heat",
      iconOn: <TbTemperature className={"settings-icon"}/>,
      iconOff: <TbTemperatureOff className={"settings-icon"}/>,
    },
    {
      key: "water",
      label: "Water",
      iconOn: <RiWaterFlashFill className={"settings-icon"}/>,
      iconOff: <RiWaterFlashLine className={"settings-icon"}/>,
    },
  ],
  special: [
    {
      key: "electricity",
      label: "Electricity",
      iconOn: <FcElectricity className={"settings-icon"}/>,
      iconOff: <FcElectricity className={"settings-icon"} />,
    },
    {
      key: "windows",
      label: "Windows",
      iconOn: <FaRegWindowMaximize className={"settings-icon"}/>,
      iconOff: <FaRegWindowClose className={"settings-icon"}/>,
    },
    {
      key: "doors",
      label: "Doors",
      iconOn: <FaDoorOpen className={"settings-icon"}/>,
      iconOff: <FaDoorClosed className={"settings-icon"}/>,
    },
  ],
};
