// App.jsx
import React, { useState } from 'react';
import DivFilters from './components/filter-massions-dnd-func-data/ShowFiltersAndMassion';
import BorderFilter from './components/borderFilter';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AddBoard from './components/add board/addBoard';
import axios from 'axios'



import ProjectData1 from './components/filter-massions-dnd-func-data/data-massion/projectData1'; 
import ProjectData2 from './components/filter-massions-dnd-func-data/data-massion/projectData2'; 
import ProjectData3 from './components/filter-massions-dnd-func-data/data-massion/projectData3';
import ProjectData4 from './components/filter-massions-dnd-func-data/data-massion/projectData4';  
import ProjectData5 from './components/filter-massions-dnd-func-data/data-massion/projectData5';

const projectDataMapping = {
  'Project A': ProjectData1,
  'Project B': ProjectData2,
  'Project C': ProjectData3,
  'Project D': ProjectData4,
  'Project E': ProjectData5, 
};


// 


function App() {
  const listProjects = ['Project1','Project2','Projects','ProjectD','ProjectE']
  const [currentProject, setCurrentProject] = useState('Project A');
  const [currentData, setCurrentData] = useState(projectDataMapping[currentProject]);
// request to fetch the project needed
async function fetchProjectData (projectName){
  try {
    const response = await axios.get(`http://127.0.0.1:3000/projects/${projectName}`);
    console.log(projectName);
    setCurrentData(response.data)
  } catch (error) {
    console.error('Error fetching project data:', error);
  }
};


async function addBoard(name) {
  try {
    const response = await axios.post('http://127.0.0.1:3000/projects/addNewProject', { name });
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error adding new project:', error);
    throw error; // Throw the error to be handled by the caller
  }
}
async function addBoard1(name) {
  try {
    const result = await addBoard(name);
    console.log('Project added successfully:', result);
    // Handle the success, if needed
  } catch (error) {
    console.error('Error adding project:', error.message);
    // Handle the error or respond to the user appropriately
  }
}




function addNewBoard(name){
const newP = []
  projectDataMapping[name] = newP
  listProjects.push(name)
}

  const handleProjectChange = (projectName) => {
    
    setCurrentProject((prev)=>{return projectName});
    setCurrentData(projectDataMapping[projectName]);
  };

  return (
    <div>
      <BorderFilter onProjectChange={fetchProjectData} listProjects={listProjects} />
      <AddBoard func={addBoard1}/>
      <DndProvider backend={HTML5Backend}>
        <DivFilters projectData={currentData} />
      </DndProvider>
      
    </div>
  );}

export default App;
