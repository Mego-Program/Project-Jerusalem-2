import React from 'react';
import Modal1 from './modal';
import { useState } from 'react';

    
    export default function AddBoard(props){
        const [isModalOpen, setModalOpen] = useState(false);
        const PlusIcon = () => (
          <svg
          style={ {cursor:'pointer'}}
          color='#36B176'
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
          style={ {cursor:'pointer'}}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
          
        </svg>
      );
       

  const addNewBoard = () => {
    // Handle the click event and toggle the modal state
    setModalOpen(true);
  };
  function handleNewBoard(input){
    props.func(input)
  }

  const closeModal = () => {
    // Close the modal by setting the modal state to false
    setModalOpen(false);
  };
      return(<div >
          <p style={{fontSize:'large', color:'#36B176', display: 'inline', whiteSpace: 'nowrap',cursor:'pointer'}} onClick={addNewBoard} ><PlusIcon  />   Add New Board </p>
          <Modal1 isOpen={isModalOpen} onClose={closeModal} func = {handleNewBoard} />
      </div>
    );}