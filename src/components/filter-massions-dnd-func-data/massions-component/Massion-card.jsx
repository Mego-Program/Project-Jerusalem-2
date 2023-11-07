import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { useDrag } from "react-dnd";
import { colors } from "@mui/material";

export default function MassionCard(props) {
  const [{ isDraging }, drag] = useDrag(() => ({
    type: "MASSION",
    item: { massion: props.obj.status, id: props.obj.id },
    collect: (monitor) => ({
      isDraging: !!monitor.isDragging(),
    }),
  }));
let s = (event)=>{
  console.log(props.obj.id);
}
  return (
    <div className="mission-card" ref={drag} onClick={s}>
      <div className="left-content">
        <Avatar
          alt={props.obj.man_in_charge}
          src=""
          sx={{ width: 40, height: 40 }}
        />
      </div>
      <div className="text">
        <div className="middle-content">
          <div className="header">
            <p>{props.obj.header}</p>
          </div>
          <div className="content">
            <p>{props.obj.content}</p>
          </div>
        </div>
        <div className="date">
          <p>{props.obj.deadline}</p>
        </div>
      </div>
    </div>
  );
}
