// addBoard.js
import React from 'react';
import ModalSprint from './modalSprints';
import { useState } from 'react';
import axios from 'axios'; 
export default function AddSprint(props) {
  
  const [isModalOpen, setModalOpen] = useState(false);

  const PlusIcon = () => (
    <svg
      style={{ cursor: 'pointer' }}
      color="#36B176"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      width="20"
      height="20"
      onClick={addNewBoard}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <path
        style={{ cursor: 'pointer' }}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );

  const addNewBoard = () => {

    
    setModalOpen(true);
  };
  function handleNewSprint(input,missions,projectName,endDate){
    props.func(input,missions,projectName,endDate)
  }

  const closeModal = () => {
    

    setModalOpen(false);
  };

  return (
    <div>
      <p style={{ fontSize: 'large', color: '#36B176', display: 'inline', whiteSpace: 'nowrap', cursor: 'pointer' }} onClick={addNewBoard}>
        <PlusIcon /> Add New Sprint
      </p>
      <ModalSprint isOpen={isModalOpen} onClose={closeModal} func={handleNewSprint} currentProject={props.currentProject}/>
    </div>
  );
}
