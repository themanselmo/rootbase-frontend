import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authOrgService from "./authOrgService";

const organization = JSON.parse(localStorage.getItem("organization"));

const initialState = {
  organization: organization ? organization : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const registerOrg = createAsyncThunk(
  "authOrg/registerOrg",
  async (organization, thunkAPI) => {
    try {
      return await authOrgService.registerOrg(organization);
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

export const loginOrg = createAsyncThunk(
  "authOrg/loginOrg",
  async (organization, thunkAPI) => {
    try {
      return await authOrgService.loginOrg(organization);
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

export const logoutOrg = createAsyncThunk("authOrg/logoutOrg", async () => {
  await authOrgService.logoutOrg();
});

export const authOrgSlice = createSlice({
  name: "authOrg",
  initialState,
  reducers: {
    resetOrg: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    updateOrgGardens: (state, action) => {
      const newOrg = { ...state.organization, gardens: action.payload };
      state.organization = newOrg;
      localStorage.setItem("organization", JSON.stringify(newOrg));
    },
    updateOrgTasks: (state, action) => {
      const newOrg = { ...state.organization, tasks: action.payload };
      state.organization = newOrg;
      localStorage.setItem("organization", JSON.stringify(newOrg));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerOrg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.organization = action.payload;
      })
      .addCase(registerOrg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logoutOrg.fulfilled, (state) => {
        state.organization = null;
      })
      .addCase(loginOrg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.organization = action.payload;
      })
      .addCase(loginOrg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetOrg, updateOrgGardens, updateOrgTasks } =
  authOrgSlice.actions;

export default authOrgSlice.reducer;
