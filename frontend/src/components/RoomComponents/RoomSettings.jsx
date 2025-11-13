import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

export default function RoomSettings(){
  return(
    <div className={"room-number-settings"}>
      <CiCircleMinus className={"room-controller"}/>
      <CiCirclePlus className={"room-controller"} />
    </div>
  )
}