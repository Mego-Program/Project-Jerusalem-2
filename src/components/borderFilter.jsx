import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import './borderFilter.css';


const borderFilterStyles = {
  position: 'absolute',
  width: '100%',
  height: '83px',
  top: '242px',
  background: '#21213E', 
  boxShadow: '0px 20px 70px rgba(86, 89, 146, 0.1)',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',
};

const displayStyles = {
  fontFamily: 'Poppins',
  fontWeight: 600,
  fontSize: '23px',
  lineHeight: '34.5px',
  color: '#FFFFFF', 
  order: 1, 
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

const teams = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];

const BorderFilter = () => {
  const [selectedTeam, setSelectedTeam] = useState('Team A');
  const [anchorEl, setAnchorEl] = useState(null);

  const dropdownMenuStyles = {
    backgroundColor: '#121231',
  };

  return (
    <div style={borderFilterStyles}>
      <div style={displayStyles}>
         {selectedTeam}
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
          sx={selectStyles}
          anchorEl={anchorEl}
          MenuProps={{ PaperProps: { style: dropdownMenuStyles } }}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          {teams.map((team) => (
            <MenuItem key={team} value={team}>
              {team}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default BorderFilter;