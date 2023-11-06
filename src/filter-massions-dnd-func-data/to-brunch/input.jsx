import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './input.css'



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const customStyles = {
    select: {
       // Change background color
      
    },
    menuItem: {
      svg:{ color:'white'},
      fieldset: {border: 'none'},
      maxHeight: '3.17vh', // Change the height of menu items
      Width:'19.9vw',
      background: '#121231',
      color:'white',
      
    },
  };


export default function Inp(props) {
    const names = props.lstOptions
  // const theme = useTheme();
  const [filternName, setFilterName] = React.useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if(value.length!==0){
    setFilterName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
      props.func(props.filters,value,props.type)
    )}
    else{
      setFilterName('')
      props.func(props.filters,value,props.type)
    }
console.log(value);
    
  };

  return (
    <div className='div-filter' style={{minHeight:'6.12vh'}}>
      <p style={{ color:'white'}}>{props.name}</p>
      <FormControl sx={{ mr: 2, ml:-1, width: 352, mt: 0}}>
        <Select 
          displayEmpty
          value={filternName}
          onChange={handleChange}
          input={<OutlinedInput sx={customStyles.menuItem} />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{props.name}</em>;
            }
            return selected.join(', ');
          }}
          
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          
        >
          <MenuItem value="" >{props.name}</MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={customStyles.menuItem}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

// export default function Inp(props){




//     return(
//         <input
//         type="text"
//         placeholder={`Filter by ${props.type}`}
//         onChange={(e)=>props.func(props.filters,e.target.value,props.type)
//         }
//       />

//     )
// }console.log(event.target.value[0]);