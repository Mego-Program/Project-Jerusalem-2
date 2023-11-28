import React, { useEffect ,useState} from "react";
import Avatar from "@mui/material/Avatar";
import { DndProvider, useDrag } from "react-dnd";
import { colors } from "@mui/material";
import AssigneeSelector from "../change assigne/ChangeAsignee";
import DateSelector from "../due-date/DatePicker";
import './massion-card.css'
import axios from "axios";
import {Box} from '@mui/material'
import DeleteMission from "./deleteMission";
import EditTask from "../editTaskButton";



export default function MassionCard(props) {
  

  const [{ isDraging }, drag] = useDrag(() => ({
    type: "MASSION",
    item: { massion: props.obj.status, id: props.missionId},
    collect: (monitor) => ({
      isDraging: !!monitor.isDragging(),
    }),
  }));


  return (
<Box sx={{borderRight:'solid 10px #21213E',borderLeft:'solid 10px #21213E',borderRadius:'5px'}}>
    <div className="mission-card" ref={drag}>
  <div className="left-content">
    <AssigneeSelector names={props.names} missionId={props.missionId} updateTaskFunc={props.updateTaskFunc} />
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