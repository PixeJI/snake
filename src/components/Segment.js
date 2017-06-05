import React from 'react';
export default  class Segment extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return ((nextProps.snake !== this.props.snake) || (nextProps.food !== this.props.food) )
  }

  render() {
    const {snake, food} = this.props;
    const classSnake = snake ? 'snake-segment ' : '';
    const classFood = food ? 'food-segment ' : '';
    return (
        <div className={`segment ${classSnake} ${classFood}`}/>
    )
  }
}