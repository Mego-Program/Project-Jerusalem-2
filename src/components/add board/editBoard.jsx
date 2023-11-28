import EditIcon from '@mui/icons-material/Edit';
import ModalEdit from './modalEdit';
import { useEffect, useState } from 'react';
import axios from 'axios'
let serverBaseUrl

if (process.env.NODE_ENV === 'development') {
  
    serverBaseUrl = 'http://localhost:3000/';
  } else {
    
    serverBaseUrl = 'https://project-jerusalem-2-server.vercel.app/';
  }



export default function EditBoard(props){
    const [isModalOpen, setModalOpen] = useState(false);
    const [personsExsist,setPersonExsist]=useState(null)
    const edit = () => {    
      setModalOpen(true);
    };
    async function getNames(){
        try {
          const response = await axios.get(`${serverBaseUrl}projects/names/${props.project}`);
          setPersonExsist(response.data)
        } catch (err) {
          console.log('error try to get names:', { err });
        }
    }

    function handleEditBoard(input,namesToAdd,namesToRemove){
        props.func(input,namesToAdd,namesToRemove,props.project)
    }
    useEffect(() => {
        if (isModalOpen) {
            getNames()
        }
      }, [isModalOpen]);
    
      useEffect(() => {
        getNames()
      }, [props.project]);

    const closeModal = () => {
      
  
      setModalOpen(false);
    };

    return(<div>
        <p style={{fontSize:'large', color:'#36B176', display: 'inline', whiteSpace: 'nowrap',cursor:'pointer'}} onClick={edit} ><EditIcon />   Edit board </p>
      <ModalEdit isOpen={isModalOpen} onClose={closeModal} func={handleEditBoard} personsExsist={personsExsist} projectName={props.project}/>
        </div>)
}
