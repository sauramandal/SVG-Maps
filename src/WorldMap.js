import React, { useState, useEffect } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const projection = geoEqualEarth()
  .scale(500)
  .translate([1800 / 2, 1000 / 2]);

const WorldMap = () => {
  const [geographies, setGeographies] = useState([]);

  useEffect(() => {
    fetch("/us-states.json").then((response) => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`);
        return;
      }
      response.json().then((worlddata) => {
        console.log(worlddata);
        setGeographies(feature(worlddata, worlddata.objects.states).features);
      });
    });
  }, []);

  return (
    <svg width={1000} height={700} viewBox="0 0 1000 700">
      <g className="countries">
        {geographies.map((d, i) => (
          <path
            key={`path-${i}`}
            d={geoPath().projection(projection)(d)}
            className="country"
            fill={`rgba(38,50,56,${(1 / geographies.length) * i})`}
            stroke="#FFFFFF"
            strokeWidth={0.5}
          />
        ))}
      </g>
      {/* <g className="markers">
        <circle
          cx={projection()([8, 48])[0]}
          cy={projection()([8, 48])[1]}
          r={10}
          fill="#E91E63"
          className="marker"
        />
      </g> */}
    </svg>
  );
};

export default WorldMap;
