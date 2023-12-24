import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import { useAtom } from "jotai";
import { atomUrl } from "../../Atoms";
import axios from "axios";

function SprintComponent({ sprintName, projectName }) {
  const [remainingTime, setRemainingTime] = useState("Calculating...");
  const [endDate, setEndDate] = useState(null);
  const [url, setUrl] = useAtom(atomUrl);
  const [showMinutes, setShowMinutes] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function getDate() {
      try {
        const response = await axios.get(
          `${url}sprints/getdate/${sprintName}/${projectName}`
        );
        const data = response.data;
        const endDateAsDate = new Date(data);

        if (isMounted) {
          setEndDate(endDateAsDate);
          setRemainingTime("Calculating...");
        }
      } catch (e) {
        console.log("error try get date:", e);
      }
    }

    getDate();

    return () => {
      isMounted = false;
    };
  }, [projectName, sprintName, url, showMinutes]);

  useEffect(() => {
    if (!endDate) {
      return;
    }

    const updateRemainingTime = () => {
      const now = new Date();
      const endDateTime = endDate;

      const timeDifference = endDateTime - now;
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      if (!showMinutes&&days!==0) {
        setRemainingTime(`${days} days`);
      } else {
        setRemainingTime(`${days} days ${hours} hours ${minutes} minutos ${seconds}s`);
      }

      if (timeDifference <= 0) {
        setRemainingTime("Sprint Ended");
      }
    };

    updateRemainingTime();

    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [endDate, showMinutes]);

  return (
    <Box 
    width={'50%'}
    padding={1} 
    mt={5}
    sx={{color:'white', display: "flex", alignItems: "center", cursor: "pointer",  backgroundColor:'#343476', borderRadius:25}}>
      <TimerIcon style={{ marginRight: "8px" }} />
      <Typography
        variant="subtitle1"
        onClick={() => setShowMinutes((prev) => !prev)}
      >
        Sprint ends in: {remainingTime}
      </Typography>
    </Box>
  );
}

export default SprintComponent;
