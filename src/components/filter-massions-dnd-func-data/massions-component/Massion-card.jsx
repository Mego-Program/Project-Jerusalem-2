import React, { useEffect ,useState} from "react";
import Avatar from "@mui/material/Avatar";
import { DndProvider, useDrag } from "react-dnd";
import { colors } from "@mui/material";
import AssigneeSelector from "../change assigne/ChangeAsignee";
import DateSelector from "../due-date/DatePicker";
import './massion-card.css'


export default function MassionCard(props) {

  const [{ isDraging }, drag] = useDrag(() => ({
    type: "MASSION",
    item: { massion: props.obj.status, id: props.obj.id },
    collect: (monitor) => ({
      isDraging: !!monitor.isDragging(),
    }),
  }));



  return (
    <div className="mission-card" ref={drag}>
  <div className="left-content">
    <AssigneeSelector names={props.names} missionId={props.missionId} funcChange={props.funcChange} />
  </div>
  <div className="text">
    <div className="header">
      <p >{props.obj.header}</p>
    </div>
    <div className="content" >
      <p>{props.obj.content}</p>
    </div>
  <div className="date">
    <DateSelector date={props.obj.deadline} DueDate={props.DueDate} id={props.obj.id}/>
  </div>
  </div>
</div>

  );
}
