import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class WelcomeText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show : true
    }
  }
 
  toggleClicked() {
    this.setState({
      show : !this.state.show
    });
  }
 
  render() {
    if(this.state.show)
     return (
      <div>
        <span>Hello, {this.props.name} </span>
        <button onClick={() => this.toggleClicked()}>Toggle</button>
      </div>
     );
    return (
    <div>
      <button onClick={() => this.toggleClicked()}>Toggle</button>
    </div>
    );
  }
 }
 

 class Welcome extends React.Component {
  render() {
      return(
        <div>
          <WelcomeText name="Bob"/>
          <WelcomeText name={this.props.name}/>
        </div>
      );
  }
 }
 
 
 

ReactDOM.render(<Welcome name="John" />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
