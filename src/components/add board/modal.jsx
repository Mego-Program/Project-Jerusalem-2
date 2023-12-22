import React, { useState } from 'react';
import './modal.css'
import MultipleSelect from './choosePerson';
import TextField from '@mui/material/TextField';
import MultipleSelectSpec from './chooseSpecs';
import {Container,Button} from '@mui/material'

export default function Modal1({ isOpen, onClose ,func}) {
  const [inputText, setInputText] = useState('');
  const [selected,setSelected]=React.useState([])
  const [selectedSpec,setSelectedSpec]=React.useState([])


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
    overfllow:'auto'
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const getTextAndNames = () => {

    func(inputText,selected,selectedSpec)
    setInputText('')
    onClose()
    

  };
  
function handleChoose(listPerson){
    setSelected(listPerson)
}
function handleChooseSpec(listSpec){
  setSelectedSpec(listSpec)
}


  return isOpen ? (

    <div style={overlayStyle}>
    <div style={modalStyle}>
      <Container sx={modalStyle}>
    <TextField id="outlined-basic" label="Project name" variant="outlined" placeholder='Project name'  
     onChange={handleInputChange} value={inputText}
     InputLabelProps={{
        style: {
          color: 'white', 
        },
      }} sx={{background:'#343476', width:'49vw',borderRadius:'8px','& input': {
        color: 'white', 
      },
      }} /> 
 
      <MultipleSelect choosePersones={handleChoose}/>
    <MultipleSelectSpec chooseSpecs={handleChooseSpec}/>
     
      <div className='btns' >
      <Button onClick={getTextAndNames}>Create</Button>
      <Button onClick={()=>{setInputText('');onClose()}} style={{marginLeft:'3vw'}}>Cancel</Button>
      </div>
      </Container>
    </div>
 
  </div>
   ) : null;
  
}