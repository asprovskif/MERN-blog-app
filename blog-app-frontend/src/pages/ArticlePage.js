import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import ArticlesList from "../components/ArticlesList";
import CommentsList from "../components/CommentsList";
import UpvoteSection from "../components/UpvoteSection";
import AddCommentsForm from "../components/AddCommentForm";

const ArticlePage = () => {
  const { name } = useParams();
  const article = articles.find((a) => a.name === name);

  const [articleInfo, setArticleInfo] = useState({upvote: 0, comments: []});

  useEffect(() => {
      const fetchData = async () => {
        const result = await fetch(`/api/articles/${name}`);
        const body = await result.json();
        setArticleInfo(body);
      }
      fetchData();
  }, [name])
  
  if (!article) return <h3>Article does not exist!</h3>

  return (    
    <>
      <h1>{article.title}</h1>
      <UpvoteSection articleName={name} upvote={articleInfo.upvote} setArticleInfo={setArticleInfo} />
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <CommentsList comments={articleInfo.comments} />
      <AddCommentsForm articleName={name} setArticleInfo={setArticleInfo} />
      <h3>Other Articles:</h3>
      <ArticlesList articles={articles.filter(a => a.name !== name)} />
    </>
  );
};

export default ArticlePage;
