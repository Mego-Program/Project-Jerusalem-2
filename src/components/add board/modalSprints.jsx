import React, { useState } from 'react';
import './modal.css'
import MultipleSelect from './choosePerson';
import TextField from '@mui/material/TextField';
import MultipleSelectSpec from './chooseSpecs';
import {Container,Box,Typography,Button} from '@mui/material'
import MultipleSelectMission from './chooseMission';
import DateSelector from '../filter-massions-dnd-func-data/due-date/DatePicker';

export default function ModalSprint({ isOpen, onClose ,func,currentProject}) {
  const [inputText, setInputText] = useState('');
  const [selected,setSelected]=React.useState([])
  const [endDate,setEndDate] = React.useState(()=>{const currentDate = new Date();return currentDate.toLocaleDateString()})


  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.7)', 
    zIndex: 998, 
  };
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    background: 'rgb(16, 16, 95)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: 999,
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width:'55vw',
    height:'50vh',
    borderRadius:'10px',
    justifyContent:'space-between',
    overflow:'auto'
  };

function dateFunc(a,b,date){
setEndDate(date)
}

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const getTextAndNames = () => {
    func(inputText,selected,currentProject,endDate)
    setInputText('')
    onClose()
    

  };
  
function handleChoose(listPerson){
    setSelected(listPerson)
}

  return isOpen ? (

    <div style={overlayStyle}>
    <div style={modalStyle}>
      <Container sx={modalStyle}>
    <TextField id="outlined-basic" label="Sprint name" variant="outlined" placeholder='Sprint name'  
     onChange={handleInputChange} value={inputText}
     InputLabelProps={{
        style: {
          color: 'white', 
        },
      }} sx={{background:'#343476', width:'49vw',borderRadius:'8px','& input': {
        color: 'white', 
      },
      }} /> 
 
      <MultipleSelectMission chooseMissions={handleChoose} currentProject={currentProject}/>
     <Box alignContent={'space-around'} display={'flex'} justifyContent={'space-around'} sx={{ width: '49vw', background: '#343476', color: 'white',borderRadius:'8px' }}>
      <Typography ml={-15} variant='h6' color={'white'} marginTop={1} >deadline</Typography>
     <DateSelector Func = {dateFunc} date={endDate}></DateSelector>
     </Box>
      <div className='btns' >
      <Button onClick={getTextAndNames}>Create</Button>
      <Button onClick={()=>{setInputText('');onClose()}} style={{marginLeft:'3vw'}}>Cancel</Button>
      </div>
      </Container>
    </div>
 
  </div>
   ) : null;
  
}