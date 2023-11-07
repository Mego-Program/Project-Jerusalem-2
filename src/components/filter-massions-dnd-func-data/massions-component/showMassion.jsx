import MassionCard from "./Massion-card";
import { useDrop } from "react-dnd";
import "./showMassion.css";
import { Paper } from "@mui/material";


export default function Show(props) {
  const data = props.datafiltered
  // make the drop erea 
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "MASSION",
    drop: (item) => {  
      // using the prop function that updating the status according the drop erea status 
        props.func(item.id, props.cat)
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  
  // sum missions to display and set of colors  
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
      {data.map((prop) => (
        <div key={prop.id} className={`massion ${prop.name + prop.id}`}>
          <MassionCard obj={prop} />
        </div>
      ))}
    </Paper>
  );
}
