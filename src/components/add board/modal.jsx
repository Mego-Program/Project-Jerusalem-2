import React, { useState } from 'react';
import './modal.css'
import MultipleSelect from './choosePerson';

export default function Modal1({ isOpen, onClose ,func}) {
  const [inputText, setInputText] = useState('');
  const [selected,setSelected]=React.useState([])

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
    height:'35vh',
    borderRadius:'10px',
    justifyContent:'space-between',
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const getTextAndNames = () => {
    func(inputText,selected)
    setInputText('')
    onClose()
    
  };
function handleChoose(listPerson){
    setSelected(listPerson)
}


  return isOpen ? (

    <div style={overlayStyle}>
    <div style={modalStyle}>
      <input type="text" value={inputText} onChange={handleInputChange} placeholder='Project name'  style={{background:'#343476', }} />
      <div>
      <MultipleSelect choosePersones={handleChoose}/>
      </div>
      <div className='btns' >
      <button onClick={getTextAndNames}>Create</button>
      <button onClick={()=>{setInputText('');onClose()}} style={{marginLeft:'3vw'}}>Cancel</button>
      </div>
    </div>
 
  </div>
   ) : null;
  
}