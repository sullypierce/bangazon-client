import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import Register from "./auth/Register"
import Login from "./auth/Login"
import ProductList from "./product/ProductList"
import Order from "./Order/order"
import CompleteOrder from "./Order/CompleteOrder"
import PaymentTypeForm from "./paymentType/PaymentTypeForm"
import SellProductForm from "./product/SellProductForm"
import { isAuthenticated } from "./helpers/simpleAuth"
import ProductDetail from "./product/ProductDetail"

class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/" render={props => {
            return <ProductList {...props} />
          }}
        />
        <Route
          exact path="/name/:searchTerm" render={props => {
            return <ProductList {...props} isNameSearch={true}/>
          }}
        />
        <Route
          exact path="/product/:productId(\d+)" render={props => {
            return <ProductDetail {...props} />
          }}
        />
        <Route
          exact path="/city/:searchTerm" render={props => {
            return <ProductList {...props} isCitySearch={true}/>
          }}
          />
          <Route
            exact path="/shoppingcart" render={props => {
            return <Order {...props} />
          }}
        />
         <Route
          exact path="/add/paymenttype" render={props => {
            return <PaymentTypeForm {...props} />
          }}
        />
        <Route
          path="/register" render={props => {
            return <Register {...props} />
          }}
        />
        <Route 
        path="/completeorder" render={props => {
          return <CompleteOrder {...props} />
        }}
      />
        <Route
          path="/login" render={props => {
            return <Login {...props} />
          }}
        />
        <Route exact path="/sell-product" render={(props) => {
          if(isAuthenticated()) {
            return <SellProductForm {...props} />
          } else {
            return <Redirect to="/" />
          }
        }} />
      </React.Fragment>
    )
  }
}

export default ApplicationViews
