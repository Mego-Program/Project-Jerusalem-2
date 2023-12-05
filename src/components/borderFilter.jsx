import React, { useState, useEffect } from 'react';
import { Select, MenuItem, ListSubheader } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import './borderFilter.css';

const borderFilterStyles = {
  width: '100%',
  marginTop: '10vh',
  marginBottom: '5vh',
  height: '70px',
  background: '#121231', 
  boxShadow: '0px 20px 70px rgba(86, 89, 146, 0.1)',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const displayStyles = {
  marginLeft: '5vw',
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

const selectLabelStyles = {
  // Define your styles here, for example:
  color: '#FFFFFF',
  fontFamily: 'Poppins',
  fontSize: '5vh',
  fontWeight: '600',
  lineHeight: '35px',
  letterSpacing: '0em',
};


const BorderFilter = ({ onProjectChange, listProjects = [], listSprints = [], newboard }) => {
  const [selectedItem, setSelectedItem] = useState(newboard || (listProjects.length > 0 ? listProjects[0] : ''));

  useEffect(() => {
    if (newboard && newboard !== selectedItem) {
      setSelectedItem(newboard);
    }
  }, [newboard, selectedItem]);

  const handleSelectionChange = (event) => {
    const selected = event.target.value;
    console.log("border selected:", selected)
    setSelectedItem(selected);
    onProjectChange(selected);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const dropdownMenuStyles = {
    backgroundColor: '#121231',
  };

  const renderMenuItems = () => {
    const items = [];

    listProjects.forEach(project => {
      items.push(
        <MenuItem key={project} value={project}>
          {project}
        </MenuItem>
      );

      const sprintsForProject = listSprints.filter(sprint => sprint.boardName === project);
      sprintsForProject.forEach(sprint => {
        items.push(
          <MenuItem key={`${project}-${sprint.sprintName}`} value={`${project}-${sprint.sprintName}`} style={{ paddingLeft: '20px' }}>
            {"-- " + sprint.sprintName}
          </MenuItem>
        );
      });
    });

    return items;
  };

  return (
    <div style={borderFilterStyles}>
      <div style={displayStyles}>
        {selectedItem}
      <div style={displayStyles} className='proj_name'>
         {selectedProject}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', order: 2 }}>
        <span style={selectLabelStyles}>Choose Board or Sprint</span>
        <div style={iconCircleStyles}>
          <FilterListIcon
            className="filter-icon"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          />
        </div>
        <Select
          value={selectedItem}
        className='drop_board'
        value={selectedProject}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          onChange={handleSelectionChange}
          sx={selectStyles}
          MenuProps={{ PaperProps: { style: dropdownMenuStyles } }}
          renderValue={() => null}
        >
          {renderMenuItems()}
        </Select>
      </div>
    </div>
  );
};

export default BorderFilter;