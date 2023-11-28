import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './datePicker.css'
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import dayjs from 'dayjs'; 
import { DesktopDatePicker } from '@mui/x-date-pickers';

function DateSelector(props) {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const [selectedDate, setSelectedDate] = React.useState( null); 
  const openDatePicker = (event) => {
    setIsDatePickerOpen(true);
    setPosition({
      top: event.clientY,
      left: event.clientX,
    });
  };
  const isdatevalid = (date) => {
    return (dayjs(date).isAfter(corruntDay(), 'day')||dayjs(date).isSame(corruntDay(), 'day'))
    &&dayjs(date).isValid()
    && dayjs(date).year()<3000;
  };


  const closeDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  const handleDateChange = (date) => {
    if (isdatevalid(date)) {
      setSelectedDate((prevDate) => {
        props.updateTaskFunc(props.id,'deadline',dayjs(date).format('MMMM DD, YYYY'));
        closeDatePicker();
        return dayjs(date);
      });
    } else {
      
      console.error('Invalid date format:', date);
    }
  };
  
  const corruntDay=()=>dayjs()

  return (
    <div>
      <p onClick={openDatePicker} style={{cursor:'pointer'}}>{selectedDate?(dayjs(selectedDate).format('MMMM DD, YYYY')):props.date?props.date:'deadline'}</p>
      {isDatePickerOpen && (
        <Modal
          open={isDatePickerOpen}
          onClose={closeDatePicker}
          aria-labelledby="date-picker-modal"
        >
          <Box
            sx={{
              outline: 0,
              color:'white',
              position: 'absolute',
              top: position.top,
              left: position.left,
              transform: 'translate(-50%, -50%)',
              width: 300,
              fontSize: '30px',
            }}
            onMouseLeave={closeDatePicker}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{background: 'rgb(16, 16, 95)', borderRadius: '8px', color: 'white',"& .MuiInputLabel-root": {
                  color: 'white', 
                },".muiInputLabel":{color:'white'},'& input': {
                  color: 'white'}
                }}
                label={props.date}
                value={selectedDate} 
                shouldDisableDate={(date)=>!isdatevalid(date)}
                onChange={(date) => {
                  if(isdatevalid(date)){
                  handleDateChange(date)}
                }}
                slotProps={{
                  desktopPaper:{sx:{backgroundColor:'rgb(16, 16, 95)',color:'white','& Button':{color:'white'},'& span':{color:'white'} }},
                                  
            
                  
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