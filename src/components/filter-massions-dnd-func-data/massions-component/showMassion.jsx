import MassionCard from "./Massion-card";
import { useDrop } from "react-dnd";
import "./showMassion.css";
import { Paper } from "@mui/material";
import AddTaskButton from "../AddTaskButton";


export default function Show(props) {
  
  {
    console.log("Props in Show", props);
    // rest of your code
  }
  const data = props.datafiltered;
  
  
  const handleNewTask = (data) => {
    data.status=props.cat 
    data.assignee=''
      props.addTask(data)
  };

  const [{ isOver }, drop] = useDrop({
    accept: "MASSION",
    drop: (item) => {
      console.log("Dropped item:", item);
      console.log("New status:", props.cat);
      props.updateTaskFunc(item.id,'status', props.cat);
    },collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      
    }),
  });

  
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
        width: "100%",
      }}
    >
      <div
        style={{ width:'100%', position: "sticky", top: "0", zIndex: 1, right: 0, left: 0 ,background:'#121231'}}>
      <div className="hedear-container">
        <div className="header">
  <div className="circle" style={{ background: colorset[props.cat], flex: '0 0 auto' }} />
  <p className="status-name" style={{ flex: '0 1 auto' }}>{props.cat}</p>
  <div className="sum-massion" style={{ marginLeft: 'auto', marginRight:'3%', textAlign:'center' }}>{sum}</div>
</div></div>
<div className="add_task">
  <AddTaskButton func = {handleNewTask} />
</div>

      </div>
      <div className="mission-cont" style={{width:'100%'}}>
                {props.datafiltered.map((prop) => (
                    <div key={prop._id} className={`massion ${prop.name + prop._id}`} style={{padding:'8px'}} >
                        <MassionCard 
                            obj={prop} 
                            names={props.names} 
                            missionId={prop._id} 
                            funcChange={props.funcChange} 
                            DueDate={props.dueDate} 
                            deleteFunc={props.deleteFunc}
                            updateTaskFunc={props.updateTaskFunc} 
                            showEndDate={props.showEndDate}
                        />
                    </div>
                ))}
            </div>
        </Paper>
    );
}