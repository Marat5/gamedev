import { RootState } from 'store/store';

export const selectTopicsList = (state: RootState) => state.forum.topicsList;
export const selectActiveTopicId = (state: RootState) => state.forum.activeTopicId;
export const selectCommentsList = (state: RootState) => state.forum.commentsList;
export const getActiveTopicTitle = (state: RootState) => state.forum.activeTopicTitle;
export const getActiveTopicId = (state: RootState) => state.forum.activeTopicId;
