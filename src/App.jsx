import React, { useEffect, useState } from 'react';
import DivFilters from './components/filter-massions-dnd-func-data/ShowFiltersAndMassion';
import BorderFilter from './components/borderFilter';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AddBoard from './components/add board/addBoard';
import axios from 'axios';
import BoardOptions from './components/add board/boardOptions';


function App() {

  
  
  const [listBoards,setListBoards]=useState(null)
  const [currentProject,setCurrentProject]=useState(null)
  const [currentData, setCurrentData] = useState(null);
  const [addedBoard,setAddedBoard] = useState(null)
  

  let serverBaseUrl;

  if (process.env.NODE_ENV === 'development') {
    
    serverBaseUrl = 'http://localhost:3000/';
  } else {
    
    serverBaseUrl = 'https://project-jerusalem-2-server.vercel.app/';
  }

  useEffect(() => {
    const getDataBoards = async () => {
      console.log('Wait for the data to load');
      try {
        const response = await axios.get(`${serverBaseUrl}projects/listOfProjects`);
        setListBoards(response.data);
        
      } catch (error) {
        console.log('List not loading:', error);
      }
    };
    getDataBoards();
  }, [addedBoard]);


  useEffect(() => {
    if(addedBoard===null){
    if (listBoards && listBoards.length > 0) {
      const firstBoard = listBoards[0];
      setCurrentProject(firstBoard);
    }}
  }, [listBoards]);

  
  useEffect(() => {
    if (currentProject !== null) {
      fetchData();
      
    }
  }, [currentProject]);
  
  async function fetchData() {
    try {
      const response = await axios.get(`${serverBaseUrl}projects/${currentProject}`);
      setCurrentData(response.data);
      
      
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  }


  if (currentData === null || listBoards === null) {
    return <div>Loading...</div>;
  }

  async function fetchProjectData(projectName) {
    try {
      setCurrentProject(projectName);
      fetchData()
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  }

  async function addBoard(name,names) {
    try {
      const response = await axios.post(`${serverBaseUrl}projects/addNewProject`, { name,names });   
      setAddedBoard(name)
      setCurrentProject(name)
      fetchData()
      
    } catch (error) {
      console.error('Error adding new project:', error);
      throw error;
    }
  }
  async function deleteBoard(projectName) {
    const name = listBoards[0] 
    try {
      
      console.log('deleting');
      const response = await axios.post(`${serverBaseUrl}projects/deleteProject`, { projectName }).then(
        setAddedBoard(name)).then(setCurrentProject(name)).then(fetchData())
        await new Promise(resolve => setTimeout(resolve, 10000));
        console.log(response);
    }catch(err){console.log(err);}
  }
  

  
  return (
    <div>
      <BorderFilter onProjectChange={fetchProjectData} listProjects={listBoards} newboard={addedBoard} />
      <BoardOptions addfunc={addBoard} deleteBoardFunc={deleteBoard} projectName={currentProject}/>
      
      <DndProvider backend={HTML5Backend}>
        <DivFilters projectData={currentData} collection={currentProject}/>
      </DndProvider>
    </div>
  );
}

export default App;