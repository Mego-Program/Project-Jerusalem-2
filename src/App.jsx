import React, { useEffect, useState } from 'react';
import DivFilters from './components/filter-massions-dnd-func-data/ShowFiltersAndMassion';
import BorderFilter from './components/borderFilter';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AddBoard from './components/add board/addBoard';
import axios from 'axios';

function App() {
  
  // states for list boards, current board and data
  const [listBoards,setListBoards]=useState(null)
  const [currentProject,setCurrentProject]=useState(null)
  const [currentData, setCurrentData] = useState(null);

  let serverBaseUrl;

  if (process.env.NODE_ENV === 'development') {
    // אם הקוד רץ בסביבת פיתוח, השתמש בשרת הלוקאלי
    serverBaseUrl = 'http://localhost:3000/';
  } else {
    // אחרת, השתמש בשרת הרשמי
    serverBaseUrl = 'https://project-jerusalem-2-server.vercel.app/';
  }

  useEffect(() => {
    const getDataBoards = async () => {
      console.log('Wait for the data to load');
      try {
        const response = await axios.get(`${serverBaseUrl}projects/listOfProjects`);
        setListBoards(response.data);
        setCurrentProject(listBoards[0])
      } catch (error) {
        console.log('List not loading:', error);
      }
    };
    getDataBoards();
  }, []);

  useEffect(() => {
    // start the currwnt board an the first one 
    const firstBoard =  'Project_A'
    setCurrentProject(firstBoard)
    async function fetchData() {
      try {
        const response = await axios.get(`${serverBaseUrl}projects/${currentProject}`);
        setCurrentData(response.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    }

    if (firstBoard !== null) {
      fetchData();
    }
  }, [listBoards]);

  if (currentData === null || listBoards === null) {
    return <div>Loading...</div>;
  }

  async function fetchProjectData(projectName) {
    try {
      const response = await axios.get(`${serverBaseUrl}projects/${projectName}`);
      setCurrentData(response.data);
      setCurrentProject(projectName);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  }

  async function addBoard(name) {
    try {
      const response = await axios.post(`${serverBaseUrl}projects/addNewProject`, { name });
      return response.data;
    } catch (error) {
      console.error('Error adding new project:', error);
      throw error;
    }
  }

  async function addBoard1(name) {
    try {
      const result = await addBoard(name);
      console.log('Project added successfully:', result);
    } catch (error) {
      console.error('Error adding project:', error.message);
    }
  }

  return (
    <div>
      <BorderFilter onProjectChange={fetchProjectData} listProjects={listBoards} />
      <AddBoard func={addBoard1}/>
      <DndProvider backend={HTML5Backend}>
        <DivFilters projectData={currentData} collection={currentProject} />
      </DndProvider>
    </div>
  );
}

export default App;
