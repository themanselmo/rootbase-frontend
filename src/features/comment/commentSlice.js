import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import commentService from './commentService';

const initialState = {
  comments: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
};

export const getTaskComments = createAsyncThunk(
  'comments/getTaskComments',
  async (taskId, thunkAPI) => {
    try {
      return await commentService.getTaskComments(taskId);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTaskComment = createAsyncThunk(
  'comments/createTaskComments',
  async (taskCommentData, thunkAPI) => {
    try {
      return await commentService.createTaskComment(taskCommentData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetComments: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTaskComments.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })
      .addCase(getTaskComments.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createTaskComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTaskComment.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.comments.push(action.payload);
      })
      .addCase(createTaskComment.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export const { resetComments } = commentSlice.actions;

export default commentSlice.reducer;
