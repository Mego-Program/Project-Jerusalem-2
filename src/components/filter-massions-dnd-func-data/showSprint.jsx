import axios from 'axios'
import {useAtom} from 'jotai'
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Paper,Box } from "@mui/material";
import { atomUrl } from '../../Atoms';



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

export default function SelectSprint({currentProject,showSprint,regularBoard}) {

  const [sprints, setSprints] = React.useState([]);
  const [sprint, setSprint] = React.useState('');
  const [url,setUrl] = useAtom(atomUrl)

  React.useEffect(()=>{
    if(currentProject==='no project found'){return}
  async function getSprints() {
    try{
        const response = await axios.get(`${url}sprints/${currentProject}`)
        const data = await response.data;
        setSprints(data)
    }catch(e){console.log('error try get sprints',e);}
  }
  getSprints()
},[currentProject,])


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSprint(value);
    showSprint(value);
  };

  return (
    <Paper className='div-filter' style={{ minHeight: '6.12vh', background:'none' }}>
        <Box display={'flex'} justifyContent={'space-between'}>
      <p style={{ color: 'white' }}>sprints</p>
      <p style={{color:'white', cursor:'pointer'} } onClick={regularBoard} >regular board</p>
      </Box>
      <FormControl sx={{ width:'100%'}}>
        <Select
          displayEmpty
          value={sprint}
          onChange={handleChange}
          input={<OutlinedInput sx={customStyles.menuItem} />}
          renderValue={(selected) => {
            if (!selected) {
              return <em>sprints</em>;
            }
            return selected;
          }}
          
          MenuProps={{
            PaperProps: {
              style: customStyles.dropdownMenu,
            },
          }}
        >
          {sprints.map((sprint,index) => (
            <MenuItem key={index} value={sprint.name} style={customStyles.menuItem}>
              {sprint.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}