import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './input.css';



const customStyles = {
  select: {
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: '23px',
    lineHeight: '34.5px',
    color: '#FFFFFF',
  },
  menuItem: {
    svg: { color: 'white' },
    fieldset: { border: 'none' },
    maxHeight: '3.17vh', // Change the height of menu items
    width: '19.9vw',
    background: '#121231',
    color: 'white',
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
    props.func(props.filters, value, props.type);
  };

  return (
    <div className='div-filter' style={{ minHeight: '6.12vh', background:'#21213E' }}>
      <p style={{ color: 'white' }}>{props.name}</p>
      <FormControl sx={{ mr: 2, ml: -1, width: 352, mt: 0 }}>
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
            <em>{props.name}</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem key={name} value={name} style={customStyles.menuItem}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}


