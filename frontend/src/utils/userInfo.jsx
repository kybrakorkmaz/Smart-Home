export const saveUser = (info)=>{
  localStorage.setItem("user", JSON.stringify(info));
}

export const getUserList = ()=>{
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : [];
}

export const setCurrentUser = (user)=>{
  localStorage.setItem("currentUser", JSON.stringify(user));
}
export const getCurrentUser = () =>{
  const currentUser = localStorage.getItem("currentUser");
  return currentUser ? JSON.parse(currentUser) : null;
}