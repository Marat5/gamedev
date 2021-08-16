import './styles.css';
import React, { FC, MouseEventHandler, useMemo } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import { topicsListHeader } from 'pages/Forum/constants';
import { useBoundAction } from 'hooks/useBoundAction';
import { getTopicsAsync, setActiveTopicId } from 'store/forum/forumActions';
import { useSelector } from 'react-redux';
import { selectTopicsList } from 'store/forum/forumSelectors';
import { useMountEffect } from 'hooks/useMountEffect';

export type ForumPageProps = {
  className?: string
}

export const Forum: FC<ForumPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const listHeader = useMemo(() => topicsListHeader.map((item) => t(item)), [t]);
  const history = useHistory();
  const getTopicsAsyncBounded = useBoundAction(getTopicsAsync);
  const setActiveTopicIdBounded = useBoundAction(setActiveTopicId);
  const topics = useSelector(selectTopicsList);

  useMountEffect(() => getTopicsAsyncBounded(1));

  const topicListClickHandler: MouseEventHandler = (event) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const topicListElement = target.closest('.forum__topic-list-item');
    const topicId = topicListElement?.getAttribute('topic-id');
    if (!topicId) {
      return;
    }
    setActiveTopicIdBounded(parseInt(topicId, 10));
    history.push('/topic');
  };

  return (
    <div className={classNames(['page', className])}>
      <h1 className="page__title">{t('forum')}</h1>
      <div className="forum">
        <span className="forum__header">
          {listHeader.map((item) => <GDButton key={item} title={item} styleOption="secondary" size="l" />)}
        </span>
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
        <ul className="forum__topics-list" onClick={topicListClickHandler}>
          {topics.map(({
            id,
            title,
            owner,
            views,
            updatedAt,
            commentsCount,
          }, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className="forum__topic-list-item" topic-id={id}>
              <span className="forum__topic-list-item_align-left">{title}</span>
              <span>{owner}</span>
              <span>{commentsCount}</span>
              <span>{views}</span>
              <time>{new Date(updatedAt).toLocaleDateString()}</time>
            </li>
          ))}
        </ul>
      </div>

      <div className="page__footer-buttons">
        <BackButton />
        <GDButton
          title={t('start_new_topic')}
          styleOption="secondary"
          size="l"
          onClick={() => history.push('/new-topic')}
        />
      </div>
    </div>
  );
};
