import './styles.css';
import React, { FC, MouseEventHandler, useState } from 'react';
import { GDButton } from 'components/atoms/GDButton/GDButton';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BackButton } from 'components/molecules/BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useBoundAction } from 'hooks/useBoundAction';
import { addTopicAsync } from 'store/forum/forumActions';
import { getUserState } from 'store/user/userSlice';

export type NewPostPageProps = {
  className?: string
}

export const NewTopic: FC<NewPostPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const user = useSelector(getUserState);
  const addTopicAsyncBounded = useBoundAction(addTopicAsync);

  const startButtonHandler: MouseEventHandler = (event) => {
    event.preventDefault();
    addTopicAsyncBounded({
      username: `${user.userInfo.first_name} ${user.userInfo.second_name}`,
      title,
    });
    history.push('/forum');
  };

  return (
    <div className={classNames(['page', className])}>
      <h1 className="page__title">{t('new_topic')}</h1>
      <div className="post">
        <div className="post__input-container">
          <input
            className="post__text"
            placeholder={`${t('topic title')}...`}
            onChange={(event) => (setTitle(event.target.value))}
          />
        </div>
      </div>
      <div className="page__footer-buttons">
        <BackButton />
        <GDButton title={`${t('start')} !`} styleOption="secondary" size="l" onClick={startButtonHandler} />
      </div>
    </div>
  );
};
