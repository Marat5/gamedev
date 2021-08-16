import './styles.css';
import React, { FC, MouseEventHandler, useState } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getActiveTopicId, getActiveTopicTitle } from 'store/forum/forumSelectors';
import { useBoundAction } from 'hooks/useBoundAction';
import { addCommentAsync } from 'store/forum/forumActions';
import { getUserState } from 'store/user/userSlice';

export type NewPostPageProps = {
  className?: string
}

export const NewPost: FC<NewPostPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [comment, setComment] = useState('');
  const topicTitle = useSelector(getActiveTopicTitle);
  const topicId = useSelector(getActiveTopicId);
  const user = useSelector(getUserState);
  const addCommentAsyncBounded = useBoundAction(addCommentAsync);

  const postButtonHandler: MouseEventHandler = (event) => {
    event.preventDefault();
    addCommentAsyncBounded({
      topicId,
      username: `${user.userInfo.first_name} ${user.userInfo.second_name}`,
      text: comment,
    });
    history.push('/topic');
  };

  return (
    <div className={classNames(['page', className])}>
      <h1 className="page__title">{t('topic')}</h1>
      <div className="post">
        <div className="post__title-container">
          <span className="post__title">{topicTitle}</span>
          <span className="post__title">{t('new_post')}</span>
        </div>
        <div className="post__input-container">
          <textarea
            className="post__text"
            placeholder={`${t('type_your_message_here')}...`}
            onChange={(event) => (setComment(event.target.value))}
          />
        </div>
      </div>
      <div className="page__footer-buttons">
        <BackButton />
        <GDButton title=":)" styleOption="secondary" size="l" />
        <GDButton title={`${t('post')} !`} styleOption="secondary" size="l" onClick={postButtonHandler} />
      </div>
    </div>
  );
};
