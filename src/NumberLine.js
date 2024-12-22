import React, { useState } from "react";
import Sketch from "react-p5";

const NumberLine = () => {
  const [a, setA] = useState(0); // Main point 'a'
  const [b, setB] = useState(0); // Offset for arrows
  const [dragging, setDragging] = useState(false); // Drag state for 'a'

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 300).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(255, 255, 180); // Light yellow background

    // Draw the number line
    p5.stroke(128);
    p5.strokeWeight(2);
    p5.line(50, 150, 750, 150);

    // Draw ticks and labels
    for (let i = -10; i <= 10; i++) {
      const x = p5.map(i, -10, 10, 50, 750);
      p5.stroke(0);
      p5.line(x, 145, x, 155); // Tick marks
      p5.noStroke();
      p5.fill(0);
      p5.textSize(14);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text(i, x, 170); // Tick labels
    }

    // Calculate positions for points
    const xA = p5.map(a, -10, 10, 50, 750); // Main point
    const xLeft = p5.map(a + b, -10, 10, 50, 750); // Green arrow end (a + b)
    const xRight = p5.map(a - b, -10, 10, 50, 750); // Red arrow end (a - b)

    // Draw arrows and circles
    // Arrow pointing left
    p5.stroke(0, 200, 0); // Green color
    p5.line(xA, 150, xLeft, 150); // Line from 'a' to left
    p5.fill(0, 200, 0);
    p5.ellipse(xLeft, 150, 15); // Green circle at negative offset

    // Arrow pointing right
    p5.stroke(255, 0, 0); // Red color
    p5.line(xA, 150, xRight, 150); // Line from 'a' to right
    p5.fill(255, 0, 0);
    p5.ellipse(xRight, 150, 15); // Red circle at positive offset

    // Draw draggable point A
    p5.fill(0, 0, 255); // Blue color for 'a'
    p5.stroke(0);
    p5.ellipse(xA, 150, 20); // Draggable point for 'a'

    // Display values for a and b
    p5.fill(0);
    p5.textSize(18);
    p5.textAlign(p5.LEFT, p5.CENTER);
    p5.text(`a = ${a}`, 50, 50);
    p5.text(`b = ${b}`, 50, 80);
  };

  const mousePressed = (p5) => {
    const xA = p5.map(a, -10, 10, 50, 750); // Position of point 'a'
    const d = p5.dist(p5.mouseX, p5.mouseY, xA, 150);
    if (d < 10) {
      setDragging(true); // Start dragging 'a' if near enough
    }
  };

  const mouseDragged = (p5) => {
    if (dragging) {
      const newA = p5.map(p5.mouseX, 50, 750, -10, 10);
      setA(p5.constrain(Math.round(newA), -10, 10)); // Update 'a' within range
    }
  };

  const mouseReleased = () => {
    setDragging(false); // Stop dragging
  };

  const handleInputChangeA = (e) => {
    let value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      value = Math.max(-10, Math.min(10, value)); // Clamp value between -10 and 10
      setA(value);
    }
  };

  const handleInputChangeB = (e) => {
    let value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      value = Math.max(-10, Math.min(10, value)); // Clamp value between -10 and 10
      setB(value);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Sketch
        setup={setup}
        draw={draw}
        mousePressed={mousePressed}
        mouseDragged={mouseDragged}
        mouseReleased={mouseReleased}
      />
      <div style={{ marginTop: 20 }}>
        <label>
          Enter value (a):{" "}
          <input
            type="number"
            value={a}
            onChange={handleInputChangeA}
            min={-10}
            max={10}
            style={{
              width: "50px",
              textAlign: "center",
              fontSize: "16px",
              marginLeft: "10px",
            }}
          />
        </label>
        <label style={{ marginLeft: "20px" }}>
          Enter value (b):{" "}
          <input
            type="number"
            value={b}
            onChange={handleInputChangeB}
            min={-10}
            max={10}
            style={{
              width: "50px",
              textAlign: "center",
              fontSize: "16px",
              marginLeft: "10px",
            }}
          />
        </label>
        <button
          onClick={() => {
            setA(0);
            setB(0);
          }}
          style={{
            marginLeft: "20px",
            padding: "5px 10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
      <div style={{ marginTop: 20, fontSize: "18px" }}>
        <p>
          <strong>Addition:</strong> ({a}) + ({b}) = {a + b}
        </p>
        <p>
          <strong>Subtraction:</strong> ({a}) - ({b}) = {a - b}
        </p>
      </div>
    </div>
  );
};

export default NumberLine;
