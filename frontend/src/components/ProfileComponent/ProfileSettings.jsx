import { getUserList } from "../../utils/userInfo.jsx";
import Input from "../Input.jsx";
// todo use cookie for the validation
export default function ProfileSettings(){
  const userInfo = getUserList();
  function handleChange(e){
    e.preventDefault();
  }
  return(
    <div className={"profile-settings form-wrapper"}>
      <h2>Settings</h2>
      <form action="">
        <Input
          type={"text"}
          placeholder={userInfo.fullName}
          value={userInfo.fullName}
          name={"fullName"}
          onChange={handleChange}
        />
        <Input
          type={"date"}
          placeholder={userInfo.date}
          value={userInfo.date}
          name={"date"}
          onChange={handleChange}
        />
        <Input
          type={"email"}
          placeholder={userInfo.email}
          value={userInfo.email}
          name={"email"}
          onChange={handleChange}
        />
        <Input
          type={"password"}
          placeholder={userInfo.password}
          value={userInfo.password}
          name={"password"}
          onChange={handleChange}
          autoComplete={"new-password"}
        />
        <Input
          type={"city"}
          placeholder={userInfo.city}
          value={userInfo.city}
          name={"city"}
          onChange={handleChange}
        />
        <button type={"submit"} className={"form-submit-button"}>Update</button>
      </form>
      
    </div>
  )
}