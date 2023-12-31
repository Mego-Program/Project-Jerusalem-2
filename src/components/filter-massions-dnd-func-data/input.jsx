import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './input.css';
import { Paper } from "@mui/material";



const customStyles = {
 
  menuItem: {
    svg: { color: 'white' },
    fieldset: { border: 'none' },
    maxHeight: '5.17vh', 
    width: '100%',
    background: '#121231',
    color: 'white',

fontSize: '14px',
fontWeight: '300',
lineHeight: '21px',
textAlign: 'left',

  },
  dropdownMenu:{
    background:'#121231'
  }
};

export default function Inp(props) {
  const names = props.lstOptions;

  const [filterName, setFilterName] = React.useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setFilterName(value);
    props.func(value, props.type);
  };

  return (
    <Paper className='div-filter' style={{ minHeight: '6.12vh', background:'none' }}>
      <p style={{ color: 'white' }}>{props.name}</p>
      <FormControl sx={{ width:'100%'}}>
        <Select
          displayEmpty
          value={filterName}
          onChange={handleChange}
          input={<OutlinedInput sx={customStyles.menuItem} />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{props.name}</em>;
            }
            return selected;
          }}
          
          MenuProps={{
            PaperProps: {
              style: customStyles.dropdownMenu,
            },
          }}
        >
          <MenuItem value=''>
            <em>{'all'}</em>
          </MenuItem>
          {names.map((name,index) => (
            <MenuItem key={index} value={name} style={customStyles.menuItem}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}