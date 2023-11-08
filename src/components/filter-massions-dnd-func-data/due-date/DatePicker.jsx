import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

function DateSelector(props) {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });


  const openDatePicker = (event) => {
    setIsDatePickerOpen(true);
    setPosition({
      top: event.clientY,
      left: event.clientX,
    });
  };
  const modalStyle = {
    border: 'none', // Remove the modal border
  };

  const closeDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  return (
    <div>
      <p onClick={openDatePicker}>{props.date}</p>
      {isDatePickerOpen && (
        <Modal
        
          open={isDatePickerOpen}
          onClose={closeDatePicker}
          aria-labelledby="date-picker-modal"

        >
          <Box
            sx={{

              outline:0,
              position: 'absolute',
              top: position.top,
              left: position.left,
              transform: 'translate(-50%, -50%)',
              width: 300,
              fontSize:'30px'
            }}
            onMouseLeave={closeDatePicker}
          >
            {/* <Typography variant="h6" id="date-picker-modal">
            </Typography> */}
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker
              
              sx={{background:'rgb(16, 16, 95)',borderRadius:'8px',color:'white'}}
                label={props.date}
                value={null}
                onChange={(date) => {
                  // Handle the selected date
                  closeDatePicker();
                }}
              />
            </LocalizationProvider>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default DateSelector;
