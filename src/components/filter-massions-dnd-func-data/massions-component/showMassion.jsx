import Massion from './Massion-card'
import { useDrop } from 'react-dnd';
import './showMassion.css'



export default function Show(props){
    const data=props.datafiltered
    const [{isOver},drop] = useDrop(()=>({
            accept:'MASSION',

            drop:((item)=>{
                props.func(item.id,props.cat)
            }),

            collect:((monitor)=>({
                isOver:!!monitor.isOver()
            }))
    })
    )

    
    // 
    const sum = data.length
    const colorset = {'In Progress':'#3685B1','Not Started':'#36B176','Completed':'#EE786C'}
    return(
    
       <div className='container status-column'  ref={drop}>
        <div className='header'>
        <div className='circle' style={{background:colorset[props.cat]}}/>
        {props.cat}
        <div className='sum-massion'>{sum}</div>
        </div>
        {data.map((prop,index)=>
        <div key={index} className={`massion ${name+index}`}>
           <Massion obj={prop}/>
            </div>
    )}
    </div>)
}