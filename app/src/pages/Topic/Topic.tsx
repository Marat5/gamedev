import './styles.css';
import React, { FC } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { useHistory } from 'react-router-dom';
// import { dummyPosts } from 'pages/Topic/constants';
import { useSelector } from 'react-redux';
import { selectActiveTopicId, selectCommentsList, selectTopicsList } from 'store/forum/forumSelectors';
import { useMountEffect } from 'hooks/useMountEffect';
import { getCommentsAsync } from 'store/forum/forumActions';
import { useBoundAction } from 'hooks/useBoundAction';

export type TopicPageProps = {
  className?: string
}

export const Topic: FC<TopicPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const getCommentsAsyncBounded = useBoundAction(getCommentsAsync);
  const activeTopicId = useSelector(selectActiveTopicId);
  const topicsList = useSelector(selectTopicsList);
  const activeTopic = topicsList.find((topic) => topic.id === activeTopicId);
  const comments = useSelector(selectCommentsList);

  useMountEffect(() => getCommentsAsyncBounded({ topicId: activeTopicId, page: 1 }));

  return (
    <div className={classNames(['page', className])}>
      <h1 className="page__title">{t('forum')}</h1>
      <div className="topic">
        <span className="topic__title">{activeTopic?.title}</span>
        <div className="topic__posts-list">
          {comments.map(({
            username, updatedAt, text,
          }) => (
            <span className="topic__post">
              <div className="topic__author-container">
                <div className="topic__avatar-container">
                  <img className="topic__avatar" src={undefined} alt="avatar" />
                </div>
                <span>{username}</span>
              </div>
              <div className="topic__content-container">
                <span>{new Date(updatedAt).toLocaleDateString()}</span>
                <span>{text}</span>
              </div>
            </span>
          ))}
        </div>
      </div>
      <div className="page__footer-buttons">
        <BackButton />
        <GDButton title={t('new_post')} styleOption="secondary" size="l" onClick={() => history.push('/new-post')} />
      </div>
    </div>
  );
};
