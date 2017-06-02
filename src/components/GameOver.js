import React from 'react';

export default ({newGameHandler , params}) => {
  return (
      <div className="game-over">
        <h2> {params}</h2>
        <button className="btn-new-game" onClick={newGameHandler}> Click to continue</button>
      </div>
  )
}