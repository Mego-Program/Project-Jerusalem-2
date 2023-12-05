import EditIcon from '@mui/icons-material/Edit';
import ModalEdit from './modalEdit';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { atomUrl } from '../../Atoms';
import {useAtom} from 'jotai'



export default function EditBoard(props){
 const [url,setUrl] = useAtom(atomUrl)
    const [isModalOpen, setModalOpen] = useState(false);
    const [personsExsist,setPersonExsist]=useState(null)
    const [specExist,setSpecExist]=useState(null)
    
    const edit = () => {    
      setModalOpen(true);
    };
    async function getSpec(){
      try {
        const response = await axios.get(`${url}projects/specs/${props.project}`);
        setSpecExist(response.data)
      } catch (err) {
        console.log('error try to get names:', { err });
      }
  }


    async function getNames(){
        try {
          const response = await axios.get(`${url}projects/names/${props.project}`);
          setPersonExsist(response.data)
        } catch (err) {
          console.log('error try to get names spec:', { err });
        }
    }

    function handleEditBoard(input,namesToAdd,namesToRemove,specsToAdd,specsToRemove){
        props.func(input,namesToAdd,namesToRemove,props.project,specsToAdd,specsToRemove)
    }
    useEffect(() => {
        if (isModalOpen) {
            getNames()
            getSpec()
        }
      }, [isModalOpen]);
    
      useEffect(() => {
        getNames()
        getSpec()
      }, [props.project]);

    const closeModal = () => {
      setModalOpen(false);
    };

    return(<div>
        <p style={{fontSize:'large', color:'#36B176', display: 'inline', whiteSpace: 'nowrap',cursor:'pointer'}} onClick={edit} ><EditIcon />   Edit board </p>
      <ModalEdit  isOpen={isModalOpen} onClose={closeModal} func={handleEditBoard} personsExsist={personsExsist} projectName={props.project} specExist={specExist}/>
        </div>)
}
