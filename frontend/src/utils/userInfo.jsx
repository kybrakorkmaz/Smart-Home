export const saveUser = (info)=>{
  localStorage.setItem("user", JSON.stringify(info));
}

export const getUser = ()=>{
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : [];
}
