// App.jsx
import React, { useState } from 'react';
import DivFilters from './components/filter-massions-dnd-func-data/ShowFiltersAndMassion';
import BorderFilter from './components/borderFilter';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AddBoard from './components/add board/addBoard';



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

function App() {
  const listProjects = ['Project A','Project B','Project C','Project D','Project E']
  const [currentProject, setCurrentProject] = useState('Project A');
  const [currentData, setCurrentData] = useState(projectDataMapping[currentProject]);

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
      <BorderFilter onProjectChange={handleProjectChange} listProjects={listProjects} />
      <AddBoard func={addNewBoard}/>
      <DndProvider backend={HTML5Backend}>
        <DivFilters projectData={currentData} />
      </DndProvider>
      
    </div>
  );}

export default App;
