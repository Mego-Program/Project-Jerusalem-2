import AddSprintModal from "./AddSprintModal";
import React, { useState } from "react";
import SprintBoard from "./SprintBoard";

export default function AddSprint({ updateTaskFunc, toggleSprintActive, isSprintActive, dataSprint }) {
    const [activeSprintDetails, setActiveSprintDetails] = useState(null);
    const [isAddSprintModalOpen, setIsAddSprintModalOpen] = useState(false);

    const handleSprintAdded = (sprintData) => {
        console.log("Received sprint details:", sprintData); 
        setActiveSprintDetails(sprintData);
        props.toggleSprintActive(true); // Toggle to sprint view
        setIsAddSprintModalOpen(false);
    };
    console.log("activeSprintDetails:", activeSprintDetails);

    return (
        <div>
            {props.isSprintActive && activeSprintDetails ? (
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
                        projectNames={props.dataSprint.map((project) => project)}
                    />
                </>
            )}
        </div>
    );
}
