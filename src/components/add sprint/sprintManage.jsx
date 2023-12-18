import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddSprintModal from './AddSprintModal';
import SprintBoard from './SprintBoard';


function SprintManager({ currentProject,  parentBoardTasks, addBoard}) {
    const [isSprintActive, setIsSprintActive] = useState(false);
    const [activeSprintDetails, setActiveSprintDetails] = useState(null);
    const [sprints, setSprints] = useState([]);
    const [isAddSprintModalOpen, setIsAddSprintModalOpen] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [selectedSprint, setSelectedSprint] = useState(null);

    const serverBaseUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000/' 
        : 'https://project-jerusalem-2-server.vercel.app/';

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
            // Assuming you want to do something with the response data
        } catch (error) {
            console.error('Error fetching board data:', error);
        }
    };
    
    const fetchSprintData = (sprintName, boardName) => {
    const sprintData = sprints.find(sprint => sprint.sprintName === sprintName && sprint.boardName === boardName);
        if (sprintData) {
            setActiveSprintDetails(sprintData);
            setIsSprintActive(true);
            // Assuming you want to do something with the sprintData
        } else {
            console.error("Sprint data not found for:", sprintName);
        }
    };
    
    useEffect(() => {
        // Example useEffect, can be adjusted as per your logic
    }, [currentProject, sprints]);

    const toggleAddSprintModal = () => {
        setIsAddSprintModalOpen(!isAddSprintModalOpen);
    };

    return (
        <div>
            {!isSprintActive && (
                <button onClick={toggleAddSprintModal}>
                    Add Sprint
                </button>
            )}
             {isAddSprintModalOpen && (
                <AddSprintModal
                    isOpen={isAddSprintModalOpen}
                    onClose={() => setIsAddSprintModalOpen(false)}
                    onSprintAdded={handleSprintAdded}
                    projectNames={parentBoardTasks || []}
                    addBoard={addBoard}
                />
            )}
            <SprintBoard sprintDetails={activeSprintDetails} />
        </div>
    );
}

export default SprintManager;
