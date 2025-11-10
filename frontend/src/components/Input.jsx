import React from "react";

export default function Input(props) {
    return (
        <div className={"input-box"}>
            <input
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                autoComplete={props.autoComplete}
            />
            {props.icon && <props.icon className="icon" />}
        </div>
    )
}