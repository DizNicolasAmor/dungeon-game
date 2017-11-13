import React from 'react';

class Stats extends React.Component {
  render(){
    return (
      <div className="container">
        <h4>
          <u>Health:</u> {this.props.health}
          <u>Level:</u> {this.props.level}
          <u>Exp:</u> {this.props.exp}
          <u>Attack:</u> {this.props.attack}
          <u>Dungeon:</u> {this.props.dungeon}
        </h4>

        <h2>{!this.props.isGameOn ? this.props.result : '' }</h2>

        <h2>
          <button class="btn btn-submit"
              onClick={this.props.reset}>NEW GAME
          </button>
        </h2>

      </div>
    );
  }
}

export default Stats;