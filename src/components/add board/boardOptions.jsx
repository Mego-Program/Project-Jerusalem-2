import AddBoard from "./addBoard";
import DeleteBoard from "./DeleteBoard";
import EditBoard from "./editBoard";
import './boardoptions.css'

export default function BoardOptions(props){
return (
    <div className="options">
        <AddBoard func ={props.addfunc}/>
        <EditBoard func = {props.editFunc} project={props.projectName}/>
        <DeleteBoard deleteFunc={props.deleteBoardFunc} project={props.projectName}/>
    </div>
)
}