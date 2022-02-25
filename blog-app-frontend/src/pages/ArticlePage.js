import React from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import ArticlesList from "../components/ArticlesList";

const ArticlePage = () => {
  const { name } = useParams();
  const article = articles.find((a) => a.name === name);
  
  if (!article) return <h3>Article does not exist!</h3>

  return (    
    <>
      <h1>{article.title}</h1>
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <h3>Other Articles:</h3>
      <ArticlesList articles={articles.filter(a => a.name !== name)} />
    </>
  );
};

export default ArticlePage;
