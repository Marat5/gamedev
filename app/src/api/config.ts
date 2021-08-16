export const AUTH_TOKEN_NAME = 'bomberman_auth_token';

export const API_BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const LOCAL_BASE_URL = 'http://localhost:5000/api/v1';

export const PATHS = {
  auth: {
    signIn: `${API_BASE_URL}/auth/signin`,
    signUp: `${API_BASE_URL}/auth/signup`,
    logout: `${API_BASE_URL}/auth/logout`,
    userInfo: `${API_BASE_URL}/auth/user`,
  },
  users: {
    updateProfile: `${API_BASE_URL}/user/profile`,
    changePassword: `${API_BASE_URL}/user/password`,
    uploadAvatar: `${API_BASE_URL}/user/profile/avatar`,
  },
  leaderboard: {
    addLeader: `${API_BASE_URL}/leaderboard`,
    getLeaderboard: `${API_BASE_URL}/leaderboard/all`,
  },
  resources: {
    getUrl: `${API_BASE_URL}/resources`,
  },
  oauth: {
    getServiceId: `${API_BASE_URL}/oauth/yandex/service-id`,
    signIn: `${API_BASE_URL}/oauth/yandex`,
  },
  forum: {
    getTopics: `${LOCAL_BASE_URL}/topics`,
    addTopic: `${LOCAL_BASE_URL}/topics`,
    deleteTopic: `${LOCAL_BASE_URL}/topics`,
    watchTopic: `${LOCAL_BASE_URL}/watch`,
    getComments: `${LOCAL_BASE_URL}/comments`,
    addComment: `${LOCAL_BASE_URL}/comments`,
    deleteComment: `${LOCAL_BASE_URL}/comments`,
  },
};
