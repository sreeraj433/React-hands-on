import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Grid,
} from '@mui/material';
import { CheckCircle, Delete } from '@mui/icons-material';
import { useTaskContext } from '../TaskContext/TaskContext';

const Dashboard: React.FC = () => {
  const { state, dispatch } = useTaskContext();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Completed'>('All');

  const filteredTasks = state.tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === 'All' || task.status === statusFilter)
  );

  return (
    <Grid
      container
      direction="column"
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        p: 4,
      }}
    >
      <Grid item>
        <Typography variant="h3" gutterBottom align="center">
          Task Dashboard
        </Typography>
      </Grid>
      <Grid item>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            mb: 3,
          }}
        >
          <TextField
            label="Search Tasks"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TextField
            select
            label="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
        </Box>
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: 2,
            boxShadow: 3,
            p: 3,
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <List>
            {filteredTasks.map((task) => (
              <ListItem
                key={task.id}
                sx={{
                  mb: 2,
                  p: 2,
                  boxShadow: 1,
                  borderRadius: 2,
                  backgroundColor: task.status === 'Completed' ? '#f1f8e9' : '#fff',
                }}
              >
                <ListItemText
                  primary={task.title}
                  secondary={`Priority: ${task.priority}`}
                />
                <Chip
                style={{marginRight:"100px"}}
                  label={task.status}
                  color={task.status === 'Completed' ? 'success' : 'warning'}
                  sx={{ mr: 2 }}
                />
                <ListItemSecondaryAction>
                  {task.status === 'Pending' && (
                    <IconButton
                      color="primary"
                      onClick={() => dispatch({ type: 'UPDATE_TASK_STATUS', payload: { id: task.id } })}
                    >
                      <CheckCircle />
                    </IconButton>
                  )}
                  <IconButton
                    color="error"
                    onClick={() => dispatch({ type: 'DELETE_TASK', payload: { id: task.id } })}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          {filteredTasks.length === 0 && (
            <Typography variant="body1" color="textSecondary" align="center">
              No tasks found.
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
