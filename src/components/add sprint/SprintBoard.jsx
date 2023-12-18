import React, { useState, useEffect } from 'react';
import './SprintBoard.css';
import Show from '../filter-massions-dnd-func-data/massions-component/showMassion';
import Stopwatch from './SprintBoardStopwatch';

function SprintBoard({ sprintDetails }) {
    // Destructure properties directly from sprintDetails
    const { sprintName, endDate, selectedProjects } = sprintDetails || {};
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (selectedProjects && selectedProjects.length > 0) {
            setTasks(selectedProjects);
        } else {
            // Handle the case where selectedProjects is undefined or empty
            console.log("No projects selected for this sprint.");
            // Optionally, fetch the data again or set a default state
        }
    }, [selectedProjects]);
    
    const updateTaskStatus = (taskId, newStatus) => {
        console.log("Updating task:", taskId, "New status:", newStatus);
        const updatedTasks = tasks.map(task => {
            if (task._id === taskId) {
                return { ...task, status: newStatus };
            }
            return task;
        });
        console.log("Updated tasks:", updatedTasks);
        setTasks(updatedTasks);
    };

    const statuses = ["Not Started", "In Progress", "Completed", "Close"];

    if (!sprintDetails) {
        return <div>No sprint details available.</div>;
    }

    return (
        <div className="sprint-board">
            <h2>{sprintName}</h2>
            <div className="stopwatch">
                <Stopwatch endDate={endDate} />
            </div>
            <div className="status-container">
                {statuses.map((status) => (
                    <Show 
                        key={status}
                        cat={status}
                        datafiltered={tasks.filter(task => task.status === status)}
                        updateTaskFunc={updateTaskStatus}
                        showEndDate={false} 
                    />
                ))}
            </div>
        </div>
    );
}

export default SprintBoard;
