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
      ><div className="hedear-container">
        <div className="header" style={{ borderRadius: '10px 10px 0 0', width: '22vw', marginTop: '10px', height: '6vh', display: 'flex', justifyContent: 'space-between' }}>
  <div className="circle" style={{ background: colorset[props.cat], flex: '0 0 auto' }} />
  <p className="status-name" style={{ flex: '0 1 auto' }}>{props.cat}</p>
  <div className="sum-massion" style={{ marginLeft: 'auto', marginRight:'3%', textAlign:'center' }}>{sum}</div>
</div></div>

      </div>
      <div className="mission-cont">
      {data.map((prop) => (
        <div key={prop.id} className={`massion ${prop.name + prop.id}`}>
          <MassionCard obj={prop} names={props.names} missionId={prop.id} funcChange={props.funcChange} DueDate={props.dueDate}/>
        </div>
        
      ))}
      </div>
    </Paper>
  );
}
