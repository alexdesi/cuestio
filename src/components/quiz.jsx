import React, { Component } from 'react'
import { Question } from './question'

class Quiz extends Component {
  constructor(props){
    super(props)
    this.state = {
                   currentQuestionId: 0,
                   responses: [],
                   completed: false
                 }
  }

  handleNextQuestion(currentResponse){

    let currentQuestionId = this.state.currentQuestionId
    let newResponses = this.state.responses.concat({
                           id: currentQuestionId,
                           response: currentResponse
                         })

    if (currentQuestionId < this.props.questions.length) {
      currentQuestionId++

      this.setState({
        currentQuestionId: currentQuestionId,
        responses: newResponses,
        completed: (currentQuestionId == this.props.questions.length)
      })
    }
  }

  score(){
    let correctResponses = this.props.questions.filter((q, i) => 
          q.correctResponse == this.state.responses[i].response
        )
    let score = correctResponses.length / this.state.responses.length
    return(score)
  }

  render(){
    return(
      <div>
        { !this.state.completed ?
          <Question question={this.props.questions[this.state.currentQuestionId]}
                    questionsNumber={this.props.questions.length}
                    handleNextQuestion={this.handleNextQuestion.bind(this)} /> :
          <div>
            <p>Test completed! Well done :)</p>
            <p>Your score is: {this.score()}</p>
          </div>
        }
      </div>
    )
  }
}

export { Quiz }