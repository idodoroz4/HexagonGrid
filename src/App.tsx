import Hexagon from './components/Hexagon/Hexagon';
import HexagonGrid from './components/Hexagon/HexagonGrid';

const baseData = [
  {
    text: 'Face',
    fill: '#4267b2',
    shadow: '#1a2947',
  },
  {
    text: 'Git',
    fill: '#282828',
    shadow: '#1a1a1a',
  },
  {
    text: 'Twitter',
    fill: '#1dcaff',
    shadow: '#0084b4',
  },
]

const hexagons = [...baseData, ...baseData, ...baseData, ...baseData, ...baseData, ...baseData, ...baseData]

 
const App = () => (
  <div style={{display: 'grid', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', }}>
    <div style={{width: '100%'}}>
      {/*<Hexagon sideLength={100} fill='red' elevation={0} img={react} text='oh' />
      <Hexagon sideLength={100} fill='#123566' elevation={0} img={react} text='YEAH!' />*/}
      <HexagonGrid 
        maxHorizontal={5}
        tileSideLengths={60}
        tileElevations={0}
        tileTextStyles={{
          fontFamily: 'Font Awesome Brands',
          fontSize: '24px',
          fill: 'white'
        }}
        tileGap={5}
        tileBorderRadii={9}
        tiles={hexagons}
      />
    </div>
  </div>
);

export default App;
