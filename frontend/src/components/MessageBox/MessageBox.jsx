import React, {useState} from "react";
import "./MessageBox.css"
const CloseIcon = () => (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17.25 6.75L6.75 17.25"
        />
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M6.75 6.75L17.25 17.25"
        />
    </svg>
);
function MessageBox({onClose, message}){
    return(
        <>
            <div className={"message-box"}>
                <div className={"backdrop"} onClick={onClose}></div>
                <div className={"dialog"}>
                    <button className={"close"} onClick={onClose}>
                        <CloseIcon/>
                    </button>
                    <p>{message}</p>
                </div>
            </div>
        </>

    );
}
export default MessageBox;