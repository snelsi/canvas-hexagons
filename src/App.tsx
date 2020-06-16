import * as React from "react";
import useDimensions from "react-use-dimensions";
import { getHexagonsToFillZone, IHexagon } from "scripts";
import { Canvas } from "Canvas";
import { Hexagon } from "Hexagon";

import { GitHubLink } from "GitHubLink";

import "./styles.css";

const App: React.FC = () => {
  const [ref, { width, height }] = useDimensions();
  const dpr = window.devicePixelRatio || 1;

  const [hexagons, setHexagons] = React.useState<IHexagon[]>(() =>
    getHexagonsToFillZone({
      height: height * dpr,
      width: width * dpr,
    }),
  );

  const getNewHexagons = React.useCallback(
    () =>
      setHexagons(
        getHexagonsToFillZone({
          height: height * dpr,
          width: width * dpr,
        }),
      ),
    [height, width, dpr],
  );

  React.useEffect(() => {
    getNewHexagons();
  }, [getNewHexagons]);

  return (
    <main ref={ref}>
      {width === undefined || height === undefined || dpr === undefined || !hexagons ? (
        <span role="img" aria-label="thinking face">
          🤔
        </span>
      ) : (
        <Canvas width={width} height={height} dpr={dpr} isAnimating onClick={getNewHexagons}>
          {hexagons.map((hexagon, index) => (
            <Hexagon key={index} {...hexagon} />
          ))}
        </Canvas>
      )}
      <GitHubLink />
    </main>
  );
};

export default App;
