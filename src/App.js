import React, { Component } from 'react';
import Output from './components/Output';
import InputKeys from './components/InputKeys';
import './App.css';

class App extends Component {
  state={
      answer:"",
      toggle:false,
      togglelimit:false
  }

  onClick=(button_name)=>{
      if(button_name === "C"){
          this.setState({answer: "",toggle:false})
      }
      else if(button_name === "CE"){
          this.setState({answer:this.state.answer.substring(0,this.state.answer.length-1)})
      }
      else if(button_name === "="){
          this.find_answer()
      }
      else{
          if(this.state.toggle===true){
            this.setState({answer:'',toggle:false},()=>this.setState({answer:this.state.answer+button_name}))
          }
          else{
              this.setState({answer:this.state.answer+button_name})
          }
      }
      console.log("CLicked")
  }
  find_answer = () => {
    try {
        var expression=""
        //taking care of leading zeroes
        for (var c of this.state.answer) {
            var i=0
            if(c==="0" && (i===0 || !((expression.charAt(expression.length-1)>="0")&&(expression.charAt(expression.length-1)<="9")))){
                continue
            }
            else{
                expression=expression+c
            }
            i=i+1
          }
        // eslint-disable-next-line
        var final_result=eval(expression) 
        //number of digits to show after decimal
        if(!Number.isInteger(final_result)){
            final_result=final_result.toFixed(3)
        } 
        //converting a large number to exponentialform
        if(Math.ceil(Math.log10(final_result + 1))>=11){
            final_result=final_result.toExponential(3)
        }
        
        this.setState({
            // eslint-disable-next-line
            answer:final_result,
            toggle:true
        })
    } catch (e) {
        this.setState({
            answer: "error",
            toggle:true
        })

    }
  } 
    render(){
    return (
        <div className="App">
         <div className="calculator_container">
         <Output answer={this.state.answer}/> 
         <InputKeys onClick={this.onClick}/>
         </div>
        </div>
      );
  }
  
}

export default App;
