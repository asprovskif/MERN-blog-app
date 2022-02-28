import React from 'react';

const UpvoteSection = ({ articleName, upvote, setArticleInfo }) => {
    const upvoteArticle = async () => {
        const result = await fetch(`/api/articles/${articleName}/upvote`, {
            method: 'POST',
        });

        const body = await result.json();
        setArticleInfo(body);
    }

    return (
    <div id="upvotes-section">
    <button onClick={upvoteArticle}>Add Upvote</button>
<p>This post has been upvoted {upvote} times</p>
</div>
)}

export default UpvoteSection;