import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import './choosePerson.css';
import { Avatar, Box, Typography } from '@mui/material';
import axios from 'axios';
import {atomUrl} from '../../userNameAtom';
import {useAtom} from 'jotai'



const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultipleSelect({ choosePersones, personsExsist ,remove}) {
  const [options, setOptions] = React.useState([]);
  const [url,setUrl]= useAtom(atomUrl)
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${url}projects/allNames`)
        setOptions(response.data);
      } catch (err) {
        console.log('Error getting names', err);
      }
    }
    fetchData();
  }, []);

  function handleCheck(event, value) {
    choosePersones(value);
  }


  const isOptionEqualToValue = (option, value) => personsExsist.some(
    (person) => person.userName === option.userName)
  return (
    <Autocomplete
    
    sx={{mb:'3px','& input': {
      color: 'white', 
    },}}
      multiple
      id="checkboxes-tags-demo"
      options={remove?personsExsist:options}
      disableCloseOnSelect
      getOptionLabel={(option) =>  `${option.firstName} ${option.lastName} (${option.userName})`}
      
      getOptionDisabled={personsExsist&&!remove?isOptionEqualToValue:null}
      renderOption={(props, option) => (
        <li {...props}>
          <Checkbox
          
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={personsExsist&&!remove?personsExsist.some(
              (person) => person.userName === option.userName
            ):option.selected}
          />
          <Box display="flex" alignItems="center">
            <Avatar src={option.pic} alt={option.lastName} sx={{ mr: 1, height: '5vh', width: '5vh' }} />
            <Typography variant="body2">{`${option.firstName} ${option.lastName}`}</Typography>
          </Box>
        </li>
      )}
      onChange={handleCheck}
      style={{ width: '49vw', background: '#343476', color: 'white',borderRadius:'8px' }}
      renderInput={(params) => (
        <TextField {...params} label={remove?'Remove Names':'Add Names'} placeholder="search for name" style={{ color: 'white' ,}} InputLabelProps={{style: {color: 'white'}}}/>
      )}
    />
  );
}
