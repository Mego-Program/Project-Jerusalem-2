import React, { useState, useEffect } from 'react';
import './showData.css'
import axios from 'axios';
import Inp from './input';
import Show from './massions-component/showMassion'
import { Login } from '@mui/icons-material';


// -----------------bug: when new itm show it doens get id from mongo deb until the reload the page---------
let serverBaseUrl
if (process.env.NODE_ENV === 'development') {
  // אם הקוד רץ בסביבת פיתוח, השתמש בשרת הלוקאלי
  serverBaseUrl = 'http://localhost:3000/';
} else {
  // אחרת, השתמש בשרת הרשמי
  serverBaseUrl = 'https://project-jerusalem-2-server.vercel.app/';
}
let obFilter = {'category':'', 'milestone':'','issue_type':'','assignee':''}

export default function DivFilters(props){
  

const names = props.names

const [DataFiltered,setDataFiltered]=useState([...props.projectData])
const Options = {
  'category':[...(new Set(props.projectData.map((item)=>item.category)))],
  'assignee':[...(new Set(props.projectData.map((item)=>item.assignee)))],
  'milestone':[...(new Set (props.projectData.map((item)=>item.milestone)))],
  'issue_type':[...(new Set(props.projectData.map((item)=>item.issue_type)))],
}
// handle every project change
useEffect(() => {
  setDataFiltered(props.projectData);
  resetFilters()
} ,[props.projectData]);

// reset the filter every project change
const [dummyState, setDummyState] = useState(false);
function resetFilters() {
  obFilter = { 'category': '', 'milestone': '', 'issue_type': '', 'assignee': '' };
  setDummyState((prev) => !prev);
}

function handleObFilter(input,type){
    // change every filter value to the input
    obFilter[type]=input
    filterInput(obFilter)
    // filterInput(obFilter1)
    
}

// function to update missions
async function updatefields(id, field, update) {
  const url = `${serverBaseUrl}projects/post/${props.collection}/${field}`;

  try {
    const response = await axios.post(url, { id, update })
    // Check if the condition is met

  } catch (error) {
    console.log('Error while updating:', error);

    // Handle errors or stop retrying after a certain number of attempts
  }
}


async function deleteFunc(id){
  try{
const respone = await axios.post(`${serverBaseUrl}projects/delete/${props.collection}`,{id})
  }catch(error){console.log('error while delete mission:',error);}
  const newdata = DataFiltered.filter((itemInData) => {return itemInData._id!==id})
setDataFiltered((prev)=>prev=newdata);

}


function changeAssignee(name,id1,close){
  updatefields(id1,'assignee',name)
// function to update the assignee
  const newdata = DataFiltered.map((itemInData) => {
    if (itemInData._id === id1) {
      itemInData.assignee = name;
    }
    return itemInData; 
  });
  setDataFiltered(newdata);
  // close
}

function filterInput(filt) {
  // filter the data with all the filters type at once
  setDataFiltered(
      DataFiltered.filter((itm) => 
          (filt['category'] ? itm['category'].includes(filt['category']) : true) &&
          (filt['milestone'] ? itm['milestone'].includes(filt['milestone']) : true) &&
          (filt['issue_type'] ? itm['issue_type'].includes(filt['issue_type']) : true) &&
          (filt['assignee'] ? itm['assignee'].includes(filt['assignee']) : true)
      )
  );
}

function filterStatus(data, DivStatus) {
    return data.filter((itm) => itm.status === DivStatus);
  }
//   function to update the status object that been draging
  function updateDND(id1, stat) {
    updatefields(id1,'status',stat)
    const newdata = DataFiltered.map((itemInData) => {
      if (itemInData._id === id1) {
        itemInData.status = stat;
      }
      return itemInData; 
    });
    setDataFiltered(newdata)
  //  console.log(DataFiltered);
    filterInput(obFilter)

  }

  function dueDate(date,id1){
    updatefields(id1,'deadline',date)
const newdata = DataFiltered.map((itemInData) => {
      if (itemInData._id === id1) {
        itemInData.deadline = date;
      }
      return itemInData; 
    });
    setDataFiltered(newdata);
  }
async function addTask(data){
  try{
  const response = await axios.post(`${serverBaseUrl}projects/addMission/${props.collection}`,data)

}catch(error){console.log('error while add new task:',error);}
// reload the data to get the new itm with it id 
async function fetchData(){
  try {
    const response = await axios.get(`${serverBaseUrl}projects/${props.collection}`);
    setDataFiltered(response.data)
  } catch (error) {
    console.error('Error fetching project data:', error);
  }}
  fetchData()
  }


return (
    <div>
    {/* Filters section */}
    {/* <Grid item xs={12} > */}
    <div className='filters'>
        <Inp key={`1-${dummyState}`} func={handleObFilter} func1={filterInput} type={'category'} filters={obFilter} lstOptions={Options.category} name={'Category'} />
        <Inp key={`2-${dummyState}`} func={handleObFilter} func1={filterInput} type={'milestone'} filters={obFilter} lstOptions={Options.milestone} name={'Milestone'} />
        <Inp key={`3-${dummyState}`} func={handleObFilter} func1={filterInput} type={'issue_type'} filters={obFilter} lstOptions={Options.issue_type} name={'Issue Type'} />
        <Inp key={`4-${dummyState}`} func={handleObFilter} func1={filterInput} type={'assignee'} filters={obFilter} lstOptions={Options.assignee} name={'Assignee'} />
      </div>
    {/* </Grid> */}
{/* <Grid/> */}

    <div className='div-massions status-columns'>
        <Show  func={updateDND} datafiltered={filterStatus(DataFiltered, 'Not Started')} cat={'Not Started'} names={names} funcChange={changeAssignee} dueDate={dueDate} addTask ={addTask} deleteFunc={deleteFunc}/>
        <Show  func={updateDND}datafiltered={filterStatus(DataFiltered, 'In Progress')} cat={'In Progress'}   names={names} funcChange={changeAssignee} dueDate={dueDate} addTask ={addTask} deleteFunc={deleteFunc}/>
        <Show func={updateDND} datafiltered={filterStatus(DataFiltered, 'Completed')} cat={'Completed'}  names={names} funcChange={changeAssignee} dueDate={dueDate} addTask ={addTask} deleteFunc={deleteFunc}/>
        <Show func={updateDND} datafiltered={filterStatus(DataFiltered, 'Close')} cat={'Close'}  names={names} funcChange={changeAssignee} dueDate={dueDate} addTask ={addTask} deleteFunc={deleteFunc}/>
      </div>
 
</div>
  );
}