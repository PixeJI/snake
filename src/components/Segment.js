import React from 'react';
export default  class Segment extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return ((nextProps.snake !== this.props.snake) || (nextProps.food !== this.props.food) )
  }

  render() {
    const style = {
      width: '17px',
      height: '17px',
      display: 'inline-block'
    };
    const {snake, food} = this.props;
    const classSnake = snake ? 'snake-segment ' : '';
    const classFood = food ? 'food-segment ' : '';
    return (
        <div className={classSnake + classFood} style={style}>

        </div>
    )
  }
}