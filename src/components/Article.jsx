import React from "react";
import { useLocation} from "react-router-dom";

function Article(){
    const location = useLocation();
  //console.log(location.state);
  const content = location.state.content;
  //const page = location.state.page;
  //const id = location.state.id;
    return(
        <div>
            {content}
        </div>
    )
}

export default Article;