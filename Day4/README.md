# Project - Day 4

## Challenge
You must create a short program which can run in a browser and search through a digital maze until you find the exit.
The maze will be defined as an API where the entry point is [here](http://dealeron-maze.s3-website-us-east-1.amazonaws.com).
Each "position" identified by a GUID, and is located at a url matching:

```
http://dealeron-maze.s3-website-us-east-1.amazonaws.com/{guid}.txt.
```

Each position will contain one of the following:
* "The End"
* "Not it"
* A list of guids, one on each line, which represent "routes" you that can be explored

Example for positon 121274bc-1fa2-40ca-b26a-b75f3ad8f299: 

```
http://dealeron-maze.s3-website-us-east-1.amazonaws.com/121274bc-1fa2-40ca-b26a-b75f3ad8f299.txt
```

There is a single exit to the maze, which will say "The end".

### Expected Output
Display a loading icon of some kind until the maze is solved.
Then write the position of the end to the screen.

Feel free do we much or as little UI as you wish.

### Resources

```javascript
// Fetch something over http and read as text
fetch("/some/resource")
  .then(res => res.text())
  .then(text => { /* use text */ });


// Do stuff in parallel

Promise.all([promise1,promise2])
  .then(([rezult1,result2]) => { /* use results */ });

```

### Bounus Points
* Not all browsers support the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch). Try writing your own promise-based wrapper for [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
* Add A UI to show the maze ([d3](https://d3js.org/) has some nice [stuff](http://bl.ocks.org/d3noob/8375092), but could also just do something simple with HTML)