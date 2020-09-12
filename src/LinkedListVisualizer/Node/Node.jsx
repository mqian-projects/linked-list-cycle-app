import React, { Component } from "react";
import './Node.css'

export default class Node extends Component {
  render() {
      const { location, data, isWalk, isRun, isJoin } = this.props;
      const newClassName = isWalk ? "node-walk" : isRun ? "node-run" : isJoin ? "node-join" : "node";

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


