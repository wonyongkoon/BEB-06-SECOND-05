import { React, useState } from 'react';

const InputCommentLine = ({ setCommentBox, idx }) => {
  const [commentValue, setCommentValue] = useState('');
  const onChange = e => {
    setCommentValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (commentValue === '') return;

    setCommentBox(value =>
      value.map((comments, index) => {
        return index === idx
          ? [...comments, { name: 'hasang0.0', comment: commentValue }]
          : comments;
      })
    );
    setCommentValue('');
  };

  return (
    <form className="commentLine" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="댓글 달기..."
        className="comment"
        value={commentValue}
        onChange={onChange}
      />
      <input type="submit" value="게시" className="submit" />
    </form>
  );
};

export default InputCommentLine;
