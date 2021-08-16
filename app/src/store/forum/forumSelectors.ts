import { RootState } from 'store/store';

export const selectTopicsList = (state: RootState) => state.forum.topicsList;
export const selectActiveTopicId = (state: RootState) => state.forum.activeTopicId;
export const selectCommentsList = (state: RootState) => state.forum.commentsList;
