import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import ArticleBox from "./ArticleBox";

function Home() {
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [offset, setOffset] = useState(0);
  const articlesPerPage = 5;
  const [query, setQuery] = useState("");
  const cat = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  const [category, setCategory] = useState("");

  const getData = useCallback(() => {
    let url;
    if (query) {
      url = `https://newsapi.org/v2/everything?q=${query}&apiKey=cf952597735b491bbe8ab75d69a9acd6`;
    } else if (category) {
      url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=cf952597735b491bbe8ab75d69a9acd6`;
    } else {
      url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=cf952597735b491bbe8ab75d69a9acd6";
    }

    Axios.get(url)
      .then((response) => {
        setArticles(response.data.articles);
        setDisplayedArticles(response.data.articles.slice(0, articlesPerPage));
        setOffset(articlesPerPage);
      })
      .catch((error) => {
        console.error("Error fetching the articles:", error);
      });
  }, [query, category]);

  useEffect(() => {
    getData();
  }, [getData]);

  const loadMoreArticles = useCallback(() => {
    const newOffset = offset + articlesPerPage;
    if (newOffset <= articles.length) {
      const newDisplayedArticles = articles.slice(0, newOffset);
      setDisplayedArticles(newDisplayedArticles);
      setOffset(newOffset);
    }
  }, [offset, articles, articlesPerPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1
      ) {
        loadMoreArticles();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreArticles]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCategory("");
    getData();
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const onSelect = (e) => {
    setCategory(e.target.value);
    setQuery(""); // Clear query when a category is selected
    setArticles([]);
    setDisplayedArticles([]);
    setOffset(0);
    getData();
  };

  return (
    <div className="container-fluid Home">
      <div className="row">
        <div className="col-md-3 col-sm-12 Filters">
          <form onSubmit={handleSubmit}>
            <input
              className="form-control me-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="query"
              value={query}
              onChange={handleChange}
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>

          <div className="Categories">
            <p>Categories</p>
            {cat.map((cats, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="category"
                  id={`flexRadioDefault${index}`}
                  onChange={onSelect}
                  value={cats}
                />
                <label
                  className="form-check-label"
                  htmlFor={`flexRadioDefault${index}`}
                >
                  {cats}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-9 col-sm-12">
          {displayedArticles.length > 0 ? (
            displayedArticles.map((article, index) =>
              article.author ? (
                <ArticleBox
                  key={index}
                  title={article.title}
                  description={article.description}
                  URL={article.url}
                  imageURL={article.urlToImage}
                  source={article.source}
                  author={article.author}
                  content={article.content}
                />
              ) : null
            )
          ) : (
            <p>Loading articles...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
