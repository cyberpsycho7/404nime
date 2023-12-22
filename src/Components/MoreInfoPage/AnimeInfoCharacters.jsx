import React from 'react'
import SwiperComponent from '../Other/SwiperComponent';

const AnimeInfoCharacters = ({characters, currentWidth, title, show}) => {
  return (
    <div style={{ display: `${show ? "block" : "none"}` }}>
      <h3 className="text-2xl font-medium mb-6 1480res:px-5">"{title}" characters</h3>
      {characters.length !== 0 ? 
        <SwiperComponent
          currentWidth={currentWidth}
          items={characters}
          type={"character"}
        /> 
      :
        <div className="text-2xl font-medium mb-6 1480res:px-5">Characters not found</div>}
    </div>
  );
}

export default AnimeInfoCharacters