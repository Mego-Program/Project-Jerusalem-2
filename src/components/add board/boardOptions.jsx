import AddBoard from "./addBoard";
import DeleteBoard from "./DeleteBoard";
import EditBoard from "./editBoard";
import './boardoptions.css'
import {Paper} from '@mui/material'
import {Container} from '@mui/material'
import axios from "axios";
import ModalSprint from "./modalSprints";
import AddSprint from "./addSprint";

export default function BoardOptions(props){
return (
    <Container fixed className="options" sx={ {display:'flex',justifyContent:'space-between',
 background:'none', boxShadow:'none', maxWidth:'100vw' }}>
    
        <AddBoard func ={props.addfunc}/>
        {props.projectName!=='no project found'&&<AddSprint currentProject={props.projectName} func={props.addSprint}/>}
        
        {props.projectName!=='no project found'&&<EditBoard func = {props.editFunc} project={props.projectName}/>}
        
        {props.projectName!=='no project found'&&<DeleteBoard deleteFunc={props.deleteBoardFunc} project={props.projectName}/>}
  </Container>
)
}