import React from 'react';
import './index.css';
import { connect } from 'react-redux'


class TodoBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        editMode : false,
        userId : this.props.userId,
        title : this.props.title,
        changedUserId : this.props.userId,
        changedTitle : this.props.title
      }
    }
  
    componentWillReceiveProps(nextProps) {
      this.setState({
        userId : nextProps.userId,
        title : nextProps.title,
        changedUserId : nextProps.userId,
        changedTitle : nextProps.title
      })
    }
  
    toggleEdit() {
      console.log("TodoBox.toggleEdit()")
      this.setState({
        editMode : !this.state.editMode,
        changedUserId : this.state.userId,
        changedTitle : this.state.title
      })
    }
  
    submitClicked() {
      console.log("TodoBox.submitClicked()")
      let data = {
        "userId" : this.state.changedUserId,
        "title" : this.state.changedTitle
      }
  
      fetch('https://jsonplaceholder.typicode.com/todos/'+this.props.todoId, {
        method: 'PATCH',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
  
       }).then(response => response.json())
       .then(json => {
  
         this.setState({
           userId : json.userId,
           title : json.title,
           editMode : false
         });
  
       })
    }
  
    deleteClicked() {
      console.log("TodoBox.deleteClicked()")
      fetch('https://jsonplaceholder.typicode.com/todos/'+this.props.todoId, {
        method: 'DELETE'
       }).then(response => {
        if(response.ok){
          this.props.remove_todo(this.props.arrayIndex)
        }
       })
  
    }
  
    render() {
      if(!this.state.editMode){
        return(
          <div className="todoBox">
            <p><span>id: </span> <span>{this.props.todoId} </span></p>
            <p><span>userId: </span> <span>{this.state.userId} </span></p>
            <span>Title: </span> <span>{this.state.title} </span>
            <p>
              <button onClick={() => this.toggleEdit()} >edit</button>
              <button onClick={() => this.deleteClicked()}>delete</button>
            </p>
            
          </div>
        );
      }  
      return(
        <div className="todoBox">
          <p><span>userId: </span> <span><input type="number" value={this.state.changedUserId} onChange={(event) => {this.setState({changedUserId : event.target.value})}}/> </span></p>
          <span>Title: </span> <span><input type="text" value={this.state.changedTitle} onChange={(event) => {this.setState({changedTitle : event.target.value})}}/> </span>
          <p>
            <button onClick={() => this.submitClicked()}>submit</button>
            <button onClick={() => this.toggleEdit()}>cancel</button>
          </p>
          
        </div>
      );
    }
  }


  const mapDispatchToProps = dispatch => ({
    remove_todo: (index) => dispatch({type: 'REMOVE_TODO', index: index})
  });
  
  export default connect(null, mapDispatchToProps)(TodoBox);