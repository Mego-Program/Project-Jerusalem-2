import React, { useState, useRef } from 'react';
import { Avatar, List, ListItem, ListItemText, Modal, Typography, createTheme, ThemeProvider, Paper } from '@mui/material';
import '../massions-component/showMassion.css';





const AssigneeSelector = (props) => {


    const names = props.names
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  const handleOpen = (event) => {
    setIsOpen(true);
    setPosition({
      top: event.clientY,
      left: event.clientX,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    
    
  };


  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#121230', 
        
      },
      secondary: {
        main: '#121230', 
      },
    },
    
  });
  return (
    <ThemeProvider theme={theme}>
      <div >
        <Avatar style={{cursor:'pointer'}} onClick={handleOpen} src={props.src} alt='not found'></Avatar>
        <Modal
          open={isOpen}
          onClose={handleClose}
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            maxWidth: 170,
          }}
        

        >
          <Paper
            className='container'
            ref={containerRef}
            style={{
              padding: '16px',
              maxHeight: 200,
              overflow: 'auto', 
              background: '#121230',
              outline:0
            }}
            onMouseLeave={handleMouseLeave}
          >
            <List>
              <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                Assign to:
              </Typography>
              {names.map((person,i) => (
                // when the names list will be object remined to add fields to person
                <ListItem key={i} button onClick={(e)=>{props.funcChange(person,props.missionId);handleClose()}}>
                  <Avatar sx={{ mr: 3, cursor:'pointer'  }} />
                  <ListItemText primary={person.name} style={{ color: 'white' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default AssigneeSelector;