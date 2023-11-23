import React, { useState, useEffect } from 'react';
import './showData.css'
import axios from 'axios';
import Inp from './input';
import Show from './massions-component/showMassion'


let serverBaseUrl
if (process.env.NODE_ENV === 'development') {
  serverBaseUrl = 'http://localhost:3000/';
} else {

  serverBaseUrl = 'https://project-jerusalem-2-server.vercel.app/';
}
let obFilter = {'category':'', 'milestone':'','issue_type':'','assignee':''}

export default function DivFilters(props){
  
const [DataFiltered,setDataFiltered]=useState([...props.projectData])
const [names,setNames] = useState([])
const [dummyState, setDummyState] = useState(false);
const Options = {
  'category':[...(new Set(props.projectData.map((item)=>item.category)))],
  'milestone':[...(new Set (props.projectData.map((item)=>item.milestone)))],
  'issue_type':[...(new Set(props.projectData.map((item)=>item.issue_type)))],
}
useEffect(() => {
    setDataFiltered(props.projectData);
    getNames();
    resetFilters();
    if (names.length === 0) {
      getNames();
    }
}, [props.projectData]);


async function getNames() {
  try {
    const response = await axios.get(`${serverBaseUrl}projects/names/${props.collection}`);
    setNames(response.data);
    
  } catch (err) {
    console.log('error try to get names:', { err });
  }
}




function resetFilters() {
  obFilter = { 'category': '', 'milestone': '', 'issue_type': '', 'assignee': '' };
  
  setDummyState((prev) => !prev);
}

function handleObFilter(input,type){
  obFilter[type]=input
  const saveFilter = obFilter
  if(input===''){
setDataFiltered(fetchData())
obFilter = saveFilter
filterInput(obFilter)
  }
  else{
    obFilter[type]=input
    filterInput(obFilter)}
}

function filterInput(filt) {
  setDataFiltered(
      DataFiltered.filter((itm) => 
          (filt['category'] ? itm['category'].includes(filt['category']) : true) &&
          (filt['milestone'] ? itm['milestone'].includes(filt['milestone']) : true) &&
          (filt['issue_type'] ? itm['issue_type'].includes(filt['issue_type']) : true) &&
          (filt['assignee'] ? itm['assignee']['name'].includes(filt['assignee']) : true)
      )
  );
}


async function updatefields(id, field, update) {
  const url = `${serverBaseUrl}missions/${props.collection}/${field}`;

  try {
    const response = await axios.put(url, { id, update })
   if (response.status!==200){console.log('server error to updae try again');}

  } catch (error) {
    console.log('Error while updating:', error);

  }
}


async function deleteFunc(id){
  try{
const respone = await axios.delete(`${serverBaseUrl}missions/${props.collection}`,{id})
  }catch(error){console.log('error while delete mission:',error);}
  const newdata = DataFiltered.filter((itemInData) => {return itemInData._id!==id})
setDataFiltered((prev)=>prev=newdata);

}


function changeAssignee(name,id1){
  updatefields(id1,'assignee',name)
  const newdata = DataFiltered.map((itemInData) => {
    if (itemInData._id === id1) {
      itemInData.assignee = name;
    }
    return itemInData; 
  });
  setDataFiltered(newdata);

}


function filterStatus(data, DivStatus) {
    return data.filter((itm) => itm.status === DivStatus);
  }

  function updateDND(id1, stat) {
    updatefields(id1,'status',stat)
    const newdata = DataFiltered.map((itemInData) => {
      if (itemInData._id === id1) {
        itemInData.status = stat;
      }
      return itemInData; 
    });
    setDataFiltered(newdata)
 
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
  const response = await axios.post(`${serverBaseUrl}missions/${props.collection}`,data)
}catch(error){console.log('error while add new task:',error);}
// setRerender(data)
fetchData()
  }
  async function fetchData(){
  try {
    const response = await axios.get(`${serverBaseUrl}missions/${props.collection}`);
    setDataFiltered(response.data)
  } catch (error) {
    console.error('Error fetching project data:', error);
  }}


return (
    <div>
    {/* Filters section */}
    {/* <Grid item xs={12} > */}
    <div className='filters'>
        <Inp key={`1-${dummyState}`} func={handleObFilter} func1={filterInput} type={'category'} filters={obFilter} lstOptions={Options.category} name={'Category'} />
        <Inp key={`2-${dummyState}`} func={handleObFilter} func1={filterInput} type={'milestone'} filters={obFilter} lstOptions={Options.milestone} name={'Milestone'} />
        <Inp key={`3-${dummyState}`} func={handleObFilter} func1={filterInput} type={'issue_type'} filters={obFilter} lstOptions={Options.issue_type} name={'Issue Type'} />
        <Inp key={`4-${dummyState}`} func={handleObFilter} func1={filterInput} type={'assignee'} filters={obFilter} lstOptions={names.map((name)=>name.name)} name={'Assignee'} />
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