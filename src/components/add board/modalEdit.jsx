import React, { useState } from 'react';
import './modal.css'
import MultipleSelect from './choosePerson';
import TextField from '@mui/material/TextField';
import MultipleSelectSpec from './chooseSpecs';



export default function ModalEdit({ isOpen, onClose ,func,personsExsist,projectName,specExist}) {
  const [inputText, setInputText] = useState('');
  const [selected,setSelected]=React.useState([])
  const [selectedRemove,setSelectedRemove]=React.useState([])
  const [selectedSpec,setSelectedSpec]=React.useState([])
  const [selectedRemoveSpec,setSelectedRemoveSpec]=React.useState([])
  

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
    width:'50vw',
    height:'60vh',
    borderRadius:'10px',
    justifyContent:'space-between',
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const getTextAndNames = () => {
    func(inputText,selected,selectedRemove,selectedSpec,selectedRemoveSpec)
    setInputText('')
    onClose()
    
  };
function handleChoose(listPerson){
    setSelected([...listPerson])
}
function handleChoose1(listPerson){
    setSelectedRemove([...listPerson])
}
function handleChooseSpec(listSpec){
  setSelectedSpec([...listSpec])
}
function handleChooseSpec1(listSpec){
  setSelectedRemoveSpec([...listSpec])
}






  return isOpen ? (

    <div style={overlayStyle}>
    <div style={modalStyle}>
    <TextField id="outlined-basic" label="Project name" variant="outlined" placeholder={projectName? projectName:'Project name'}
     onChange={handleInputChange} value={inputText}
     InputLabelProps={{
        style: {
          color: 'white',
        },
      }} sx={{background:'#343476', width:'49vw',borderRadius:'8px','& input': {
        color: 'white', 
      },
      }} /> 
      <div className='selestP'>
      <MultipleSelect choosePersones={handleChoose} personsExsist={personsExsist} />
      <MultipleSelect choosePersones={handleChoose1} personsExsist={personsExsist}  remove={true}/>
      <MultipleSelectSpec chooseSpecs={handleChooseSpec} specExist={specExist}/>
      <MultipleSelectSpec chooseSpecs={handleChooseSpec1}  specExist={specExist} remove={true}/>
      </div>
      <div className='btns' >
      <button onClick={getTextAndNames}>Change</button>
      <button onClick={()=>{setInputText('');onClose()}} style={{marginLeft:'3vw'}}>Cancel</button>
      </div>
    </div>
 
  </div>
   ) : null;
  
}