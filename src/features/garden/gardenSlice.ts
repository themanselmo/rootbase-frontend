import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import errorInterface from '../../interfaces/error';
import gardenService from './gardenService';

const initialState = {
  gardens: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Create new garden
export const createGarden = createAsyncThunk('gardens/create', async (gardenData, thunkAPI) => {
  try {
    return await gardenService.createGarden(gardenData);
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

export const gardenSlice = createSlice({
  name: 'gardens',
  initialState,
  reducers: {
    resetGardens: () => initialState,
    getOrgGardens: (state, action) => {
      state.gardens = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGarden.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGarden.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        state.gardens.push(action.payload);
      })
      .addCase(createGarden.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export const { resetGardens, getOrgGardens } = gardenSlice.actions;

export default gardenSlice.reducer;
