export const saveRooms = (rooms)=>{
    localStorage.setItem("rooms", JSON.stringify(rooms));
};

export const getRooms = ()=>{
    const rooms = localStorage.getItem("rooms");
    return rooms ? JSON.parse(rooms) :
        {
            bedroom: [],
            livingRoom:[],
            kitchen:[],
            bathroom:[],
            toilet:[],
        };
};