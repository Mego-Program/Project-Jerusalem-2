import React, { useEffect, useState } from 'react';
import DivFilters from './components/filter-massions-dnd-func-data/ShowFiltersAndMassion';
import BorderFilter from './components/borderFilter';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AddBoard from './components/add board/addBoard';
import axios from 'axios';


function App() {

  // consider make new collection for the assignee options
  // states for list boards, current board and data
  const [listBoards,setListBoards]=useState(null)
  const [currentProject,setCurrentProject]=useState(null)
  const [currentData, setCurrentData] = useState(null);
  const [names,setNames] = useState([])
  

  let serverBaseUrl;

  if (process.env.NODE_ENV === 'development') {
    // אם הקוד רץ בסביבת פיתוח, השתמש בשרת הלוקאלי
    serverBaseUrl = 'http://localhost:3000/';
  } else {
    // אחרת, השתמש בשרת הרשמי
    serverBaseUrl = 'https://project-jerusalem-2-server.vercel.app/';
  }
// use effect until names of boards load
  useEffect(() => {
    const getDataBoards = async () => {
      console.log('Wait for the data to load');
      try {
        const response = await axios.get(`${serverBaseUrl}projects/listOfProjects`);
        setListBoards(response.data);
        
      } catch (error) {
        console.log('List not loading:', error);
      }
    };
    getDataBoards();
  }, []);

// use effect until current board can declare
  useEffect(() => {
    if (listBoards && listBoards.length > 0) {
      const firstBoard = listBoards[0];
      setCurrentProject(firstBoard);
    }
  }, [listBoards]);

  // use effect every changes in board
  useEffect(() => {
    if (currentProject !== null) {
      fetchData();
    }
  }, [currentProject]);
  
  async function fetchData() {
    try {
      const response = await axios.get(`${serverBaseUrl}projects/${currentProject}`);
      setCurrentData(response.data);
      async function getNames() {
        try {
          const response = await axios.get(`${serverBaseUrl}projects/names`);
          setNames(response.data);
        } catch (err) {
          console.log('error try to get names:', { err });
        }
      }
      getNames();
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  }

  if (currentData === null || listBoards === null||names.length===0) {
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
        <DivFilters projectData={currentData} collection={currentProject} names = {names} />
      </DndProvider>
    </div>
  );
}

export default App;
