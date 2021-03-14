import React from 'react';
import { TiledHexagons } from 'tiled-hexagons';


const HexagonGrid = () => {
    return (
        <TiledHexagons
      maxHorizontal={5}
      tileBorderRadii={2}
      tileGap={5}
      tileSideLengths={60}
      tileElevations={0}
      tiles={() => {
        return {
          fill: '#752752',
          elevation: 0,
          shadow: ''
        };
    }} />
    );
};
        

export default HexagonGrid;