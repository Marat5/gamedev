import {
  Comment, GetCommentsResponse, GetTopicsResponse, Topic,
} from 'api/types';
import { createSlice } from '@reduxjs/toolkit';
import { getCommentsAsync, getTopicsAsync, setActiveTopicId } from 'store/forum/forumActions';

type ForumState = {
  topicsList: Topic[]
  commentsList: Comment[]
  topicsCount: number
  commentsCount: number
  activeTopicId: number | undefined
  activeTopicPage: number
  activeCommentPage: number
}

const initialState: ForumState = {
  topicsList: [],
  commentsList: [],
  topicsCount: 0,
  commentsCount: 0,
  activeCommentPage: 0,
  activeTopicId: undefined,
  activeTopicPage: 0,
};

const updateTopicsList = (state: ForumState, payload: GetTopicsResponse) => {
  state.topicsList = payload.results;
  state.topicsCount = payload.totalItems;
  state.activeTopicPage = payload.currentPage;
};

const updateCommentsList = (state: ForumState, payload: GetCommentsResponse) => {
  state.commentsList = payload.results;
  state.commentsCount = payload.totalItems;
  state.activeCommentPage = payload.currentPage;
};

const updateActiveTopicId = (state: ForumState, payload: number) => {
  state.activeTopicId = payload;
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopicsAsync.fulfilled, (state, action) => {
      updateTopicsList(state, action.payload);
    });
    builder.addCase(getCommentsAsync.fulfilled, (state, action) => {
      updateCommentsList(state, action.payload);
    });
    builder.addCase(setActiveTopicId, (state, action) => {
      updateActiveTopicId(state, action.payload);
    });
  },
});

export const forumReducer = forumSlice.reducer;
export const forumActions = forumSlice.actions;
