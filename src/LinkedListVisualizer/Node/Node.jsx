import React, { Component } from "react";
import './Node.css'

export default class Node extends Component {
  render() {
      const { location, data, isHead, isTail, isInvis, isWalk, isRun } = this.props;
      const newClassName = isHead ? "node-head" : isWalk ? "node-walk" : isRun ? "node-run" : "node";

    return (
    <div 
        id={`node-${location}`} 
        className={`${newClassName}`}
        >
        Node: &nbsp;
        {location}
        <br></br>
        <br></br>

        Data: &nbsp;
        {data}
    </div>
    );
  }
}


