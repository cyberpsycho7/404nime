import React from 'react'
import SwiperComponent from '../Other/SwiperComponent';


const AnimeInfoRelations = ({relations, title, show, currentWidth}) => {

  return (
    <div style={{display: `${show ? "block" : "none"}`}}>
      <h3 className="text-2xl font-medium mb-6 1480res:px-5">"{title}" relations</h3>
      {relations.length !== 0 ? 
        <SwiperComponent currentWidth={currentWidth} items={relations} type={"relation"}/>
      : 
        null}
    </div>
  );
}

export default AnimeInfoRelations