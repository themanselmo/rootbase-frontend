import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gardenService from "./gardenService";

const initialState = {
  gardens: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new garden
export const createGarden = createAsyncThunk(
  "gardens/create",
  async (gardenData, thunkAPI) => {
    try {
      return await gardenService.createGarden(gardenData);
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

export const gardenSlice = createSlice({
  name: "gardens",
  initialState,
  reducers: {
    resetGardens: (state) => initialState,
    getOrgGardens: (state, action) => {
      state.gardens = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGarden.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGarden.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.gardens.push(action.payload);
      })
      .addCase(createGarden.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { resetGardens, getOrgGardens } = gardenSlice.actions;

export default gardenSlice.reducer;
