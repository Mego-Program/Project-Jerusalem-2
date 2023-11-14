import React, { useState } from 'react';
import './modal.css'

export default function Modal1({ isOpen, onClose ,func}) {
  const [inputText, setInputText] = useState('');
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.7)', // Adjust the transparency here
    zIndex: 998, // Place it behind the modal (one layer below)
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
    width:'20vw',
    height:'15vh',
    borderRadius:'10px'
    
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const getText = () => {
    func(inputText)
    setInputText('')
    onClose()
    // You can use the inputText state wherever you need it
  };

  return isOpen ? (

    <div style={overlayStyle}>
    <div style={modalStyle}>
      {/* Your modal content goes here */}
      <input type="text" value={inputText} onChange={handleInputChange} placeholder='Project name' style={{background:'#343476'}}/>
      <div className='btns'>
      <button onClick={getText}>Create</button>
      <button onClick={()=>{setInputText('');onClose()}} style={{marginLeft:'3vw'}}>Cancel</button>
      </div>
    </div>
 
  </div>
   ) : null;
  
}

