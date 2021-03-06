import React from 'react'
import './shopping-cart-table.css'
import { connect } from 'react-redux'
import { bookAddedToCart, bookRemovedFromCart, allBooksRemovedFromCart } from '../../actions'

const ShoppingCartTable = ({ items, totalPrice, onIncrease, onDecrease, onDelete }) => {

  const renderRow = (item, idx) => {

    const { id, title, count, total } = item
    
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{count}</td>
        <td>${total}</td>
        <td className="text-right">
          <button 
            onClick={() => onIncrease(id)}
            className="btn btn-outline-success btn-small">
            <i className="fa fa-plus-circle" />
          </button>
          <button 
            onClick={() => onDecrease(id)}
            className="btn btn-outline-warning btn-small">
            <i className="fa fa-minus-circle" />
          </button>
          <button 
            onClick={() => onDelete(id)}
            className="btn btn-outline-danger btn-small">
            <i className="fa fa-trash-o" />
          </button>
        </td>
      </tr>
    )
  }

  return (
    <div className="shopping-cart-table">
      <h2>Your order</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          { items.map(renderRow) }
        </tbody>
      </table>

      <div className="total">
        Total: ${totalPrice}
      </div>
    </div>
  )
}

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal }}) => {
  return {
    items: cartItems,
    totalPrice: orderTotal
  }
}

const mapDispatchToProps = {
  
  onIncrease: bookAddedToCart,

  onDecrease: bookRemovedFromCart,

  onDelete: allBooksRemovedFromCart
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable)

