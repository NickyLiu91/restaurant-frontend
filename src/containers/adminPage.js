import React from 'react';
import CreateAccount from './createAccount';

class AdminPage extends React.Component {

  state = {
    accountType: '',
    restaurant: {},
    items: {}
  }

  render() {
    // console.log(this.state)
    return(
      <p>?????</p>
      // <CreateAccount account={this.props.account}/>
    )
  }
}

export default AdminPage
