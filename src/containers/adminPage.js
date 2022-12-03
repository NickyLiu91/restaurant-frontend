import React from 'react';
import CreateAccount from './createAccount';

class AdminPage extends React.Component {

  state = {
    accountType: '',
    restaurant: {},
    items: {}
  }

  render() {

    return(
      <CreateAccount />
    )
  }
}

export default AdminPage
