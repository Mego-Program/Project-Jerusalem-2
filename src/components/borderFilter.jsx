import React, { useEffect,useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import './borderFilter.css';

const borderFilterStyles = {
  width: '100%',
  marginTop:'10vh',
  marginBottom:'5vh',
  height: '70px',
  background: '#121231', 
  boxShadow: '0px 20px 70px rgba(86, 89, 146, 0.1)',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const displayStyles = {
  marginLeft:'5vw',
  fontFamily: 'Poppins',
  fontWeight: 900,
  fontSize: '5vh',
  lineHeight: '4vh',
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




const BorderFilter =({ onProjectChange ,listProjects,newboard}) => {
  const projects =listProjects
  let currentProject=listProjects[0]
  const [selectedProject, setSelectedProject] = useState(currentProject);
  useEffect(() => {
    if(newboard!==null&&newboard!==selectedProject){
    setSelectedProject(newboard)}
  },[newboard])

  const [anchorEl, setAnchorEl] = useState(null);
  const dropdownMenuStyles = {
    backgroundColor: '#121231',
  };

  const handleProjectSelectionChange = (event) => {
    const newSelectedProject = event.target.value;
    setSelectedProject(newSelectedProject);
    onProjectChange(newSelectedProject); 
  };

  return (
    <div style={borderFilterStyles}>
      <div style={displayStyles}>
         {selectedProject}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', order: 2 }}>
        <span style={{ color: '#FFFFFF' ,fontFamily:'Poppins',
fontSize: '23px',
fontWeight: '600',
lineHeight: '35px',
letterSpacing: '0em'}}>Choose Board</span>
        <div style={iconCircleStyles}>
          <FilterListIcon
            className="filter-icon"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            style={{ ...selectStyles, cursor: 'pointer' }}
          />
        </div>
        <Select
        
        value={selectedProject}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          onChange={handleProjectSelectionChange}
          
          sx={selectStyles}
          anchorel={anchorEl}
          MenuProps={{ PaperProps: { style: dropdownMenuStyles } }}
          renderValue={()=>null}
        >
          {projects.map((project) => (
            <MenuItem  key={project} value={project}>
              {project}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default BorderFilter;