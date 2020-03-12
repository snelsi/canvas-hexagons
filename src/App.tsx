import React from "react";
import useDimensions from "react-use-dimensions";
import { getHexagonsToFillZone } from "scripts";
import { Canvas } from "Canvas";
import { Hexagon } from "Hexagon";
import "./styles.css";

const App = () => {
  const [ref, { width, height }] = useDimensions();
  const dpr = window.devicePixelRatio || 1;
  return (
    <main ref={ref}>
      {width === undefined || height === undefined || dpr === undefined ? (
        <span role="img" aria-label="thinking face">
          🤔
        </span>
      ) : (
        <Canvas width={width} height={height} dpr={dpr} isAnimating>
          {getHexagonsToFillZone({
            height: height * dpr,
            width: width * dpr,
          }).map((hexagon, index) => (
            <Hexagon key={index} {...hexagon} />
          ))}
        </Canvas>
      )}
    </main>
  );
};

export default App;
