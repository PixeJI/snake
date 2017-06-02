import React from 'react';

export default  ({snake, food}) => {
  const style = {
    width: '17px',
    height: '17px',
    // border: '1px solid black',
    display: 'inline-block'
  };
  const classSnake = snake ? 'snake-segment ' : '';
  const classFood = food ? 'food-segment ': '';
  return (
      <div className={classSnake + classFood} style={style}>

      </div>
  )
}