/* eslint-disable camelcase */
import { Method } from 'axios';

export const ERROR_RESPONSE_DATA = 'Invalid response data!';

export type ApiRequestProps = {
  method: Method,
  url: string,
  data?: any,
  params?: any,
  authRequired?: boolean,
  formData?: boolean
}

export enum ResponseStatus {
  SUCCESS,
  FAILED
}

export type ApiResponse = {
  status: ResponseStatus
  data?: any,
  error?: string | null
}

export type SignInRequest = {
  login: string,
  password: string
}

export type SignInResponse = 'OK'

export type LogOutResponse = 'OK'

export type SignUpRequest = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export type SignUpResponse = {
  id: number
}

export type UserResponse = {
  id: number,
  first_name: string | null,
  second_name: string | null,
  display_name: string | null,
  login: string,
  email: string,
  phone: string | null,
  avatar: string | null,
}

export type UserRequest = {
  first_name: string | null,
  second_name: string | null,
  display_name: string | null,
  login: string,
  email: string,
  phone: string,
}

export type ChangePasswordRequest = {
  oldPassword: string,
  newPassword: string
}

export type ChangePasswordResponse = 'OK'

export type ChangeAvatarRequest = {
  avatar: File
}

export type Leader = {
  displayName: string
  scoreFieldGD: number
}

export type AddLeaderRequest = {
  data: Leader
  ratingFieldName: string
}

export type AddLeaderResponse = 'OK'

export type GetLeaderboardRequest = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export type GetLeaderboardResponse = {
  data: Leader
}[]

export type OAuthServiceIdRequest = {
  redirect_uri: string
}

export type OAuthServiceIdResponse = {
  service_id: string
}

export type OauthSignInRequest = {
  code: string
  redirect_uri: string
}

export type OauthSignInResponse = 'OK'

export type OAuthYandexRequest = {
  code?: string
  error?: any
  state?: string
}

export type Topic = {
  id: number
  title: string
  owner: string
  views: number
  createdAt: string
  updatedAt: string
  commentsCount: string
}

export type CommentsResponseTopic = {
  id: number
  title: string
  owner: string
  views: number
  createdAt: string
  updatedAt: string
}

export type AddTopicRequest = {
  username: string
  title: string
}

export type AddTopicResponse = 'OK'

export type GetTopicsResponse = {
  totalItems: number
  results: Topic[]
  totalPages: number
  currentPage: number
}

export type Comment = {
  id: number
  username: string
  topicId: number
  text: string
  createdAt: string
  updatedAt: string
  topic: CommentsResponseTopic
}

export type GetCommentsRequest = {
  topicId: number
  page?: number
}

export type GetCommentsResponse = {
  results: Comment[]
  totalItems: number
  totalPages: number
  currentPage: number
}

export type AddCommentRequest = any

export type AddCommentResponse = any

export type DeleteCommentRequest = any

export type DeleteCommentResponse = any
