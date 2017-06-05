export default  class Snake {
  static direction = {
    Right: 0,
    Down: 1,
    Left: 2,
    Up: 3
  };

  constructor(initial = [{x: 0, y: 0}]) {
    this._segments = [...initial];
    this._direction = Snake.direction.Right;
  }

  step() {
    let newSegments = null;
    let newSegment = Object.assign({}, this.LastPosition);
    switch (this._direction) {
      case Snake.direction.Right:
        newSegment.x = ++newSegment.x;
        newSegments = [...this._segments, newSegment];
        break;
      case Snake.direction.Down:
        newSegment.y = ++newSegment.y;
        newSegments = [...this._segments, newSegment];
        break;
      case Snake.direction.Left:
        newSegment.x = --newSegment.x;
        newSegments = [...this._segments, newSegment];
        break;
      case Snake.direction.Up:
        newSegment.y = --newSegment.y;
        newSegments = [...this._segments, newSegment];
        break;
    }
    newSegments.shift();
    this._segments = newSegments;
  }

  get LastPosition() {
    return this._segments[this._segments.length - 1];
  }

  get Segments() {
    return this._segments;
  }

  set Direction(direction) {
    this._direction = direction;
  }
  get  Direction(){
    return this._direction;
  }

  eat(point) {
    this._segments.push(point);
  }
}