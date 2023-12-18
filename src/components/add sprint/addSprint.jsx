import React, { useState } from "react";
import AddSprintModal from "./AddSprintModal";
import SprintBoard from "./SprintBoard";

export default function AddSprint({ updateTaskFunc, toggleSprintActive, isSprintActive, parentBoardData }) {
    const [activeSprintDetails, setActiveSprintDetails] = useState(null);
    const [isAddSprintModalOpen, setIsAddSprintModalOpen] = useState(false);

    const handleSprintAdded = (sprintData) => {
        console.log("Received sprint details:", sprintData); 
        setActiveSprintDetails(sprintData);
        toggleSprintActive(true); // Toggle to sprint view
        setIsAddSprintModalOpen(false);
    };

    console.log("activeSprintDetails:", activeSprintDetails);

    return (
        <div>
            {isSprintActive && activeSprintDetails ? (
                <SprintBoard 
                    sprintDetails={activeSprintDetails}
                    updateTaskFunc={updateTaskFunc}
                />
            ) : (
                <>
                    <button onClick={() => setIsAddSprintModalOpen(true)}>
                        Add Sprint
                    </button>
                    <AddSprintModal
                        isOpen={isAddSprintModalOpen}
                        onClose={() => setIsAddSprintModalOpen(false)}
                        onSprintAdded={handleSprintAdded}
                        projectNames={dataSprint.map((project) => project)}
                    />
                </>
            )}
        </div>
    );
}
