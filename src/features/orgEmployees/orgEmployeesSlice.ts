import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import errorInterface from '../../components/interfaces/error';
import orgEmployeesService from './orgEmployeesService';

const initialState = {
  orgEmployees: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const getOrgEmployees = createAsyncThunk(
  'orgEmployees/getOrgEmployees',
  async (_, thunkAPI) => {
    try {
      return await orgEmployeesService.getOrgEmployees();
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

export const orgEmployeesSlice = createSlice({
  name: 'orgEmployees',
  initialState,
  reducers: {
    resetOrgEmployees: () => initialState
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
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string'.
        state.message = action.payload;
      });
  }
});

export const { resetOrgEmployees } = orgEmployeesSlice.actions;

export default orgEmployeesSlice.reducer;
