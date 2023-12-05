import AddBoard from "./addBoard";
import DeleteBoard from "./DeleteBoard";
import EditBoard from "./editBoard";
import './boardoptions.css'
import {Paper} from '@mui/material'
import {Container} from '@mui/material'
import axios from "axios";

export default function BoardOptions(props){
return (
    <Container fixed className="options" sx={ {display:'flex',justifyContent:'space-between',
 background:'none', boxShadow:'none', maxWidth:'100vw' }}>
    
        <AddBoard func ={props.addfunc}/>
        
        <EditBoard func = {props.editFunc} project={props.projectName}/>
        <div className="a">
        <DeleteBoard deleteFunc={props.deleteBoardFunc} project={props.projectName}/></div>
    </Container>
)
}