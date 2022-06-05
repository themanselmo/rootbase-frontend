import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import errorInterface from '../../interfaces/error';
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

export const createTaskComment = createAsyncThunk(
  'comments/createTaskComments',
  async (taskCommentData, thunkAPI) => {
    try {
      return await commentService.createTaskComment(taskCommentData);
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

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetComments: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskComments.pending, (state) => {
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'loading' does not exist on type 'Writabl... Remove this comment to see the full error message
        state.loading = true;
      })
      .addCase(getTaskComments.fulfilled, (state, action) => {
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'loading' does not exist on type 'Writabl... Remove this comment to see the full error message
        state.loading = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })
      .addCase(getTaskComments.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createTaskComment.pending, (state) => {
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'loading' does not exist on type 'Writabl... Remove this comment to see the full error message
        state.loading = true;
      })
      .addCase(createTaskComment.fulfilled, (state, action) => {
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'loading' does not exist on type 'Writabl... Remove this comment to see the full error message
        state.loading = false;
        state.isSuccess = true;
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
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
