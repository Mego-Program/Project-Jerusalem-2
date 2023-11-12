// App.jsx
import React, { useState } from 'react';
import DivFilters from './components/filter-massions-dnd-func-data/ShowFiltersAndMassion';

import BorderFilter from './components/borderFilter';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
<<<<<<< HEAD
import ProjectData1 from './components/filter-massions-dnd-func-data/data-massion/projectData1'; 
import ProjectData2 from './components/filter-massions-dnd-func-data/data-massion/projectData2'; 
import ProjectData3 from './components/filter-massions-dnd-func-data/data-massion/projectData3';
import ProjectData4 from './components/filter-massions-dnd-func-data/data-massion/projectData4';  
import ProjectData5 from './components/filter-massions-dnd-func-data/data-massion/projectData5';
=======
import BorderFilter from './components/borderFilter'; 
>>>>>>> 4e992f4280db1db454816ef0ad9696d2ad834367

const projectDataMapping = {
  'Project A': ProjectData1,
  'Project B': ProjectData2,
  'Project C': ProjectData3,
  'Project D': ProjectData4,
  'Project E': ProjectData5, 
};

function App() {
  const [currentProject, setCurrentProject] = useState('Project A');
  const [currentData, setCurrentData] = useState(projectDataMapping[currentProject]);

<<<<<<< HEAD
  const handleProjectChange = (projectName) => {
    setCurrentProject(projectName);
    setCurrentData(projectDataMapping[projectName]);
  };

  return (
    <div>
      <BorderFilter onProjectChange={handleProjectChange} />
      <DndProvider backend={HTML5Backend}>
        <DivFilters projectData={currentData} />
      </DndProvider>
    </div>
  );
=======
function App(){
    return(
      <div>
        <BorderFilter>
        </BorderFilter>
      
      <DndProvider backend={HTML5Backend}>
        <DivFilters />
        </DndProvider>
      </div>
    )
>>>>>>> 4e992f4280db1db454816ef0ad9696d2ad834367
}

export default App;
