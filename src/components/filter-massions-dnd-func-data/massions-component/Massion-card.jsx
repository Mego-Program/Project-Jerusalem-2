import React, { useEffect ,useState} from "react";
import {Avatar,Typography} from "@mui/material";
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
    // choose color for the spec missions
<Box sx={props.obj.isSpec?{borderRight:'solid 10px #36B176',borderLeft:'solid 10px #36B176',borderRadius:'5px'}:{
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
    {!props.obj.isSprint||props.obj.isSprint==='false'?
  <div className="date">
    <DateSelector date={props.obj.deadline} Func={props.updateTaskFunc} id={props.missionId}/>
  </div>:<Typography color={'white'}>{props.obj.isSprint}</Typography>}
  </div>
  <div className="delete" >
    <EditTask updateTaskFunc={props.updateTaskFunc} id={props.missionId} TaskDetails={props.obj}/>
    <DeleteMission deleteFunc={props.deleteFunc} id={props.missionId}/>
  </div>
</div>
</Box>

  );
}