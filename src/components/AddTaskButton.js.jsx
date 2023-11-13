// AddTaskButton.js

import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function AddTaskButton({ onAddTask }) {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskName('');
  };

  const handleAddTask = () => {
    // Validate taskName (make sure it's not empty)
    if (taskName.trim() === '') {
      // Display an error message, you can implement it as you see fit
      alert('Task name cannot be empty!');
      return;
    }

    // Close the dialog
    handleClose();

    // Pass the new task to the parent component
    onAddTask(taskName);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Name"
            type="text"
            fullWidth
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTask}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTaskButton;
