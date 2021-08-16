import { createAsyncThunk } from '@reduxjs/toolkit';
import { forumAPI } from 'api/forum';
import { AddCommentRequest, AddTopicRequest, GetCommentsRequest } from 'api/types';
import { setIsLoadingShown } from 'store/requestStatus/requestStatusActions';
import { createAction } from '@reduxjs/toolkit';

export enum ForumActionType {
  GET_TOPICS = 'forum/getTopicsAsync',
  ADD_TOPIC = 'forum/addTopic',
  DELETE_TOPIC = 'forum/deleteTopic',
  GET_COMMENTS = 'forum/getComments',
  ADD_COMMENT = 'forum/addComment',
  DELETE_COMMENT = 'forum/deleteComment',
}

export const getTopicsAsync = createAsyncThunk(
  ForumActionType.GET_TOPICS,
  async (page: number, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingShown(true));
    try {
      const topics = await forumAPI.getTopics(page);
      return topics;
    } finally {
      thunkAPI.dispatch(setIsLoadingShown(false));
    }
  },
);

export const addTopicAsync = createAsyncThunk(
  ForumActionType.ADD_TOPIC,
  async (data: AddTopicRequest, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingShown(true));
    try {
      const response = await forumAPI.addTopic(data);
      return response;
    } finally {
      thunkAPI.dispatch(setIsLoadingShown(false));
    }
  },
);

export const getCommentsAsync = createAsyncThunk(
  ForumActionType.GET_COMMENTS,
  async (data: GetCommentsRequest, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingShown(true));
    try {
      const comments = await forumAPI.getComments(data);
      return comments;
    } finally {
      thunkAPI.dispatch(setIsLoadingShown(false));
    }
  },
);

export const addCommentAsync = createAsyncThunk(
  ForumActionType.ADD_COMMENT,
  async (data: AddCommentRequest, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingShown(true));
    try {
      const response = await forumAPI.addTopic(data);
      return response;
    } finally {
      thunkAPI.dispatch(setIsLoadingShown(false));
    }
  },
);

export const setActiveTopicId = createAction<number>('setActiveTopicId');
