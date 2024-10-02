import React, { useState, useEffect } from 'react';
import spaceshipImg from './spaceship.png';
import bgImg from './bg.jpg' 
import planetImg from './planet.jpg'
import sunImg from './sun.jpg'

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverPlanet, setHoverPlanet] = useState('');

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const playAudio = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
  };

  const handlePlanetHover = (planet) => {
    setHoverPlanet(`You are on ${planet}`);
    playAudio(`You are on ${planet}`);
  };

  const planets = [
    { name: 'Mars',img: planetImg, top: '490px', left: '1290px' },
    { name: 'Jupiter', img: planetImg,top: '270px', left: '940px' },
    { name: 'Earth',img: planetImg, top: '350px', left: '680px' },
    { name: 'Venus',img: planetImg, top: '430px', left: '400px'},
    { name: 'Mercury', img: planetImg,top: '660px', left: '844px' },
    { name: 'Saturn', img: planetImg,top: '170px', left: '550px' },
    { name: 'Uranus', img: planetImg,top: '170px', left: '1180px' },
    { name: 'Neptune', img: planetImg,top: '160px', left: '1370px' },
    { name: 'Sun', img: sunImg,top: '530px', left: '-150px' },
    
  ];

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        backgroundImage: `url(${bgImg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}
    >
      
      <div
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          
        }}
      >
        <img
          src={spaceshipImg} 
          alt="Spaceship"
          style={{ width: '80px', height: '80px' }} 
        />
      </div>

      
      <div style={{ color: 'Aqua', position: 'fixed', top: '10px', left: '600px' ,fontSize:'35px'}}>
        Coordinates: X: {position.x}, Y: {position.y}
      </div>

      
      {planets.map((planet, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: planet.top,
            left: planet.left,
            color: 'white',
            fontSize: '40px',
          }}
          onMouseEnter={() => handlePlanetHover(planet.name)}
          onMouseLeave={() => setHoverPlanet('')}
        >
         <img
          src={planetImg}
          alt="planet"
          style={{ 
            width: '60px', 
            height: '60px',
            opacity: 0.0, 
          }}
        />
        <img
            src={sunImg}
            alt={sunImg}
            style={{
              width: planet.name === 'Sun' ? '600px' : '0px', 
              height: planet.name === 'Sun' ? '600px' : '0px',
              opacity: planet.name === 'Sun' ? 0 : 0.7, 
              borderRadius: planet.name === 'Sun' ? '50%' : '50%',
              
            }}
          />
        
        </div>
      ))}

     
      {hoverPlanet && (
        <div style={{ color: 'white', position: 'fixed', bottom: '10px', left: '1300px',fontSize:'42px'}}>
          {hoverPlanet}
        </div>
      )}
    </div>
  );
};

export default App;
