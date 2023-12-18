import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField, Chip } from '@mui/material';
import axios from 'axios'; // Import axios
import './AddSprintModal.css';

function AddSprintModal({ isOpen, onClose, projectNames, addBoard }) {
    const [sprintName, setSprintName] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedProjects, setSelectedProjects] = useState([]);

    const handleAddSprint = () => {
        const formattedEndDate = convertDateToISO(endDate);
        const sprintData = {
            sprintName, 
            endDate: formattedEndDate, 
            selectedProjects
        };
    addBoard (sprintName, null, null, endDate)
   console.log(sprintData);
    };

    const handleProjectChange = (event) => {
        const newSelectedProjects = event.target.value.map(value => {
            return projectNames.find(project => project.header === value);
        }).filter(project => project !== undefined);

        setSelectedProjects(newSelectedProjects);
    };
    
    const convertDateToISO = (dateStr) => {
        const parts = dateStr.split('-');
        return `${parts[0]}-${parts[1]}-${parts[2]}`;
    };

    if (!isOpen) return null;


    return (
        <div className="modal">
            <TextField
                type="text"
                value={sprintName}
                onChange={(e) => setSprintName(e.target.value)}
                placeholder="Sprint Name"
                fullWidth
            />
            <TextField 
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
            />
            <FormControl fullWidth>
                <InputLabel id="project-select-label">Select Tasks</InputLabel>
                <Select
                    labelId="project-select-label"
                    id="project-select"
                    multiple
                    value={selectedProjects.map(task => task.header)}
                    onChange={handleProjectChange}
                    style={{ background: '#21213E', color: 'white' }}  
                    renderValue={(selected) => (
                        selected.map(project => (
                            <Chip 
                                key={project}
                                label={project} 
                                style={{ 
                                    maxWidth: '1000px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    backgroundColor: '#121231',
                                    color: 'white',
                                    margin: '5px',
                                    font: 'popins',
                                }} 
                            />
                        ))
                    )}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                backgroundColor: '#21213E',
                                font: 'popins',
                            }
                        }
                    }}
                >
                     {projectNames.map((task, index) => (
                        <MenuItem key={index} value={task.header}>
                            {task.header}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={handleAddSprint} variant="contained" color="primary">
                Create Sprint
            </Button>
            <Button onClick={onClose} variant="outlined" color="secondary">
                Cancel
            </Button>
        </div>
    );
}

export default AddSprintModal;
