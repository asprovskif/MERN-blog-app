import React, {useState} from "react";

const AddCommentsForm = ({ articleName, setArticleInfo }) => {
    const [username, setUsername] = useState('');
    const [commentText, setCommentText] = useState('');

    const addComment = async () => {
        console.log('aaaaaaaaaa')
        const result = await fetch(`/api/articles/${articleName}/add-comment`, {
            method: 'POST',
            body: JSON.stringify({ username, text: commentText }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        console.log(result);

        const body = await result.json();
        setArticleInfo(body);
        setUsername('');
        setCommentText('');
    }

return (
  <div id="add-comment-form">
    <h3>Add a Comment</h3>
    <label>
      Name:
      <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
    </label>
    <label>
      Comment:
      <textarea rows="4" cols="50" value={commentText} onChange={(event) => setCommentText(event.target.value)} />
    </label>

    <button onClick={() => addComment()}>Add Comment</button>
  </div>
)};

export default AddCommentsForm;
