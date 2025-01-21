import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { useTaskContext, Task } from '../TaskContext/TaskContext';

const AddTask: React.FC = () => {
  const { dispatch } = useTaskContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [success, setSuccess] = useState(false);

  const handleAddTask = () => {
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      priority,
      status: 'Pending',
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
    setSuccess(true);

    // Reset form fields
    setTitle('');
    setDescription('');
    setPriority('Low');
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Add New Task
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />
      <TextField
        select
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </TextField>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleAddTask}
      >
        Add Task
      </Button>
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Task added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddTask;
