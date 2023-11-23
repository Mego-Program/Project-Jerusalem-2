import React, { useState, useEffect } from 'react';
import './SprintBoard.css';
import Stopwatch from './SprintBoardStopwatch';

function SprintBoard({ sprintName, startDate, endDate }) {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        // Function to update the remaining time
        const updateTimer = () => {
            // Calculate remaining time based on endDate
            // Set timeLeft state
            // For now, let's just log something
            console.log("Timer update function needs implementation");
        };

        const timer = setInterval(updateTimer, 1000);
        return () => clearInterval(timer);
    }, [endDate]);

    // Render the board with tasks and stopwatch
    return (
        <div className="sprint-board">
            <h2>{sprintName}</h2>
            <div className="stopwatch">
                <Stopwatch />
            </div>
            {/* Render tasks similar to DivFilters */}
            {/* For now, we are not including the Show component or DnD features */}
            {/* <Show /> */}
            <p>Tasks will be displayed here.</p>
        </div>
    );
}

export default SprintBoard;
