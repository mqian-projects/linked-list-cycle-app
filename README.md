## Linked List Cycle Detector Visualization

An application used to help visualize linked lists and how to detect cycles using Floyd's Cycle-Finding Algorithm.

![Alt text](/screenshot1.png?raw=true "Screenshot1")


## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Start Server:

`npm start`  


## Reflection

This was a personal project after learning Floyd's Cycle-Finding Algorithm in my Data Structures class. The goal of this project was to visualize this algorithm and learn how to use the React framework for future project development. I started this process by using the `create-react-app` boilerplate to minimize the initial set-up time.
One of the main challengs I ran into was translating the actual algorithm into a React function. Because I used an array to map the nodes in React, I had to translate the algorithm from its original context, a linked-list, to the array structure used in the app. After finding some proofs online and testing numerous different cases, I created a modified algorithm used to simulate a linked list cycle dectector with an array.  

In total, the technologies used were VanillaJS, JSX, CSS, and HTML. These were all languages I had not known prior to this project, and much of the project time was spent learning these in addition to developing the array algorithm. In the next iteration of this project, I plan to add new data structures and algorithms for visualization.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).