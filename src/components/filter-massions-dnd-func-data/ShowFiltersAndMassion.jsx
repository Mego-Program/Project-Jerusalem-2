import React, { useState, useEffect } from 'react';
import './showFiltersAndMission.css'
import axios from 'axios';
import Inp from './input';
import Show from './massions-component/showMassion'
import {useAtom} from 'jotai'
import { atomUrl } from '../../Atoms';
import SelectSprint from './showSprint';
import {Box,Typography} from '@mui/material'
import SprintComponent from './sprintComp';




let obFilter = {'category':'', 'milestone':'','issue_type':'','assignee':''}

export default function DivFilters(props){
 const [url,setUrl] = useAtom(atomUrl)
  const [isSprint,setIsSprint] = useState('')
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
    setIsSprint('')
    if (names.length === 0) {
      getNames();
    }
}, [props.projectData]);


async function getNames() {
  try {
    const response = await axios.get(`${url}projects/names/${props.collection}`);
    setNames(response.data);
    
  } catch (err) {
    console.log('error try to get names:', { err });
  }
}




function resetFilters() {
  obFilter = {'sprints':'', 'category': '', 'milestone': '', 'issue_type': '', 'assignee': '' };
  
  setDummyState((prev) => !prev);
}

function handleObFilter(input,type){
  obFilter[type]=input

  if(input===''){

filterInput(obFilter)
  }
  else{
    obFilter[type]=input
    filterInput(obFilter)}
}

function filterInput(filt) {
  setDataFiltered(
      props.projectData.filter((itm) => 
        (filt['sprints'] ? itm['isSprint']?itm['isSprint'].includes(filt['sprints']) : false:true) &&
          (filt['category'] ? itm['category'].includes(filt['category']) : true) &&
          (filt['milestone'] ? itm['milestone'].includes(filt['milestone']) : true) &&
          (filt['issue_type'] ? itm['issue_type'].includes(filt['issue_type']) : true) &&
          (filt['assignee'] ? `${itm['assignee']['firstName']} ${itm['assignee']['lastName']}`.includes(filt['assignee']) : true)
      )
  );
}

function showSprints(sprintName){
  setIsSprint(sprintName)
  console.log(isSprint);
  handleObFilter(sprintName,'sprints')
}
function showBoard(){
  setIsSprint('')
  handleObFilter('','sprints')
  setDummyState((prev) => !prev);
}



async function updatefields(id, field, update) {
  const url1 = `${url}missions/${props.collection}/${field}`;

  try {
    const response = await axios.put(url1, { id, update })
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
const respone = await axios.delete(`${url}missions/${props.collection}`,{data:{id}})
  }catch(error){console.log('error while delete mission:',error);}
  const newdata = DataFiltered.filter((itemInData) => {return itemInData._id!==id})
setDataFiltered((prev)=>prev=newdata);

}



function filterStatus(data, DivStatus) {
    return data.filter((itm) => itm.status === DivStatus);
  }


 
async function addTask(data){
  try{
  const response = await axios.post(`${url}missions/${props.collection}`,data)
  if (response.data==='create project first') {
    alert(response.data)
  }
}catch(error){console.log('error while add new task:',error);}
fetchData()
resetFilters()
  }
  async function fetchData(){
  try {
    const response = await axios.get(`${url}missions/${props.collection}`);
    setDataFiltered(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching project data:', error);
  }}


return (
    <div>
<SelectSprint key={`6-${dummyState}`}  showSprint={showSprints} currentProject={props.collection} regularBoard={showBoard}/>
    <div className='filters'>
      <div className='filter-item'>
        <Inp key={`1-${dummyState}`} func={handleObFilter} func1={filterInput} type={'category'} filters={obFilter} lstOptions={Options.category} name={'Category'} /></div>
        <div className='filter-item'><Inp key={`2-${dummyState}`} func={handleObFilter} func1={filterInput} type={'milestone'} filters={obFilter} lstOptions={Options.milestone} name={'Milestone'} /></div>
        <div className='filter-item'> <Inp key={`3-${dummyState}`} func={handleObFilter} func1={filterInput} type={'issue_type'} filters={obFilter} lstOptions={Options.issue_type} name={'Issue Type'} /></div>
        <div className='filter-item'> <Inp key={`4-${dummyState}`} func={handleObFilter} func1={filterInput} type={'assignee'} filters={obFilter} lstOptions={names.map((name)=>`${name.firstName} ${name.lastName}`)} name={'Assignee'} /></div>
      </div>
      {!(isSprint==='') && 
      <Box display={'flex'} justifyContent={'center'}>
      <SprintComponent sprintName={isSprint} projectName={props.collection} />
      </Box>
      }

    <div className='div-massions status-columns'>
        <Show   datafiltered={filterStatus(DataFiltered, 'Not Started')} cat={'Not Started'} names={names} addTask ={addTask} deleteFunc={deleteFunc} updateTaskFunc={updatefields}/>
        <Show  datafiltered={filterStatus(DataFiltered, 'In Progress')} cat={'In Progress'}   names={names} addTask ={addTask} deleteFunc={deleteFunc} updateTaskFunc={updatefields}/>
        <Show  datafiltered={filterStatus(DataFiltered, 'Completed')} cat={'Completed'}  names={names} addTask ={addTask} deleteFunc={deleteFunc} updateTaskFunc={updatefields}/>
        <Show  datafiltered={filterStatus(DataFiltered, 'Close')} cat={'Close'}  names={names} addTask ={addTask} deleteFunc={deleteFunc} updateTaskFunc={updatefields}/>
      </div>
 
</div>
  );
}
