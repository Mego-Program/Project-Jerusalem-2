import React, { useState } from 'react';

export default function Modal1({ isOpen, onClose ,func}) {
  const [inputText, setInputText] = useState('');

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    background: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: 999,
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
    <div style={modalStyle}>
      {/* Your modal content goes here */}
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={getText}>Create</button>
      <button onClick={()=>{setInputText('');onClose()}}>Cancel</button>
    </div>
  ) : null;
}

