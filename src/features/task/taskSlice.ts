import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from './taskService';

const initialState = {
  tasks: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
};

// Create standard task
export const createTask = createAsyncThunk('tasks/createTask', async (taskData, thunkAPI) => {
  try {
    return await taskService.createTask(taskData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update standard task
export const updateTask = createAsyncThunk('tasks/updateTask', async (taskData, thunkAPI) => {
  try {
    return await taskService.updateTask(taskData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get garden tasks
export const getGardenTasks = createAsyncThunk(
  'tasks/getGardenTasks',
  async (gardenId, thunkAPI) => {
    try {
      return await taskService.getGardenTasks(gardenId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create garden task
export const createGardenTask = createAsyncThunk(
  'tasks/createGardenTasks',
  async (gardenTaskData, thunkAPI) => {
    try {
      return await taskService.createGardenTask(gardenTaskData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get employee tasks
export const getEmpTasks = createAsyncThunk('tasks/getEmpTasks', async (_, thunkAPI) => {
  try {
    return await taskService.getEmpTasks();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create employee task
export const createEmpTask = createAsyncThunk(
  'tasks/createEmpTask',
  async (empTaskData, thunkAPI) => {
    try {
      return await taskService.createEmpTask(empTaskData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetTasks: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(createTask.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createGardenTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGardenTask.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(createGardenTask.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getGardenTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGardenTasks.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getGardenTasks.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getEmpTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmpTasks.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getEmpTasks.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createEmpTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmpTask.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(createEmpTask.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        if (action.payload.status === 'in progress') {
          state.tasks.push(action.payload);
        } else {
          state.tasks = state.tasks.map((stateTask) =>
            stateTask.id === action.payload.id ? action.payload : stateTask
          );
        }
      })
      .addCase(updateTask.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export const { resetTasks } = taskSlice.actions;

export default taskSlice.reducer;
