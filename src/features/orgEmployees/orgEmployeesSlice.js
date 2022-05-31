import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orgEmployeesService from "./orgEmployeesService";

const initialState = {
  orgEmployees: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getOrgEmployees = createAsyncThunk(
  "orgEmployees/getOrgEmployees",
  async (_, thunkAPI) => {
    try {
      return await orgEmployeesService.getOrgEmployees();
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

export const orgEmployeesSlice = createSlice({
  name: "orgEmployees",
  initialState,
  reducers: {
      resetOrgEmployees: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOrgEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrgEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orgEmployees = action.payload;
      })
      .addCase(getOrgEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetOrgEmployees } = orgEmployeesSlice.actions;

export default orgEmployeesSlice.reducer;
