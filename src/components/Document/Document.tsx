import React from "react";

import "./Document.css";

interface Props {
  title: string;
  description: string;
  // author: {
  //   id: string;
  //   email: string;
  // };
  image: string;
  // clicked: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
}

export const Document: React.FC<Props> = (props) => {
  return (
    <article className="Document" /* onClick={props.clicked} */>
      <img
        src={props.image}
        alt="thumbnail of document"
        width="100"
        height="100"
      />
      {/* <h4>Author: </h4> */}
      {/* {props.author.email} */}
      <h4>Title: </h4>
      {props.title}
      <h4>Description: </h4>
      ${props.description}
    </article>
  );
};
