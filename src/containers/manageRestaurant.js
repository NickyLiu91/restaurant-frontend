import React from 'react';
import {connect} from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class ManageRestaurant extends React.Component {

  state = {
    name: '',
    price: '',
    image: '',
    edit: false,
    editItemName: '',
    editItemPrice: '',
    editItemImage: '',
    editItemId: ''
  }

  // componentDidMount(){
  //   fetch(`http://localhost:3000/api/restaurants/menu/${this.props.restaurant.id}`)
  //   .then(res => res.json())
  //   .then(json => {
  //     this.props.changeRestaurant(json)
  //     this.props.changeMenu(json.menuitems)
  //     this.props.changeOrders(json.orders)
  //     this.setState({
  //       restaurantId: this.props.restaurant.id
  //     })
  //   })
  // }


  handleStuff = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

 createMenuItem = () => {
   console.log(this.state)
     fetch(`http://localhost:3000/api/menuitems`, {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
       },
       body: JSON.stringify(
       {
         restaurant_id: this.props.restaurant.id,
         name: this.state.name,
         price: this.state.price,
        //  image: `${this.state.image}.png`
       }
      )
    })
    .then(res => res.json())
    .then(json => {
      let updatedMenu = [... this.props.menu, json]
      this.props.changeMenu(updatedMenu)
    })

 }

 deleteItem = (item) => {
   console.log(item)
   fetch(`http://localhost:3000/api/menuitems/${item.id}`, {
     method: 'DELETE',
     headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
     }
   })
   .then(res => {
     let newMenu = this.props.menu
     let matchingItemIndex = this.props.menu.findIndex(menuItem => menuItem.id == item.id)
     newMenu.splice(matchingItemIndex, 1)

     this.props.changeMenu(newMenu)
   })
 }


  editItem = (item) => {
    this.setState({
      edit: true,
      editItemName: item.name,
      editItemPrice: item.price,
      // editItemImage: item.image,
      editItemId: item.id
    })
  }

  editImage = event => { 
    this.setState({ editItemImage: event.target.files[0] }, () => {console.log(this.state.editItemImage.name)});
  };

  submitItemEdit = (item) => {

    const updatedItem = new FormData()

    let data = {
      menuitem: {
        name: this.state.editItemName,
        price: this.state.editItemPrice,
        image: this.state.editItemImage
      }
    };
    
    for(let dataKey in data) {
      for (let menuitemKey in data[dataKey]) {
        updatedItem.append(`menuitem[${menuitemKey}]`, data[dataKey][menuitemKey]);
      }
    }

    fetch(`http://localhost:3000/api/menuitems/${item.id}`, {
      method: 'PUT',
      headers: {
        //  'Content-Type': 'application/json',
        //  'Accept': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    //   body: JSON.stringify(
    //   {
    //     name: this.state.editItemName,
    //     price: this.state.editItemPrice,
    //     image: this.state.editItemImage
    //   }
    //  )
      body: updatedItem
      
   })
    .then(res => res.json())
    .then(json => {
      let newMenu = this.props.menu
      console.log(newMenu)
      let matchingItemIndex = this.props.menu.findIndex(menuItem => menuItem.id == item.id)
      console.log(matchingItemIndex)
      newMenu[matchingItemIndex] = json
      console.log(newMenu)

      this.props.changeMenu(newMenu)
      this.cancelEdit()
    })
  }

 generateMenu = () => {
   let list = this.props.menu
   console.log(list)

   return list.map(
     item => {
      console.log(item)
       return (
         <div>
           {!this.state.edit || this.state.editItemId != item.id ?
             <div>
               <p>Name: {item.name}</p>
               {item.image ? <img src={item.image.url}></img> : null}
               <p>Price: {parseFloat(item.price)}</p>
               <button onClick={() => {this.deleteItem(item)}}> - </button>
               <button onClick={() => {this.editItem(item)}}> Edit </button>
             </div> :
             <div>
               Name: <input id="editItemName" type="text" value={this.state.editItemName} onChange={event => this.handleStuff(event)}/>
               <br/>
               <br/>
               Price: <input id="editItemPrice" type="integer" value={this.state.editItemPrice} onChange={event => this.handleStuff(event)}/>
               <br/>
               <br/>
               {/* Image: <input id="editItemImage" type="text" value={this.state.editItemImage} onChange={event => this.handleStuff(event)}/> */}
               {item.image ? <img src={item.image.url}></img> : null}
               <input id="editItemImage" type="file" accept="image/*" multiple={false} onChange={this.editImage} />
               <br/>
               <br/>
               {!this.state.edit ? <button onClick={() => {this.editItem(item)}}> Edit </button> :
               <button onClick={() => {this.submitItemEdit(item)}}> Submit Edit </button>
               }
               <button onClick={this.cancelEdit}> Cancel </button>
             </div>
           }
         </div>
       )
     }
   )
 }

 cancelEdit = () => {
   this.setState({
     edit: true,
     editItemName: '',
     editItemPrice: '',
     editItemImage: '',
     editItemId: ''
   })
 }

  render() {
    if (Object.keys(this.props.account).length != 0) {
        return(
          <div>
              <button onClick={() => {console.log(this.props)}}>test</button>
              <div>
              <h1>MENU</h1>
                {this.generateMenu()}
                <button onClick={() => {this.submitOrder()}}>Submit Order</button>
              </div>
              Name: <input id="name" type="text" value={this.state.name} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Price: <input id="price" type="integer" value={this.state.price} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              {/* Image: <input id="image" type="text" value={this.state.image} onChange={event => this.handleStuff(event)}/> */}
              <br/>
              <br/>
              <button onClick={this.createMenuItem}>Add Item</button>
        </div>
        )
    } else {
      return(
        <div>
        temp
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
    restaurant: state.restaurantChanger.restaurant,
    menu: state.menuChanger.menu,
    location: state.locationChanger.location,
    orders: state.ordersChanger.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAccount: (event) => dispatch({type: "CHANGE_ACCOUNT", newAccount: event}),
    changeRestaurant: (event) => dispatch({type: "CHANGE_RESTAURANT", newRestaurant: event}),
    changeMenu: (event) => dispatch({type: "CHANGE_MENU", newMenu: event}),
    changeLocation: (event) => dispatch({type: "CHANGE_LOCATION", newLocation: event}),
    changeOrders: (event) => dispatch({type: "CHANGE_ORDERS", newOrders: event})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageRestaurant)
