import { MdManageAccounts } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Profile(){
  const navigate = useNavigate();
  function handleClick() {
    navigate("/profile");
  }
  return(
    <div className={"profile"}>
      <MdManageAccounts
        className={"profile-icon"}
        onClick={handleClick}
      />
    </div>
  )
}