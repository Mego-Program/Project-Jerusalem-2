import MassionCard from "./Massion-card";
import { useDrop } from "react-dnd";
import "./showMassion.css";
import { Paper } from "@mui/material";
import { useRef, useState } from "react";

export default function Show(props) {
  
  
  const [dataDrop,setDataDrop] = useState(props.datafiltered)
  let data = props.datafiltered
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "MASSION",
    drop: (item) => {  

        props.func(item.id, props.cat)
        // console.log(dataDrop);
        
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  
// console.log(data);
  //
  const sum = data.length;
  const colorset = {
    "In Progress": "#3685B1",
    "Not Started": "#36B176",
    "Completed": "#EE786C",
    "Close": "#F6C927",
  };
  return (
    <Paper
      className="container status-column"
      ref={drop}
      style={{
        background: "#121230",
        overflow: "auto",
        maxHeight: "400px",
        width: "100%",
      }}
    >
      <div
        style={{ position: "sticky", top: "0", zIndex: 1, right: 0, left: 0 }}
      >
        <div className="header">
          <div className="circle" style={{ background: colorset[props.cat] }} />
          {props.cat}
          <div className="sum-massion">{sum}</div>
        </div>
      </div>
      {data.map((prop, index) => (
        <div key={index} className={`massion ${name + index}`}>
          <MassionCard obj={prop} />
        </div>
      ))}
    </Paper>
  );
}
