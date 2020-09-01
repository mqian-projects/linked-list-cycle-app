import React, { Component } from "react";

export default class InputBox extends Component {
  constructor(){
    super();
    this.state = {
        nodeValue: 0
    }
}


  handleNodeValue = (event) => {
    this.setState({
        nodeValue: event.target.value
        
    })
}

  render() {
    const { nodeLocation, nodeValue } = this.props;

    return (
           <div id={`inputBox-${nodeLocation}`}
                nodeValueState={this.state.nodeValue} > 
             
                      <form>
                <label>
                    Node {nodeLocation} Data HELLO
                    <input 
                        type="number" 
                        value={this.nodeValue}
                        onChange={this.handleNodeValue}   
                    />
                </label>
                {/* <button type="submit"> Submit </button> */}
                </form>
    </div>
    );
  }
}