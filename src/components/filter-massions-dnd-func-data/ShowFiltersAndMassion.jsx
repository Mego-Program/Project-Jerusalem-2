import React, { useState, useEffect } from 'react';
import './showFiltersAndMission.css'
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




async function updatefieldsE(id, field, update) {
  const url = `${serverBaseUrl}missions/${props.collection}/${field}`;

  try {
    const response = await axios.put(url, { id, update })
   if (response.status!==200){console.log('server error to updae try again'); return;}
   const newdata = DataFiltered.map((itemInData) => {
    if (itemInData._id === id) {
      itemInData[field] = update;
    }
    return itemInData; 
  });
  setDataFiltered(newdata);
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



function filterStatus(data, DivStatus) {
    return data.filter((itm) => itm.status === DivStatus);
  }


 
async function addTask(data){
  try{
  const response = await axios.post(`${serverBaseUrl}missions/${props.collection}`,data)
  if (response.data==='create project first') {
    alert(response.data)
  }
}catch(error){console.log('error while add new task:',error);}
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

    <div className='filters'>
      <div className='filter-item'>
        <Inp key={`1-${dummyState}`} func={handleObFilter} func1={filterInput} type={'category'} filters={obFilter} lstOptions={Options.category} name={'Category'} /></div>
        <div className='filter-item'><Inp key={`2-${dummyState}`} func={handleObFilter} func1={filterInput} type={'milestone'} filters={obFilter} lstOptions={Options.milestone} name={'Milestone'} /></div>
        <div className='filter-item'> <Inp key={`3-${dummyState}`} func={handleObFilter} func1={filterInput} type={'issue_type'} filters={obFilter} lstOptions={Options.issue_type} name={'Issue Type'} /></div>
        <div className='filter-item'> <Inp key={`4-${dummyState}`} func={handleObFilter} func1={filterInput} type={'assignee'} filters={obFilter} lstOptions={names.map((name)=>name.name)} name={'Assignee'} /></div>
      </div>

    <div className='div-massions status-columns'>
        <Show   datafiltered={filterStatus(DataFiltered, 'Not Started')} cat={'Not Started'} names={names} addTask ={addTask} deleteFunc={deleteFunc} updateTaskFunc={updatefieldsE}/>
        <Show  datafiltered={filterStatus(DataFiltered, 'In Progress')} cat={'In Progress'}   names={names} addTask ={addTask} deleteFunc={deleteFunc} updateTaskFunc={updatefieldsE}/>
        <Show  datafiltered={filterStatus(DataFiltered, 'Completed')} cat={'Completed'}  names={names} addTask ={addTask} deleteFunc={deleteFunc} updateTaskFunc={updatefieldsE}/>
        <Show  datafiltered={filterStatus(DataFiltered, 'Close')} cat={'Close'}  names={names} addTask ={addTask} deleteFunc={deleteFunc} updateTaskFunc={updatefieldsE}/>
      </div>
 
</div>
  );
}
