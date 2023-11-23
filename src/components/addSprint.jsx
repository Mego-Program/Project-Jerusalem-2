import AddSprintModal from "./AddSprintModal";
import React, { useState } from "react";
import SprintBoard from "./SprintBoard";

export default function AddSprint(props) {
    const [isSprintActive, setIsSprintActive] = useState(false);
    const [activeSprintDetails, setActiveSprintDetails] = useState(null);
    const [isAddSprintModalOpen, setIsAddSprintModalOpen] = useState(false);

    const handleSprintAdded = (sprintDetails) => {
        setActiveSprintDetails(sprintDetails);
        setIsSprintActive(true);
        setIsAddSprintModalOpen(false);
    };

    return (
        <div>
            {isSprintActive ? (
                <SprintBoard sprintDetails={activeSprintDetails} />
            ) : (
                <>
                    <button onClick={() => setIsAddSprintModalOpen(true)}>
                        Open Add Sprint Modal
                    </button>
                    <AddSprintModal
                        isOpen={isAddSprintModalOpen}
                        onClose={() => setIsAddSprintModalOpen(false)}
                        onSprintAdded={handleSprintAdded}
                        projectNames={props.dataSprint}
                    />
                </>
            )}
        </div>
    );
}
