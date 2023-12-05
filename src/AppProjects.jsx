import React, { useEffect, useState } from 'react';
import DivFilters from './components/filter-massions-dnd-func-data/ShowFiltersAndMassion';
import BorderFilter from './components/borderFilter';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import BoardOptions from './components/add board/boardOptions';
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
        console.log("Current Project:", currentProject);
        console.log("Current Data:", currentData);
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
