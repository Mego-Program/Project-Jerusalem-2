import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import './AddSprintModal.css';

function AddSprintModal({ isOpen, onClose, onSprintAdded, projectNames }) {
    const [sprintName, setSprintName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedProjects, setSelectedProjects] = useState([]);


    const handleAddSprint = () => {
        const sprintData = { sprintName, startDate, endDate, selectedProjects };
        onSprintAdded(sprintData);
        onClose(); 
    };
    

    const handleProjectChange = (event) => {
        setSelectedProjects(event.target.value);
    };

    if (!isOpen) return null;
    console.log('Project Names:', projectNames);

    return (
        <div className="modal">
            <input 
                type="text"
                value={sprintName}
                onChange={(e) => setSprintName(e.target.value)}
                placeholder="Sprint Name"
            />
            <input 
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input 
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <FormControl fullWidth>
                 <InputLabel id="project-select-label">Projects</InputLabel>
                 <Select
                    labelId="project-select-label"
                     id="project-select"
                    multiple
                    value={selectedProjects}
                    onChange={handleProjectChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {projectNames.map((project) => (
                        <MenuItem key={projectNames} value={projectNames} >
                            {projectNames}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={handleAddSprint} variant="contained" color="primary">
                Add Sprint
            </Button>
            <Button onClick={onClose} variant="outlined" color="secondary">
                Cancel
            </Button>
        </div>
    );
}

export default AddSprintModal;
