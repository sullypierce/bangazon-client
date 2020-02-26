import React, { Component } from "react"
import OrderProduct from "./OrderProduct"
import { isAuthenticated } from "../helpers/simpleAuth"
import ApiManager from "../utility/ApiManager"

class Order extends Component {


    state = {
        orderProducts: []
    }

    componentDidMount() {
        // this.getShoppingCartInfo()
    }

    loggedInUserId = () => JSON.parse(localStorage.getItem("credentials")).userId

    deleteProductFromCart = (idArray) => {
        Promise.all(
        idArray.forEach(id => {
            ApiManager.delete("orderproducts", id)
        }))
        .then(this.getShoppingCartInfo)
    }

    getShoppingCartInfo = () => {
        if (isAuthenticated())
            ApiManager.get("orderproducts")
            .then(items => {
                console.log(items)
                this.setState({orderProducts: items})})
        
    }

    cancelOrder = (orderId) => {
        ApiManager.delete(orderId)
        .then(this.getShoppingCartInfo)
    }

    render() {
        return (
            <>
                <article>
                    {
                        this.state.orderProducts.map(item =>
                            <OrderProduct
                                key={item.id}
                                item={item}
                                {...this.props}
                            />)
                    }
                </article>
                <button>Cancel Order</button>
                <button onClick = {() => this.props.changeDisplay("Complete Order")}>Complete Order</button>
            </>
        )
    }

}

export default Order