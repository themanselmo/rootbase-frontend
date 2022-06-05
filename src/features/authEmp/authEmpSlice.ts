import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import errorInterface from '../../components/interfaces/error';
import authEmpService from './authEmpService';

// @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
const employee = JSON.parse(localStorage.getItem('employee'));

const initialState = {
  employee: employee ? employee : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const registerEmp = createAsyncThunk('authEmp/registerEmp', async (employee, thunkAPI) => {
  try {
    return await authEmpService.registerEmp(employee);
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

export const loginEmp = createAsyncThunk('authEmp/loginEmp', async (employee, thunkAPI) => {
  try {
    return await authEmpService.loginEmp(employee);
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

export const logoutEmp = createAsyncThunk('authEmp/logoutEmp', async (_, thunkAPI) => {
  try {
    return await authEmpService.logoutEmp();
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

export const editEmp = createAsyncThunk('authEmp/editEmp', async (employee, thunkAPI) => {
  try {
    return await authEmpService.editEmp(employee);
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

export const authEmpSlice = createSlice({
  name: 'authEmp',
  initialState,
  reducers: {
    resetEmp: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerEmp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerEmp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employee = action.payload;
      })
      .addCase(registerEmp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string'.
        state.message = action.payload;
      })
      .addCase(logoutEmp.fulfilled, (state) => {
        state.employee = null;
      })
      .addCase(loginEmp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginEmp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employee = action.payload;
      })
      .addCase(loginEmp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string'.
        state.message = action.payload;
      })
      .addCase(editEmp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEmp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employee = action.payload;
      })
      .addCase(editEmp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string'.
        state.message = action.payload;
      });
  }
});

export const { resetEmp } = authEmpSlice.actions;

export default authEmpSlice.reducer;
