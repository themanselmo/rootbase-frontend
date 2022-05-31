import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authEmpService from "./authEmpService";

const employee = JSON.parse(localStorage.getItem("employee"));

const initialState = {
  employee: employee ? employee : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const registerEmp = createAsyncThunk(
  "authEmp/registerEmp",
  async (employee, thunkAPI) => {
    try {
      return await authEmpService.registerEmp(employee);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginEmp = createAsyncThunk(
  "authEmp/loginEmp",
  async (employee, thunkAPI) => {
    try {
      return await authEmpService.loginEmp(employee);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutEmp = createAsyncThunk(
  "authEmp/logoutEmp",
  async (_, thunkAPI) => {
    try {
      return await authEmpService.logoutEmp();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editEmp = createAsyncThunk(
  "authEmp/editEmp",
  async (employee, thunkAPI) => {
    try {
      return await authEmpService.editEmp(employee);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authEmpSlice = createSlice({
  name: "authEmp",
  initialState,
  reducers: {
    resetEmp: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
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
        state.message = action.payload;
      });
  },
});

export const { resetEmp } = authEmpSlice.actions;

export default authEmpSlice.reducer;
