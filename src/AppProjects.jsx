import React, { useEffect, useState } from 'react';
import DivFilters from './components/filter-massions-dnd-func-data/ShowFiltersAndMassion';
import BorderFilter from './components/borderFilter';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import BoardOptions from './components/add board/boardOptions';
import { userNameAtom,atomUrl } from './userNameAtom';
import {useAtom} from 'jotai'
import fakeToken from './fakeToken';

function AppProjects() {
 const [userName,setUserName]= useAtom(userNameAtom)
 const [url,setUrl] = useAtom(atomUrl)
  const [listBoards,setListBoards]=useState(null)
  const [currentProject,setCurrentProject]=useState(null)
  const [currentData, setCurrentData] = useState(null);
  const [addedBoard,setAddedBoard] = useState(null)



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
      const response = await axios.get(`${url}projects/listofprojects/`,{params:{userName}});
      setListBoards(response.data);
    } catch (error) {
      if(error.response.data.auth===false){console.log('login first')}
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
      const response = await axios.get(`${url}missions/${currentProject}`);
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

  async function addBoard(name,names,specs) {
    if(name===''){alert('please enter name');return}
    try {
      const response = await axios.post(`${url}projects/`, { name,names ,specs},{
         headers: {
        'Content-Type': 'application/json',
        // Authorization: localStorage.getItem('token'),
        Authorization:fakeToken //change it to the previous line when there is real token

      },}) 
      console.log(response.userInCharge);
      setAddedBoard(name)
      setCurrentProject(name)
      fetchData()
      
    } catch (error) {
      console.error('Error adding new project:', error);
      throw error;
    }
  }

  async function editBoard(input,namesToAdd,namesToRemove,projectName,specsToAdd,specsToRemove){
    if (!input&&namesToAdd.length===0&&namesToRemove.length===0){return}
    try{
      const response = await axios.put(`${url}projects/`,{input,namesToAdd,namesToRemove,projectName,specsToAdd,specsToRemove,userName})
      setAddedBoard('')
      if(input!==''){
      setAddedBoard(input)
      setCurrentProject(input)}
      else{setAddedBoard(projectName);setCurrentProject(projectName)}
      fetchData()
    }catch(error){console.log('error while edit error',error);if(error.message.includes('403')){alert('no promissions to edit')}}
  }

  async function deleteBoard(projectName) {

      try {
        console.log('deleting');
        const response = await axios.delete(`${url}projects/`, {
          params: { projectName,userName },
        });
        setAddedBoard(listBoards[0]!==projectName?listBoards[0]:listBoards[1])
      } catch (error) {
        console.log(error);if(error.message.includes('403')){alert('no promissions to delete')};
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