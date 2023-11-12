import React, { useState, useEffect } from 'react';
import './showData.css'
import Data from './data-massion/data';
import Inp from './input';
import Show from './massions-component/showMassion'
import { Grid } from '@mui/material';
import { DndProvider,useDrop } from 'react-dnd'



let obFilter = {'category':'', 'milestone':'','issue_type':'','assignee':''}


// let DataFiltered = Data
export default function DivFilters(props){
const names =[... new Set(props.projectData.map((obj) => ({ id: obj.id, name: obj.assignee })))]

const [DataFiltered,setDataFiltered]=useState(props.projectData)
const Options = {
  'category':[...(new Set(props.projectData.map((item)=>item.category)))],
  'assignee':[...(new Set(props.projectData.map((item)=>item.assignee)))],
  'milestone':[...(new Set (props.projectData.map((item)=>item.milestone)))],
  'issue_type':[...(new Set(props.projectData.map((item)=>item.issue_type)))],
}

useEffect(() => {
  setDataFiltered(props.projectData);
}, [props.projectData]);

function handleObFilter(obFilter,input,type){
    // change every filter value to the input
    obFilter[type]=input
    
    filterInput(obFilter)
    // filterInput(obFilter1)
    
}
function changeAssignee(name,id1,close){
  const newdata = DataFiltered.map((itemInData) => {
    if (itemInData.id === id1) {
      itemInData.assignee = name;
    }
    return itemInData; 
  });
  setDataFiltered(newdata);
  close
}


function filterInput(filt){
    // filter the data with all the filters type at once
    setDataFiltered(props.projectData.filter((itm) => 
    itm['category'].includes(filt['category'])
    && itm['milestone'].includes(filt['milestone'])
    && itm['issue_type'].includes(filt['issue_type'])
    && itm['assignee'].includes(filt['assignee'])
    ))
    
}
function filterStatus(data, DivStatus) {
    return data.filter((itm) => itm.status === DivStatus);
  }
//   function to update the status object that been draging
  function updateDND(id1, stat) {
    const newdata = DataFiltered.map((itemInData) => {
      if (itemInData.id === id1) {
        itemInData.status = stat;
      }
      return itemInData; 
    });
    setDataFiltered(newdata)
    console.log(obFilter)
    filterInput(obFilter)

  }
  

return (
    <div>
    {/* Filters section */}
    {/* <Grid item xs={12} > */}
    <div className='filters'>
        <Inp func={handleObFilter} func1={filterInput} type={'category'} filters={obFilter} lstOptions={Options.category} name={'Category'}/>
        <Inp func={handleObFilter} func1={filterInput} type={'milestone'} filters={obFilter} lstOptions={Options.milestone} name={'Milestone'}/>
        <Inp func={handleObFilter} func1={filterInput} type={'issue_type'} filters={obFilter} lstOptions={Options.issue_type} name={'Issue Type'}/>
        <Inp func={handleObFilter} func1={filterInput} type={'assignee'} filters={obFilter} lstOptions={Options.assignee} name={'Assignee'}/>
    </div>
    {/* </Grid> */}
{/* <Grid/> */}

    <div className='div-massions status-columns'>
        <Show func={updateDND} datafiltered={filterStatus(DataFiltered, 'Not Started')} cat={'Not Started'} names={names} funcChange={changeAssignee}/>
        <Show  func={updateDND}datafiltered={filterStatus(DataFiltered, 'In Progress')} cat={'In Progress'}   names={names} funcChange={changeAssignee}/>
        <Show func={updateDND} datafiltered={filterStatus(DataFiltered, 'Completed')} cat={'Completed'}  names={names} funcChange={changeAssignee} />
        <Show func={updateDND} datafiltered={filterStatus(DataFiltered, 'Close')} cat={'Close'}  names={names} funcChange={changeAssignee}/>
      </div>
 
</div>
  );
}

