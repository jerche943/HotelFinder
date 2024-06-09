// pages/index.js

//import React from 'react';

// Define point class
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Find the point with minimum y coordinate
// In case of tie, choose the point with minimum x-coordinate
function findMinY(points) {
  let minY = 999999;
  let minIndex = 0;

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (point.y < minY || (point.y === minY && point.x < points[minIndex].x)) {
      minY = point.y;
      minIndex = i;
    }
  }

  return { point: points[minIndex], index: minIndex };
}

// Comparator for sorting
function polarComparator(p1, p2, p0) {
  const d = direction(p0, p1, p2);
  if (d < 0) {
    return -1;
  }
  if (d > 0) {
    return 1;
  }
  if (d === 0) {
    return distanceSq(p1, p0) < distanceSq(p2, p0) ? -1 : 1;
  }
}

// Function to calculate direction
function direction(p0, p1, p2) {
  
   var area = (p1.x - p0.x) * (p2.y - p0.y) - 
            (p1.y - p0.y) * (p2.x - p0.x);
   return area;
}

// Function to calculate squared distance
function distanceSq(p1, p2) {
  // Implement the distanceSq logic here
  var distance = Math.sqrt(Math.pow(p2.y-p1.y, 2) + Math.pow(p2.x-p1.x, 2));
  return distance;
}

// Graham scan algorithm
function grahamScan(points) {
  const { point: p0, index } = findMinY(points);

  // Swap points[0] with points[index]
  [points[0], points[index]] = [points[index], points[0]];

  // Sort the points (except p0) according to the polar angle
  // made by the line segment with x-axis in anti-clockwise direction
  const sortedPolar = points
    .slice(1)
    .sort((p1, p2) => polarComparator(p1, p2, p0));

  // If more than two points are collinear with p0, keep the farthest
  const toRemove = [];
  for (let i = 0; i < sortedPolar.length - 1; i++) {
    const d = direction(sortedPolar[i], sortedPolar[i + 1], p0);
    if (d === 0) {
      toRemove.push(i);
    }
  }
  const filteredSortedPolar = sortedPolar.filter((_, j) => !toRemove.includes(j));

  const m = filteredSortedPolar.length;
  if (m < 2) {
    console.log('Convex hull is empty');
  } else {
    const stack = [points[0], filteredSortedPolar[0], filteredSortedPolar[1]];
    let stackSize = 3;

    for (let i = 2; i < m; i++) {
      while (true) {
        const d = direction(stack[stackSize - 2], stack[stackSize - 1], filteredSortedPolar[i]);
        if (d < 0) {
          break;
        } else {
          stack.pop();
          stackSize -= 1;
        }
      }
      stack.push(filteredSortedPolar[i]);
      stackSize += 1;
    }
    return stack;
  }
}


const p0 = new Point(4,6);
const p1 = new Point(3,2);
const p2 = new Point(7,9);
const p3 = new Point(7,16);
const p4 = new Point(2,9);
const p5 = new Point(6,3);
const p6 = new Point(5,4);
const p7 = new Point(13,10);

const points = [p0, p1, p2, p3, p4, p5, p6, p7];

const graham = grahamScan(points);

for(var i = 0; i < graham.length; i++){

  console.log(graham[i]);
}




/*
// Example usage in a React component
const ConvexHull = () => {
  const points = [
    new Point(0, 0),
    new Point(1, 1),
    new Point(2, 2),
    // Add more points as needed
  ];

  const convexHull = grahamScan(points);

  // Render the convex hull points
  return (
    <div>
      {convexHull.map((point, index) => (
        <div key={index}>{`(${point.x}, ${point.y})`}</div>
      ))}
    </div>
  );
};

export default ConvexHull;
*/