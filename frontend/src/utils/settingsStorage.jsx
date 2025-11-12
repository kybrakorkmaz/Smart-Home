import { getRooms, saveRooms } from "./saveRooms.jsx";

const DEFAULT_SETTINGS = {
  general: {
    heat: false,
    light: false,
    water: false,
  },
  special: {
    electricity: true,
    windows: true,
    doors: true,
  },
};


export const getSettings = () => {
  const stored = localStorage.getItem("settings");
  return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
};

export const saveSettings = (settings)=>{
  localStorage.setItem("settings", JSON.stringify(settings));
};

export const updateRoomsBasedOnSettings = (settings) => {
  const rooms = getRooms();
  const updatedRooms = {};
  // electricity is shut down close all relevant things (heat, light, door, window)
  if (!settings.special.electricity) {
    for (const [type, roomList] of Object.entries(rooms)) {
      updatedRooms[type] = roomList.map((room) => ({
        ...room,
        light: false,
        heat: false,
        water: false,
        windows: false,
        doors: false,
      }));
    }
  }else{
    // do not change the properties if it is open
    Object.assign(updatedRooms, rooms);
  }
  saveRooms(updatedRooms);
  return updatedRooms;
}