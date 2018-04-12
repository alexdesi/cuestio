import React, { Component } from 'react';

class Responses extends Component {
  handleOptionChange(e){
    this.props.handleSelectOption(e.target.value)
  }

  render() {
    let question = this.props.question
    return (
      question.responses.map(r =>
        <div>
          <input type="radio" id={`response-${r[0]}`}
                 name="response"
                 onChange={ this.handleOptionChange.bind(this) }
                 value={r[0]}
                 key={`${question.id}-${r[0]}`}
          />
          <label for={`response-${r[0]}`}>{r[1]}</label>
        </div>
      )
    )
  }
}

export { Responses }
