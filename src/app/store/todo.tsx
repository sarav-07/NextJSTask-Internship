import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  id: number;
  title: string;
};

interface TasksState {
  tasks: Todo[];
}

const initialState: TasksState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Todo[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Todo>) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, removeTask } = todoSlice.actions;
export default todoSlice.reducer;
