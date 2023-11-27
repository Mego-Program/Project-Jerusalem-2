import React, { useEffect, useState } from 'react';
import DivFilters from './components/filter-massions-dnd-func-data/ShowFiltersAndMassion';
import BorderFilter from './components/borderFilter';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import BoardOptions from './components/add board/boardOptions';


function AppProjects() {

  
  
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
    if (addedBoard !== null) {
      fetchProjectData(addedBoard);
    }
    getDataBoards()
  }, [addedBoard]);


  useEffect(() => {
    if(addedBoard===null){
    if ( listBoards&&listBoards.length > 0) {
      const firstBoard = listBoards[0];
      setCurrentProject(firstBoard);
    }else if(listBoards&&listBoards.length===0){setCurrentProject('no project found')}}
    else{setCurrentProject(addedBoard)}
  }, [listBoards]);

  
  useEffect(() => {
    if (currentProject !== null) {
      fetchData();
    }
  }, [currentProject]);
  
  const getDataBoards = async () => {
    console.log('Wait for the data to load');
    try {
      const response = await axios.get(`${serverBaseUrl}projects/listofprojects`);
      setListBoards(response.data);
    } catch (error) {
      console.log('List not loading:', error);
    }
  };

  async function fetchData() {
    if(currentProject==='no project found'){
      alert('creat new first project')
      setCurrentData([])
      return
    }
    try {
      const response = await axios.get(`${serverBaseUrl}missions/${currentProject}`);
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
    if(name===''){alert('please enter name');return}
    try {
      const response = await axios.post(`${serverBaseUrl}projects/`, { name,names }) 
      console.log(response.data);  
      setAddedBoard(name)
      setCurrentProject(name)
      fetchData()
      
    } catch (error) {
      console.error('Error adding new project:', error);
      throw error;
    }
  }

  async function editBoard(input,namesToAdd,namesToRemove,projectName){
    if (!input&&namesToAdd.length===0&&namesToRemove.length===0){return}
    try{
      const response = await axios.put(`${serverBaseUrl}projects/`,{input,namesToAdd,namesToRemove,projectName})
      setAddedBoard('')
      if(input!==''){
      setAddedBoard(input)
      setCurrentProject(input)}
      else{setAddedBoard(projectName);setCurrentProject(projectName)}
      fetchData()
      console.log(response.data);
    }catch(error){console.log('error while edit error',error);}
  }

  async function deleteBoard(projectName) {

      try {
        console.log('deleting');
        const response = await axios.delete(`${serverBaseUrl}projects/`, {
          params: { projectName },
        });
        setAddedBoard(listBoards[0]!==projectName?listBoards[0]:listBoards[1])
      } catch (err) {
        console.log(err);
      }
    
  }
  


  
  return (
    <div >
      <BorderFilter onProjectChange={fetchProjectData} listProjects={listBoards} newboard={addedBoard} />

      <BoardOptions addfunc={addBoard} editFunc={editBoard} deleteBoardFunc={deleteBoard} projectName={currentProject} />
      

      <DndProvider backend={HTML5Backend}>
        <DivFilters projectData={currentData} collection={currentProject}/>
      </DndProvider>
    </div>
  );
}

export default AppProjects;