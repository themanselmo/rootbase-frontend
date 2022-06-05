import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import errorInterface from '../../components/interfaces/error';
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
    const hasErrResponse =
      (error as errorInterface).response?.data?.message ||
      (error as errorInterface).message ||
      (error as errorInterface).toString();

    if (!hasErrResponse) {
      throw error;
    }
    return thunkAPI.rejectWithValue(hasErrResponse);
  }
});

// Update standard task
export const updateTask = createAsyncThunk('tasks/updateTask', async (taskData, thunkAPI) => {
  try {
    return await taskService.updateTask(taskData);
  } catch (error) {
    const hasErrResponse =
      (error as errorInterface).response?.data?.message ||
      (error as errorInterface).message ||
      (error as errorInterface).toString();

    if (!hasErrResponse) {
      throw error;
    }
    return thunkAPI.rejectWithValue(hasErrResponse);
  }
});

// Get garden tasks
export const getGardenTasks = createAsyncThunk(
  'tasks/getGardenTasks',
  async (gardenId, thunkAPI) => {
    try {
      return await taskService.getGardenTasks(gardenId);
    } catch (error) {
      const hasErrResponse =
        (error as errorInterface).response?.data?.message ||
        (error as errorInterface).message ||
        (error as errorInterface).toString();

      if (!hasErrResponse) {
        throw error;
      }
      return thunkAPI.rejectWithValue(hasErrResponse);
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
      const hasErrResponse =
        (error as errorInterface).response?.data?.message ||
        (error as errorInterface).message ||
        (error as errorInterface).toString();

      if (!hasErrResponse) {
        throw error;
      }
      return thunkAPI.rejectWithValue(hasErrResponse);
    }
  }
);

// Get employee tasks
export const getEmpTasks = createAsyncThunk('tasks/getEmpTasks', async (_, thunkAPI) => {
  try {
    return await taskService.getEmpTasks();
  } catch (error) {
    const hasErrResponse =
      (error as errorInterface).response?.data?.message ||
      (error as errorInterface).message ||
      (error as errorInterface).toString();

    if (!hasErrResponse) {
      throw error;
    }
    return thunkAPI.rejectWithValue(hasErrResponse);
  }
});

// Create employee task
export const createEmpTask = createAsyncThunk(
  'tasks/createEmpTask',
  async (empTaskData, thunkAPI) => {
    try {
      return await taskService.createEmpTask(empTaskData);
    } catch (error) {
      const hasErrResponse =
        (error as errorInterface).response?.data?.message ||
        (error as errorInterface).message ||
        (error as errorInterface).toString();

      if (!hasErrResponse) {
        throw error;
      }
      return thunkAPI.rejectWithValue(hasErrResponse);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetTasks: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state) => {
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
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
          state.tasks.push(action.payload);
        } else {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'any[]' is not assignable to type 'never[]'.
          state.tasks = state.tasks.map((stateTask) =>
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'never'.
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
