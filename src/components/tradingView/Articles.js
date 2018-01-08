import React from 'react';

const Articles = ({articles}) => {
  if (!articles) {
    articles = [];
  }
  let articlesJSX = [];
  let newsArticle = {
    backgroundColor: "#343434",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "3px"
  };
  let newsArticleHeader = {
    color: "#5bb7db",
  };
  let newsArticleDescription = {
    color: "#bbb",
  };
  for (let i = 0; i < articles.length; i++) {
    articlesJSX.push(
      <div key={i} style={newsArticle}>
      <a href={articles[i].url} style={newsArticleHeader} target="_blank">{articles[i].title}</a><br />
        <span style={newsArticleDescription}>{articles[i].description}</span>
      </div>
    );
  }
  return (
    <div>
      {Array.from(articlesJSX).map((result) => {
        return result;
      })}
    </div>
  );
};

export default Articles;
