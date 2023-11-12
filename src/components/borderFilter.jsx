import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import './borderFilter.css';

const borderFilterStyles = {
<<<<<<< HEAD
  width: '100%',
  marginTop:'10vh',
  marginBottom:'5vh',
  height: '70px',
  background: '#121231', 
=======
  position: 'relative',
  width: '100%',
  height: '83px',
  // top: '242px',
  background: '#21213E', 
>>>>>>> 4e992f4280db1db454816ef0ad9696d2ad834367
  boxShadow: '0px 20px 70px rgba(86, 89, 146, 0.1)',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const displayStyles = {
  fontFamily: 'Poppins',
  fontWeight: 600,
  fontSize: '23px',
  lineHeight: '34.5px',
  color: '#FFFFFF', 
};

const selectStyles = {
  fontFamily: 'Poppins',
  fontWeight: 600,
  fontSize: '23px',
  lineHeight: '34.5px',
  color: '#FFFFFF', 
};

const iconCircleStyles = {
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center', 
  background: '#21213E', 
  width: '40px', 
  height: '40px',   
  borderRadius: '50%', 
};

const projects = ['Project A', 'Project B', 'Project C', 'Project D', 'Project E'];

// onProjectChange prop is passed from the App component
const BorderFilter = ({ onProjectChange }) => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [anchorEl, setAnchorEl] = useState(null);

  const dropdownMenuStyles = {
    backgroundColor: '#121231',
  };

  const handleProjectSelectionChange = (event) => {
    const newSelectedProject = event.target.value;
    setSelectedProject(newSelectedProject);
    onProjectChange(newSelectedProject); // This callback informs App of the change
  };

  return (
    <div style={borderFilterStyles}>
      <div style={displayStyles}>
         {selectedProject}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', order: 2 }}>
        <span style={{ color: '#FFFFFF' }}>Board</span>
        <div style={iconCircleStyles}>
          <FilterListIcon
            className="filter-icon"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            style={{ ...selectStyles, cursor: 'pointer' }}
          />
        </div>
        <Select
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          value={selectedProject}
          onChange={handleProjectSelectionChange}
          sx={selectStyles}
          anchorEl={anchorEl}
          MenuProps={{ PaperProps: { style: dropdownMenuStyles } }}
        >
          {projects.map((project) => (
            <MenuItem key={project} value={project}>
              {project}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default BorderFilter;
