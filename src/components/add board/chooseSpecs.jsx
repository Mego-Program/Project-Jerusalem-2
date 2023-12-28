import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import './choosePerson.css';
import { Avatar, Box, Typography } from '@mui/material';
import axios from 'axios';
import { atomUrl } from '../../Atoms';
import {useAtom} from 'jotai'


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultipleSelectSpec({ chooseSpecs, specExist ,remove}) {
  const [options, setOptions] = React.useState([]);
const [url,setUrl] = useAtom(atomUrl)
const [load,setLoad]=React.useState(true)

  React.useEffect(() => {
    async function fetchData(){
        try {
          const response = await axios.get(`${url}spec/getspecs`);
          setOptions(response.data)
        } catch (err) {
          console.log('error try to get names:', { err });
        }
        finally{setLoad(false)}
    }
    fetchData();
  }, []);

  function handleCheck(event, value) {
    chooseSpecs(value);
  }


  const isOptionEqualToValue = (option, value) => specExist.some(
    (spec) => spec._id===option._id)
  return (
    <Autocomplete
    
    sx={{mb:'3px','& input': {
      color: 'white', 
    },}}
      multiple
      id="checkboxes-tags-demo"
      options={remove?specExist:options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      
      getOptionDisabled={specExist&&!remove?isOptionEqualToValue:null}
      renderOption={(props, option) => (
  
        <li {...props}>
          
          
          <Checkbox
          
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={specExist&&!remove?specExist.some(
                (spec) => spec._id===option._id
            ):option.selected}
          />
          
          
          <Box display="flex" alignItems="center">
            <Typography variant="body2">{option.title}</Typography>
          </Box>
          
        </li>
      )}
      onChange={handleCheck}
      style={{ width: '49vw', background: '#343476', color: 'white',borderRadius:'8px' }}
      renderInput={(params) => (
        <TextField {...params} label={remove?'Remove Specs':'Connect more Specs'} placeholder="search for spec" style={{ color: 'white' ,}} InputLabelProps={{style: {color: 'white'}}}/>
      )}
      loading={load}
      loadingText={'loading specs...'}
    />
  );
}
