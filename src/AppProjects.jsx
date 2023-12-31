import React, { useEffect, useState } from "react";
import DivFilters from "./components/filter-massions-dnd-func-data/ShowFiltersAndMassion";
import BorderFilter from "./components/borderFilter";
import BoardOptions from "./components/add board/boardOptions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import { userNameAtom, atomUrl } from "./Atoms";
import { useAtom } from "jotai";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AlertUp from "./components/AlertComponent";

import "./App.css";

function AppProjects() {
  const [userName, setUserName] = useAtom(userNameAtom);
  const [url, setUrl] = useAtom(atomUrl);
  const [listBoards, setListBoards] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentData, setCurrentData] = useState([]);
  const [addedBoard, setAddedBoard] = useState(null);
  const [dataSprint, setDataSprint] = useState([]);
  const [raisAlert, setRaisAlert] = useState('');
  const[type,setType] = useState('warning')

  useEffect(() => {
    if (addedBoard !== null) {
      fetchProjectData(addedBoard);
    }
    getDataBoards();
  }, [addedBoard]);

  useEffect(() => {
    if (addedBoard === null) {
      if (listBoards && listBoards.length > 0) {
        const firstBoard = listBoards[0];
        setCurrentProject(firstBoard);
      } else if (listBoards && listBoards.length === 0) {
        setCurrentProject("no project found");
      }
    } else {
      setCurrentProject(addedBoard);
    }
  }, [listBoards]);

  useEffect(() => {
    if (currentProject !== null) {
      fetchData();
    }
  }, [currentProject]);

  useEffect(() => {
    setDataSprint(currentData);
  }, [currentData]);

  const getDataBoards = async () => {
    console.log("Wait for the data to load");
    try {
      const response = await axios.post(`${url}projects/listofprojects/`, {
        userName,
      });
      setListBoards(response.data);
    } catch (error) {
      if (error.response.data.auth === false) {
        setRaisAlert('Login First')
      }
      console.log("List not loading:", error);
    }
  };

  async function fetchData() {
    if (currentProject === "no project found") {
      setCurrentData([]);
      return;
    }
    try {
      const response = await axios.get(`${url}missions/${currentProject}`);
      setCurrentData(response.data);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  }

  async function fetchProjectData(projectName) {
    try {
      setCurrentProject(projectName);
      fetchData();
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  }
  async function addSprint(name, endDate, list) {
    if (currentProject === "no project found") {
      setRaisAlert('Create first project');
      return;
    };
    if (name === "") {
      setRaisAlert('Please enter name')
      return;
    }
    try {
      const response = await axios.post(`${url}sprints/`, {
        name,
        currentProject,
        userName,
        endDate,
      });
      if (response.status === 403) {
        setRaisAlert('Login First')
        return;
      }
    } catch (error) {
      console.error("Error adding new project:", error);
      return;
    }
    try {
      const response = await axios.put(`${url}sprints/`, { list });
    } catch (error) {
      console.log("error try add missions to sprint", error);
    }
    setAddedBoard(name);
    setCurrentProject(name);
    fetchData();
  }


  async function addBoard(name, names, specs, endDate) {
    if (name === "") {
      setRaisAlert('please enter name')
      return;
    }
    try {
      const response = await axios.post(`${url}projects/`, {
        name,
        names,
        specs,
        userName,
        endDate,
      });
      if (response.status === 403) {
        alert("Login first");
        return;
      }
      setAddedBoard(name);
      setCurrentProject(name);
      fetchData();
    } catch (error) {
      console.error("Error adding new project:", error);
      throw error;
    }
  }
  async function addSprint(input, missions, projectName, endDate) {
    if (currentProject === "no project found") {
        setRaisAlert('create first board');
      return;
    }
    const data = {
      name: input,
      missions: missions,
      currentProject: projectName,
      userName: userName,
      endDate: endDate,
    };
    try {
      const response = await axios.post(`${url}sprints/`, data);
      setCurrentProject(currentProject);
    } catch (err) {
      console.log("error try add sprint:", err);
    }
  }

  async function editBoard(
    input,
    namesToAdd,
    namesToRemove,
    projectName,
    specsToAdd,
    specsToRemove
  ) {
    if (currentProject === "no project found") {
        setRaisAlert('create first board');
      return;
    }
    if (
      !input &&
      namesToAdd.length === 0 &&
      namesToRemove.length === 0 &&
      specsToAdd === 0 &&
      specsToRemove === 0
    ) {
      return;
    }
    try {
      const response = await axios.put(`${url}projects/`, {
        input,
        namesToAdd,
        namesToRemove,
        projectName,
        specsToAdd,
        specsToRemove,
        userName,
      });
      setAddedBoard("");
      if (input !== "") {
        setAddedBoard(input);
        setCurrentProject(input);
      } else {
        setAddedBoard(projectName);
        setCurrentProject(projectName);
      }
      fetchData();
    } catch (error) {
      console.log("Error while editing:", error);
      if (error.message.includes("403")) {
        setRaisAlert('you dont have the premission to delete this board');
      }
    }
  }

  async function deleteBoard(projectName) {
    if (currentProject === "no project found") {
      return;
    }
    try {
      console.log("Deleting");
      const response = await axios.delete(`${url}projects/`, {
        params: { projectName, userName },
      });
      setAddedBoard(
        listBoards[0] !== projectName ? listBoards[0] : listBoards[1]
      );
    } catch (error) {
      console.log(error);
      if (error.message.includes("403")) {
        setRaisAlert('you dont have the premission to delete this board');
      }
    }
  }

  if (currentData === null || listBoards === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Collapse in={raisAlert!==''}><AlertUp
       type={type} text={raisAlert}
       onClose={()=>setRaisAlert('')}/></Collapse>
      <BorderFilter
        onProjectChange={fetchProjectData}
        listProjects={listBoards}
        newboard={addedBoard}
      />
      <BoardOptions
        addfunc={addBoard}
        addSprint={addSprint}
        editFunc={editBoard}
        deleteBoardFunc={deleteBoard}
        projectName={currentProject}
      />
      <DndProvider backend={HTML5Backend}>
        <DivFilters projectData={currentData} collection={currentProject} />
      </DndProvider>
    </div>
  );
}

export default AppProjects;
