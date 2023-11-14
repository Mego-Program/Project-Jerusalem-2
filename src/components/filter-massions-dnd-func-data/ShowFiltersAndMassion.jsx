import React, { useState, useEffect } from 'react';
import './showData.css'

import Inp from './input';

import Show from './massions-component/showMassion'



let obFilter = {'category':'', 'milestone':'','issue_type':'','assignee':''}

export default function DivFilters(props){
  

const names =[... new Set(props.projectData.map((obj) => ({ id: obj.id, name: obj.assignee })))]
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
  resetFilters();
}, [props.projectData]);

// reset the filter every project change
const [dummyState, setDummyState] = useState(false);
function resetFilters() {
  obFilter = { 'category': '', 'milestone': '', 'issue_type': '', 'assignee': '' };
  setDummyState((prev) => !prev);
}

function handleObFilter(input,type){
    // change every filter value to the input
    obFilter[type]=input
    console.log(obFilter);
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
  // close
}

function filterInput(filt) {
  // filter the data with all the filters type at once
  setDataFiltered(
      props.projectData.filter((itm) => 
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
    const newdata = DataFiltered.map((itemInData) => {
      if (itemInData.id === id1) {
        itemInData.status = stat;
      }
      return itemInData; 
    });
    setDataFiltered(newdata)
  //  console.log(DataFiltered);
    filterInput(obFilter)

  }

  function dueDate(date,id1){
const newdata = DataFiltered.map((itemInData) => {
      if (itemInData.id === id1) {
        itemInData.deadline = date;
      }
      return itemInData; 
    });
    setDataFiltered(newdata);
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
        <Show  func={updateDND} datafiltered={filterStatus(DataFiltered, 'Not Started')} cat={'Not Started'} names={names} funcChange={changeAssignee} dueDate={dueDate}/>
        <Show  func={updateDND}datafiltered={filterStatus(DataFiltered, 'In Progress')} cat={'In Progress'}   names={names} funcChange={changeAssignee} dueDate={dueDate}/>
        <Show func={updateDND} datafiltered={filterStatus(DataFiltered, 'Completed')} cat={'Completed'}  names={names} funcChange={changeAssignee} dueDate={dueDate}/>
        <Show func={updateDND} datafiltered={filterStatus(DataFiltered, 'Close')} cat={'Close'}  names={names} funcChange={changeAssignee} dueDate={dueDate}/>
      </div>
 
</div>
  );
}