import { React, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
// import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';

const CommentHeart = () => {
  const [heartClass, setHeartClass] = useState('heartUnclicked');

  const handleHeartClass = () => {
    heartClass === 'heartUnclicked'
      ? setHeartClass('heartClicked')
      : setHeartClass('heartUnclicked');
  };

  return (
    <img className="likeIcon" src="img/like.png"
    //   icon={heartClass === 'heartUnclicked' ? faHeart : faSolidHeart}
      onClick={handleHeartClass}
    />
  );
};

export default CommentHeart;