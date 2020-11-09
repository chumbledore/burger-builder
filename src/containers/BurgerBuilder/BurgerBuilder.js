import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    lettuce: .5,
    cheese: .75,
    meat: 1.3,
    bacon: 1,
    onion: .5
}

class BurgerBuilder extends Component {
    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data})
            })
            .catch(error => {
                this.setState({ error: true })
            });
    }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        checkout: false,
        loading: false,
        error: false
    }

    checkoutHandler = () => {
        this.setState({checkout: true})
    }

    checkoutCancelHandler = () => {
        this.setState({checkout: false})
    }
    
    checkoutContinueHandler = () => {
        // alert('You continue!')
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customerData: {
                name: 'Dakota Chumbley',
                address: {
                    street: 'Test Address, Prv St',
                    zipcode: '23910',
                    country: 'USA'
                },
                email: 'test@test.com',
            },
            delivery: 'express'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false, checkout: false });
            })
            .catch(error => {
                this.setState({ loading: false, checkout: false });
            });

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0})
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;
        
        let burger = this.state.error ? <p>Ingredients can not be loaded...</p> : <Spinner />;
         
        if(this.state.ingredients) {
            burger = (
                <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                price={this.state.totalPrice}
                checkout={this.checkoutHandler}/>
                </Aux>);
                orderSummary = <OrderSummary 
                   ingredients={this.state.ingredients}
                   checkoutCancel={this.checkoutCancelHandler}
                   checkoutContinue={this.checkoutContinueHandler}
                   price={this.state.totalPrice}/>;
        };
        if (this.state.loading) {
            orderSummary = <Spinner/>
        };
       

        return (
            <Aux>
                <Modal show={this.state.checkout}
                        modalClosed={this.checkoutCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default  withErrorHandler(BurgerBuilder, axios);