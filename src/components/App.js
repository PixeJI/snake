import React from 'react';
import Board from './Board';
import Snake from '../Snake';
import GameOver from './GameOver';

export  default class App extends React.Component {
  static defaultSegments = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}];

  constructor(props) {
    super(props);
    this.Snake = new Snake(App.defaultSegments);
    this.size = {x: 25, y: 25};
    this.allPoints = this.generateAllPoints();
    this.state = {
      snake: this.Snake.Segments,
      food: this.generateFood(),
      gameOver: false,
      snakeDirection: Snake.direction.Right,
      vin: false
    };
  }

  newGameHandler = () => {
    this.Snake = new Snake(App.defaultSegments);
    this.setState({
      snake: this.Snake.Segments,
      food: this.generateFood(),
      gameOver: false,
      snakeDirection: Snake.direction.Right
    });
    this.run();
  };

  componentDidMount() {
    document.addEventListener("keydown", this._onKeyDown, false);
    this.run();
  }

  generateAllPoints = () => {
    let points = [];
    for (let i = 0; i < this.size.x; i++) {
      for (let j = 0; j < this.size.y; j++) {
        points.push({x: i, y: j})
      }
    }
    return points;
  };

  _onKeyDown = (event) => {
    switch (event.keyCode) {
      case 39:
        if (this.Snake.Direction !== Snake.direction.Left) {
          this.setState({snakeDirection: Snake.direction.Right});
        }
        break;
      case 40:
        if (this.Snake.Direction !== Snake.direction.Up) {
          this.setState({snakeDirection: Snake.direction.Down});
        }
        break;
      case 37:
        if (this.Snake.Direction !== Snake.direction.Right) {
          this.setState({snakeDirection: Snake.direction.Left});
        }
        break;
      case 38:
        if (this.Snake.Direction !== Snake.direction.Down) {
          this.setState({snakeDirection: Snake.direction.Up});
        }
        break;
    }
  };

  run() {
    this.timer = setInterval(() => this.step(), 100)
  }

  step() {
    this.Snake.Direction = this.state.snakeDirection;
    this.Snake.step();
    this.setState({snake: this.Snake.Segments});
    if (this.isWall(this.Snake.LastPosition) || this.isPositionSnake()) {
      clearInterval(this.timer);
      this.setState({gameOver: true});
      return;
    }
    if (this.Snake.LastPosition.x === this.state.food.x &&
        this.Snake.LastPosition.y === this.state.food.y) {
      this.Snake.eat({x: this.state.food.x, y: this.state.food.y});
      let newFood = this.generateFood();
      if (!newFood) {
        this.setState({vin: true});
      } else {
        this.setState({food: newFood});
      }
    }
  }

  isWall = (position) => {
    return (position.x > this.size.x - 1 || position.x < 0
    || position.y > this.size.y - 1 || position.y < 0)
  };
  isPositionSnake = () => {
    let newSnake = [...this.Snake.Segments];
    let head = newSnake.pop();
    return newSnake.find(item => item.x === head.x && item.y === head.y);
  };

  generateFood = () => {
    let freePoints = this.allPoints.filter(item => {
      return !this.Snake.Segments.find(point => point.x === item.x && point.y === item.y);
    });
    let point = Math.floor(Math.random() * freePoints.length);
    return freePoints[point];
  };

  componentWillUnmount() {
    clearInterval(this.timer);
    document.removeEventListener("keydown", this._onKeyDown, false);
  }

  render() {
    return (
        <div className="game">
          {this.state.gameOver ? <GameOver params="Game over" newGameHandler={this.newGameHandler}/> : ''}
          {this.state.vin ? <GameOver params="You vin" newGameHandler={this.newGameHandler}/> : ''}
          <div className="score">Score: {this.state.snake.length}</div>
          <Board size={this.size} snake={ this.state.snake} food={this.state.food}></Board>
        </div>
    )
  }
}