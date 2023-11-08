import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { useDrag } from "react-dnd";
import { colors } from "@mui/material";
import AssigneeSelector from "../change assigne/ChangeAsignee";

export default function MassionCard(props) {
  const [{ isDraging }, drag] = useDrag(() => ({
    type: "MASSION",
    item: { massion: props.obj.status, id: props.obj.id },
    collect: (monitor) => ({
      isDraging: !!monitor.isDragging(),
    }),
  }));



  return (
    <div className="mission-card" ref={drag} >
      <div className="left-content">
        <AssigneeSelector names={props.names} missionId={props.missionId}  funcChange={props.funcChange}/>
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
