import EditIcon from '@mui/icons-material/Edit';


export default function EditBoard(){

function edit(){
    
}
    return(<div>
        <p style={{fontSize:'large', color:'#36B176', display: 'inline', whiteSpace: 'nowrap',cursor:'pointer'}} onClick={edit} ><EditIcon />   Edit board </p>
        </div>)
}