import React from 'react';

class LoginPage extends React.Component {

  state = {
    name: '',
    password: ''
  }

  handleStuff = (event) => {
   this.setState({
     [event.target.id]: event.target.value
   })
  }

  login = () => {
    fetch(`http://localhost:3000/api/login`, {
     method: 'POST',
     headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
     },
     body: JSON.stringify(
     {
       account: {
          name: this.state.name,
          password: this.state.password
       }
     }
    )
  })
  .then(res => res.json())
  .then(json => {
    localStorage.setItem('jwt', json.jwt)})
  }

  render() {
    return(
      <div>
      <h1>Login!</h1>
      Account name: <input id="name" type="text" value={this.state.name} onChange={event => this.handleStuff(event)}/>
      <br/>
      <br/>
      Password: <input id="password" type="password" value={this.state.password} onChange={event => this.handleStuff(event)}/>
      <br/>
      <br/>
      <button onClick={this.login}>Login</button>
      </div>
    )
  }
}

export default LoginPage
