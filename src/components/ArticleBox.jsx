import React from "react";
//import { useNavigate } from 'react-router-dom';

function ArticleBox(props) {
    //const history = useNavigate();
    //const content = props.content
    //function handleClick(){
    //    history("/Article" , {state:{content:content , page:"main"}})
  //}
  return (
    <a href={props.URL} className="ArticleBox">
      <div className="card mb-3 ArticleBox">
        <div className="row g-0 d-flex justify-content-center align-items-center ArticleBox">
        {props.imageURL !== null ? <div className="col-md-4">
            <img
              src={props.imageURL}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>: null}
          
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.title}</h5>
              <p className="card-text">{props.description}</p>
              <p className="card-text">
                <small className="text-body-secondary">By {props.author} </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default ArticleBox;
