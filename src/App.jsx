import React, {useEffect, useState } from 'react';
import DivFilters from './components/filter-massions-dnd-func-data/ShowFiltersAndMassion';
import BorderFilter from './components/borderFilter';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AddBoard from './components/add board/addBoard';
import axios from 'axios'


function App() {
  
  // states for list boards, current board and data
  const [listBoards,setListBoards]=useState(null)
  const [currentProject,setCurrentProject]=useState(null)
  const [currentData, setCurrentData] = useState(null);
// 

// use effect in loop until board list is exsist
  useEffect(() => {
    const getDataBoards = async () => {
      console.log('wait to the data to load');
      try {
        const response = await axios.get('http://127.0.0.1:3000/projects/listOfProjects');
        setListBoards(response.data);
        setCurrentProject(listBoards[0])
      } catch (error) {
        console.log('list not loading:', error);
      }
    };
      getDataBoards();
    
    // Call getDataBoards once when the component mounts
    
  }, []);
  // use effect in loop until the data load
  useEffect(() => {
    // start the currwnt board an the first one 
    const firstBoard =  'Project_A'
    setCurrentProject(firstBoard)
    async function fetchData() {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/projects/${currentProject}`);
        setCurrentData(response.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    }
  
    // Check if currentProject is not null before making the API call
    if (firstBoard !== null) {
      fetchData();
    }
  }, [listBoards]);
  // sow somthing before data and board list are load
  if (currentData === null||listBoards===null) {
    return <div>Loading...</div>;
  }
// request to fetch the project needed
async function fetchProjectData (projectName){
  try {
    const response = await axios.get(`http://127.0.0.1:3000/projects/${projectName}`);
    setCurrentData(response.data)
    setCurrentProject(projectName)
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


  return (
    <div>
      <BorderFilter onProjectChange={fetchProjectData} listProjects={listBoards} />
      <AddBoard func={addBoard1}/>
      <DndProvider backend={HTML5Backend}>
        <DivFilters projectData={currentData} collection={currentProject} />
      </DndProvider>
      
    </div>
  );}

export default App;