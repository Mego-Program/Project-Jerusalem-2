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
import AddSprintModal from './components/add sprint/AddSprintModal';
import SprintBoard from './components/add sprint/SprintBoard';

  function AppProjects() {
    const [listBoards, setListBoards] = useState(null);
    const [currentProject, setCurrentProject] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const [addedBoard, setAddedBoard] = useState(null);
    const [isSprintActive, setIsSprintActive] = useState(false);
    const [activeSprintDetails, setActiveSprintDetails] = useState(null);
    const [isAddSprintModalOpen, setIsAddSprintModalOpen] = useState(false);
    const [sprints, setSprints] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [selectedSprint, setSelectedSprint] = useState(null);

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
  const serverBaseUrl = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000/' 
  : 'https://project-jerusalem-2-server.vercel.app/';

useEffect(() => {
  getDataBoards();
}, []);

const getDataBoards = async () => {
  try {
      const response = await axios.get(`${serverBaseUrl}projects/listofprojects`);
      setListBoards(response.data);
      if (response.data.length > 0) {
          setCurrentProject(response.data[0]);
          fetchProjectData(response.data[0]);
      }
  } catch (error) {
      console.log('Error loading board list:', error);
  }
};

const fetchProjectData = async (projectName) => {
  try {
      const response = await axios.get(`${serverBaseUrl}missions/${projectName}`);
      setCurrentData(response.data);
  } catch (error) {
      console.error('Error fetching project data:', error);
  }
};

const handleSprintAdded = (sprintData) => {
setActiveSprintDetails(sprintData);
setIsSprintActive(true);
setSprints(prevSprints => [...prevSprints, { boardName: currentProject, sprintName: sprintData.sprintName }]);
};

const handleItemSelection = async (selectedItem) => {
  const [boardName, sprintName] = selectedItem.split("-");
  setSelectedBoard(boardName);
  setSelectedSprint(sprintName);

  if (sprintName) {
      fetchSprintData(sprintName, boardName);
  } else {
      fetchBoardData(boardName);
  }
};




const fetchBoardData = async (boardName) => {
  const url = `${serverBaseUrl}missions/${boardName}`;
  console.log("Fetching data from:", url);
  try {
      const response = await axios.get(url);
      console.log("Fetched Board Data:", response.data);
      setCurrentData(response.data);
      setIsSprintActive(false); // Deactivate sprint view
      setActiveSprintDetails(null); // Reset sprint details
  } catch (error) {
      console.error('Error fetching board data:', error);
  }
};

const fetchSprintData = (sprintName, boardName) => {
  const sprintData = sprints.find(sprint => sprint.sprintName === sprintName && sprint.boardName === boardName);
  if (sprintData) {
      setActiveSprintDetails(sprintData);
      setIsSprintActive(true);
      setCurrentData(sprintData.tasks); // Assuming sprintData.tasks is an array of tasks
  } else {
      console.error("Sprint data not found for:", sprintName);
      // Handle the error case
  }
};


useEffect(() => {
}, [currentProject, currentData]);


const toggleAddSprintModal = () => {
  setIsAddSprintModalOpen(!isAddSprintModalOpen);
};

if (currentData === null || listBoards === null) {
  return <div>Loading...</div>;
}
return (
    <div>
        <BorderFilter 
            onProjectChange={handleItemSelection}
            listProjects={listBoards}
            listSprints={sprints}
            newboard={addedBoard}
        />
        <BoardOptions 
            addfunc={name => fetchProjectData(name)} 
            editFunc={fetchProjectData} 
            deleteBoardFunc={fetchProjectData} 
            projectName={currentProject} 
        />
        {!isSprintActive && (
            <button onClick={toggleAddSprintModal}>
                Add Sprint
            </button>
        )}
        {isAddSprintModalOpen && (
            <AddSprintModal
                isOpen={isAddSprintModalOpen}
                onClose={toggleAddSprintModal}
                onSprintAdded={handleSprintAdded}
                projectNames={currentData.map((project) => project)}
            />
        )}
        <DndProvider backend={HTML5Backend}>
            {!isSprintActive ? (
                <DivFilters projectData={currentData} collection={currentProject} />
            ) : (
                <SprintBoard sprintDetails={activeSprintDetails} />
            )}
        </DndProvider>
    </div>
);
}

export default AppProjects;





    
