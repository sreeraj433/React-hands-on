import React, { createContext, useReducer, useContext } from "react";

interface TaskState {
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "Completed";
}

type Action =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK_STATUS"; payload: { id: string } }
  | { type: "DELETE_TASK"; payload: { id: string } };

const initialState: TaskState = { tasks: [] };

type props = {
  children: React.ReactNode;
};

const TaskReducer = (state: TaskState, action: Action): TaskState => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK_STATUS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, status: "Completed" }
            : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    default:
      return state;
  }
};

const TaskContext = createContext<
  { state: TaskState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const TaskProvider: React.FC<props> = ({ children }) => {
  const [state, dispatch] = useReducer(TaskReducer, initialState);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};
