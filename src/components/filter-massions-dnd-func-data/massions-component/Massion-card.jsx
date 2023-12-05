import React from "react";
import { Box } from '@mui/material';
import { useDrag } from "react-dnd"; // Import useDrag here
import AssigneeSelector from "../change assigne/ChangeAsignee";
import DateSelector from "../due-date/DatePicker";
import './massion-card.css';
import EditTask from "../editTaskButton";
import DeleteMission from "./deleteMission";

export default function MassionCard(props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "MASSION",
    item: { massion: props.obj.status, id: props.missionId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    // choose color for the spec missions
<Box sx={props.isSpec?{borderRight:'solid 10px #36B176',borderLeft:'solid 10px #36B176',borderRadius:'5px'}:{
  borderRight:'solid 10px #21213E',borderLeft:'solid 10px #21213E',borderRadius:'5px'
}}>
    <div className="mission-card" ref={drag}>
  <div className="left-content">
    <AssigneeSelector name = {props.obj.assignee} names={props.names} missionId={props.missionId} updateTaskFunc={props.updateTaskFunc} />
  </div>
  <div className="text">
    <div className="header">
      <p >{props.obj.header}</p>
    </div>
    <div className="content" >
      <p>{props.obj.content}</p>
    </div>
  <div className="date">
    <DateSelector date={props.obj.deadline} updateTaskFunc={props.updateTaskFunc} id={props.missionId}/>
  </div>
  </div>
  <div className="delete" >
    <EditTask updateTaskFunc={props.updateTaskFunc} id={props.missionId} TaskDetails={props.obj}/>
    <DeleteMission deleteFunc={props.deleteFunc} id={props.missionId}/>
  </div>
</div>
</Box>

  );
}
