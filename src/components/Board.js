import React from 'react';
import Segment from './Segment';

export default  class Board extends React.Component {
  constructor(props) {
    super(props);
    this.rows = new Array(this.props.size.y).fill(0);
    this.columns = new Array(this.props.size.x).fill(0);
  }

  render() {
    const {snake, food} = this.props;
    const board = this.rows.map((y, indexY) => {
      const row = this.columns.map((x, indexX) => {
        let snakeSegment = snake.find(item => item.x === indexX && item.y === indexY);
        let isFood = food.x === indexX && food.y === indexY;
        return <Segment snake={snakeSegment} food={isFood} key={indexX}/>
      });
      return <div className="row" key={indexY}> {row}</div>
    });
    return (
        <div className="board"> {board}</div>
    )
  }
}