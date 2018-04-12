import React, { Component } from 'react'
import { Responses } from './responses'

class Question extends Component {
  constructor(props){
    super(props)
    this.state = { response: null }
  }

  handleSelectOption(response) {
    this.setState({response: response })
  }

  handleConfirm() {
    if (this.state.response === null) {
      alert('Hey! No response is not a response :)')
    }else{
      this.props.handleNextQuestion(this.state.response)
      this.setState({response: null })
    }
  }

  render(){
    return(
      <div>
        <p>Question {this.props.question.id} of {this.props.questionsNumber}</p>
        <h3>{ this.props.question.body }</h3>
        <Responses question={ this.props.question }
                   handleSelectOption={ this.handleSelectOption.bind(this) }/>
        <button onClick={ this.handleConfirm.bind(this) }>Confirm</button>
      </div>
    )
  }
}

export { Question }
