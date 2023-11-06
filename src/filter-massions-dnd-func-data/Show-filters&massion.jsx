import React, { useState, useEffect } from 'react';
import './showData.css'
import Data from './data-massion/data';
import Inp from './input';
import Options from './data-massion/lst-options';
import Show from './massions-component/showMassion'
import { DndProvider,useDrop } from 'react-dnd'



let obFilter = {'category':'', 'milestone':'','issue_type':'','assignee':''}

// let DataFiltered = Data
export default function DivFilters(props){
  const [{isOver},drop] = useDrop(()=>({
    accept:'MASSION',
    drop:((itm)=>{itm.massion=props.cat;console.log(itm.massion);}),
    collect:((monitor)=>({
        isOver:!!monitor.isOver()
    }))
})
)
   //  create object of all the filters  
   
const [DataFiltered,setDataFiltered]=useState(Data)



function handleObFilter(obFilter1,input,type){
    // change every filter value to the input
    obFilter[type]=input
    
    filterInput(obFilter1)
    // filterInput(obFilter1)
    
    console.log(obFilter1);
}


// filter by txt( לשנות את ה includes)
function filterInput(filt){
    // filter the data with all the filters type at once
    setDataFiltered(Data.filter((itm) => itm['category'].includes(filt['category'])
    && itm['milestone'].includes(filt['milestone'])
    && itm['issue_type'].includes(filt['issue_type'])
    && itm['assignee'].includes(filt['assignee'])
    ))
    
}
function filterStatus(data, DivStatus) {
    return data.filter((itm) => itm.status === DivStatus);
  }
  function updateDND(id1, stat) {
    setDataFiltered((prevData) => {
        return prevData.map((itemInData) => {
            if (itemInData.id === id1) {
                // Update the status of the chosen item
                return { ...itemInData, status: stat };
            } else {
                // Return the item as is if it doesn't match the ID
                return itemInData;
            }
        });
    });
}

return (
    <div>
    <div className='filters'>
        <Inp func={handleObFilter} func1={filterInput} type={'category'} filters={obFilter} lstOptions={Options.category} name={'Category'}/>
        <Inp func={handleObFilter} func1={filterInput} type={'milestone'} filters={obFilter} lstOptions={Options.milestone} name={'Milestone'}/>
        <Inp func={handleObFilter} func1={filterInput} type={'issue_type'} filters={obFilter} lstOptions={Options.issue_type} name={'Issue Type'}/>
        <Inp func={handleObFilter} func1={filterInput} type={'assignee'} filters={obFilter} lstOptions={Options.assignee} name={'Assignee'}/>
    </div>
    
    <div className='div-massions status-columns'>
        <Show func={updateDND} datafiltered={filterStatus(DataFiltered, 'Not Started')} cat={'Not Started'} forwardRef={drop}/>
        <Show  func={updateDND}datafiltered={filterStatus(DataFiltered, 'In Progress')} cat={'In Progress'} forwardRef={drop} />
        <Show func={updateDND} datafiltered={filterStatus(DataFiltered, 'Completed')} cat={'Completed'} forwardRef={drop} />
        <Show func={updateDND} datafiltered={filterStatus(DataFiltered, 'Close')} cat={'Close'} forwardRef={drop} />
      </div>
</div>
  );
}
