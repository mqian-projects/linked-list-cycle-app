import React, {Component} from 'react';
import Node from './Node/Node';
import Pointer from './Node/Pointer';

export default class LinkedListVisualizer extends Component {
    constructor(){
        super();
        this.state = {
            numberOfNodes: 0,
            grid: [],
            inputGrid: [ { data: "" }],
            cycleTo: 0,
            cycleToHolder: 0,
            cyclePresent: false,
            boxWidth: 0,
            cycleLength: 0,
            nodeWidth: 0,
            downArrowWidth: 30,
            windowWidth: 0,
            windowHeight: 0,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
      }
      
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      
      updateWindowDimensions() {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
      }

    visualizeTransversal() {
        if(this.visualizationInProcess()){
          alert("Please wait for current visualization to end before proceeding.");
        } 
        
        this.resetNodes();
        this.animateTransversal();
    }

    resetNodes(){
        for(let i = 0; i < this.state.numberOfNodes; i++) {
            document.getElementById(`node-${i}`).className = 'node';
        }
        return;
    }


    animateTransversal() {
        const {cycleTo, cycleLength, numberOfNodes, cyclePresent} = this.state;
        let updateNodesIncrement = 0;
        const cycleToInt = parseInt(cycleTo);
        let timer;
        let prevRunNode;
        let prevWalkNode;
        let currRunNode;
        let currWalkNode;
        let runCount = 0;
        let walkCount = 0;
        let runCycle = false;
        let walkCycle = false;
        let cycleToEven = cycleToInt % 2 == 0;
        let setFirst = false;
        let cycleLengthEven = cycleLength % 2 == 0;
        var updateNodes;

        if(cyclePresent){
        updateNodes = () => {
            if(updateNodesIncrement > 0){
                prevRunNode.className = 'node';
                prevWalkNode.className = 'node';
            }

            if(2 * updateNodesIncrement >= cycleToInt){
                runCycle = true;
            }

            if(cycleToEven){
                let runNodeNumber = runCycle ? cycleToInt + ((2 * runCount++) % cycleLength) : 2 * updateNodesIncrement % numberOfNodes;
                currRunNode = document.getElementById(`node-${runNodeNumber}`);
                currRunNode.className = 'node-run';
                prevRunNode = currRunNode;
            } else {
                if(runCycle){
                    //calibrating an odd number with even or odd cycle length
                    let hold = cycleToInt + ((2 * runCount) % cycleLength);
                    if(cycleLengthEven){
                        hold = hold + 1;
                    }

                    while(hold != 2 * updateNodesIncrement && !setFirst){
                        runCount++;
                    }
                    
                    setFirst = true;

                    let runNodeNumber = cycleLengthEven ? cycleToInt + ((2 * runCount) % cycleLength) + 1 : cycleToInt + ((2 * runCount) % cycleLength);
                    currRunNode = document.getElementById(`node-${runNodeNumber}`);
                    currRunNode.className = 'node-run';
                    prevRunNode = currRunNode;
                    runCount++;
                } else{
                    currRunNode = document.getElementById(`node-${2*updateNodesIncrement % numberOfNodes}`);
                    currRunNode.className = 'node-run';
                    prevRunNode = currRunNode;
                }
            }
                
            walkCycle = updateNodesIncrement == cycleToInt ? true : false;

            let walkNodeNumber = walkCycle ? cycleToInt + (walkCount++ % cycleLength) : updateNodesIncrement % numberOfNodes;
            currWalkNode = document.getElementById(`node-${walkNodeNumber}`);
            currWalkNode.className = 'node-walk'; 
            prevWalkNode = currWalkNode;


            updateNodesIncrement++;

            if(updateNodesIncrement > 1 && currWalkNode == currRunNode){
                prevWalkNode.className = 'node';
                prevRunNode.className = 'node';
                currWalkNode.className = 'node-join';
                clearInterval(timer); 
                return;
            }


        }
    } else {
        updateNodes = () => {
            if(updateNodesIncrement > 0){
                prevRunNode.className = 'node';
                prevWalkNode.className = 'node';
            }

            if(updateNodesIncrement == numberOfNodes){
                clearInterval(timer);
                return;
            }

            if(2 * updateNodesIncrement < numberOfNodes){
                currRunNode = document.getElementById(`node-${2*updateNodesIncrement}`);
                currRunNode.className = 'node-run';
                prevRunNode = currRunNode;
            }
            
            currWalkNode = document.getElementById(`node-${updateNodesIncrement}`);
            currWalkNode.className = 'node-walk'; 
            prevWalkNode = currWalkNode;

            updateNodesIncrement++;
        }
    }

        updateNodes();
        timer = setInterval(updateNodes, 1000);
    }

    handleNodeDataChange = idx => event => {
        event.preventDefault();
        let updatedNodes = this.state.inputGrid.slice();
        updatedNodes[idx].data = event.target.value;
        this.setState({ inputGrid: updatedNodes });
    }

    handleAddNode = (event) => {
        event.preventDefault();
        const {numberOfNodes} = this.state;
        const newData = this.state.inputGrid.pop().data;
        const nodeLimit = (this.state.windowWidth - 150) / 150;
        
        if(newData > 999 || newData < 0){
            alert("This is out of bounds. Please enter a value between 0 and 999.");
        } else if(!this.state.cyclePresent && numberOfNodes < nodeLimit){
            this.setState({
                grid : this.state.grid.concat([createNode(newData, this.state.numberOfNodes)]),
                numberOfNodes : this.state.numberOfNodes + 1,
                inputGrid: this.state.inputGrid.concat([{ data: "" }])
            }, () => {console.log(this.state.numberOfNodes, 'numberOfNodes')});    
        } else if(numberOfNodes >= nodeLimit) {
            alert("Cannot add node, exceeds node limit for browser window size.");
        } else{
            alert("Cannot add node, cycle is present.");
        }
    }

    handleCycleBox = (event) => {
        event.preventDefault();
        this.setState({
            cycleToHolder : event.target.value
        })    
    }

    handleAddCycle = (event) => {
        event.preventDefault();
        const {cycleTo, grid, cycleToHolder, numberOfNodes} = this.state;
        if(this.visualizationInProcess()){
            alert("Please wait for current visualization to end before proceeding.");
        } else if(numberOfNodes > 1 && cycleToHolder >= 0 && cycleToHolder < numberOfNodes - 1){
            const elementNode = document.getElementById('node-0');
            const styleNode = window.getComputedStyle(elementNode);
            const widthNode = parseInt(styleNode.getPropertyValue('width').replace('px',''));

            this.setState({
                cyclePresent: true,
                cycleLength: numberOfNodes - cycleToHolder,
                nodeWidth: widthNode,
                cycleTo: this.state.cycleToHolder
            }, () => {
                console.log(this.state.nodeWidth, 'nodeWidth');
            })

        } else{
            alert("Not within range. Please enter a value within the range of the linked list.")
        }

    }

    handleClearBoard = () => {
        const {grid, numberOfNodes} = this.state;

        if(this.visualizationInProcess()){
            alert("Please wait for visualization to finish before clearing the board.")
        } else {
            this.setState({
                numberOfNodes: 0,
                grid: [],
                inputGrid: [ { data: "" }],
                cycleTo: 0,
                cycleToHolder: 0,
                cyclePresent: false,
                boxWidth: 0,
                cycleLength: 0,
                nodeWidth: 0,
                downArrowWidth: 30,
            })    
        }
    }

    visualizationInProcess = () => {
        let inProcess = false;
        for(let i = 0; i < this.state.numberOfNodes; i++) {
            const currNode = document.getElementById(`node-${i}`);
            if(currNode.className == 'node-walk' || currNode.className == 'node-run'){
                inProcess = true;
            }
        }
        return inProcess;
    }

    render(){
        const {grid, inputGrid, numberOfNodes} = this.state;

        return(
            <div className="heightInside">
                <h1 align="center">
                    Linked List Cycle Visualization
                </h1>

            <center>

            <form onSubmit={this.handleAddNode} className="flexRowButton">
                {inputGrid.map((inputBox, idx) => (
                    <div>
                        <input
                            type="number"
                            placeholder={`Insert Node Data`}
                            value={inputBox.data}
                            onChange={this.handleNodeDataChange(idx)}
                            >
                        </input>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={this.handleAddNode}
                    >
                    Add Node
                </button>
            </form>


            <form onSubmit={this.handleAddCycle} className="flexRowButton">
                    <div>
                        <input
                            type="number"
                            placeholder={`Cycle Number Origin`}
                            value={this.state.cycleToHolder}
                            onChange={this.handleCycleBox}
                            >
                        </input>
                    </div>


                <button
                    type="button"
                    onClick={this.handleAddCycle}
                    >
                    Create Cycle
                </button>
            </form>

            <br></br>

            <button onClick={() => this.visualizeTransversal()}>
                      Visualize
            </button>

            <br></br>
            <br></br>


            <button
                    type="button"
                    onClick={this.handleClearBoard}
                    >
                    Clear Board
            </button>
           
            </center>

            <div className="pushLeft">
            <div className="flexRow">
                {grid.map((node) => {
                    const {location, data, isWalk, isRun} = node;
                    
                    if(location === (numberOfNodes - 1) && this.state.cyclePresent){
                        return(
                            <div>

                            <div className="flexRow">
                            <Node 
                            location={location}
                            data={data}
                            key={location}
                            isWalk={isWalk}
                            isRun={isRun}

                            />
                            </div>
                            
                            <div style={{height: 100, backgroundColor: "#435058", width: this.state.downArrowWidth, position: "relative", left: (this.state.nodeWidth - this.state.downArrowWidth) / 2 }}>
                            </div>

                            </div>
                        )
                    } else if(location == this.state.cycleTo && this.state.cyclePresent){
                        return(
                            <div>

                            <div className="flexRow">
                            <Node 
                            location={location}
                            data={data}
                            key={location}
                            isWalk={isWalk}
                            isRun={isRun}
                            />
                            <Pointer></Pointer>

                            </div>
                            <div style={{position: "relative", left: 10}}>
                                <div className="upTriangle">
                                </div>
                            </div>

                            <div style={{height: 100 - this.state.downArrowWidth, backgroundColor: "#435058", width: this.state.downArrowWidth, position: "relative", left: (this.state.nodeWidth - this.state.downArrowWidth) / 2 }}>
                            </div>
                            </div>
                            )} else{
                                    return(
                                        <div>
                            <div className="flexRow">
                            <Node 
                            location={location}
                            data={data}
                            key={location}
                            isWalk={isWalk}
                            isRun={isRun}
                            />
                            
                            <Pointer></Pointer>
                            </div>
                            </div>
                        )
                    }
                }
                )}
            </div>

            <div>
            {grid.map((node) => {
                const {location} = node;
                if(location == this.state.cycleTo && this.state.cyclePresent){
                    const cycleFromElem = document.getElementById(`node-${this.state.numberOfNodes - 1}`);
                    const cycleFromElemLocation = cycleFromElem.getBoundingClientRect();
                    const cycleFromX = cycleFromElemLocation.right;
                    
                    const cycleToElem = document.getElementById(`node-${this.state.cycleTo}`);
                    const cycleToElemLocation = cycleToElem.getBoundingClientRect();
                    const cycleToX = cycleToElemLocation.left;
                    
                    const boxWidth = Math.abs(cycleToX - cycleFromX) - (this.state.nodeWidth + this.state.downArrowWidth) / 2;
                    return(
                        <div>
                                <div style={{backgroundColor: "#435058", position: "relative", width: boxWidth + 5, left: cycleToX - 15, height: 25}}>
                                </div>
                            </div>
                        )
                    } 
                }
                
                
                )}




                </div>
</div>
        
        </div>




        );
    }
}


const createNode = (newData, nodeNumber) => {
    
    return{
        location: nodeNumber,
        key: nodeNumber,
        data: newData,
        nextNode: nodeNumber + 1,
        isWalk: false,
        isRun: false
    }
    
}