
import React, { Component, useContext } from "react";
import { ProductsContext } from '../Global/ProductsContext'
import { CartContext } from '../Global/CartContext'
import {property_manager} from "../contracts/property_manager.json";
import {Property} from "../contracts/Property.json";
import getWeb3 from "./getWeb3";
export class Products extends Component  {
     state = {cost: 0, propertyName: "exampleproperty1", loaded:false};

    componentDidMount = async () => {
      try {
        // Get network provider and web3 instance.
        this.web3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        this.accounts = await this.web3.eth.getAccounts();
  
  
        // Get the contract instance.
        const networkId = await this.web3.eth.net.getId();
  
        this.propertyManager = new this.web3.eth.Contract(
          property_manager.abi,
          property_manager.networks[networkId] && property_manager.networks[networkId].address,
        );
        this.property = new this.web3.eth.Contract(
          Property.abi,
          Property.networks[networkId] && Property.networks[networkId].address,
        );
        this.listenToPaymentEvent();
       
        this.setState({loaded:true});
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };
  
    runExample = async () => {
      const { accounts, contract } = this.state;
  
      // Stores a given value, 5 by default.
      await contract.methods.set(5).send({ from: accounts[0] });
  
      // Get the value from the contract to prove it worked.
      const response = await contract.methods.get().call();
  
      // Update state with the result.
      this.setState({ storageValue: response });
    };
    handleSubmit = async () => {
      const { cost, propertyName } = this.state;
      console.log(propertyName, cost, this.propertyManager);
      let result = await this.propertyManager.methods.createPropertyNFt(propertyName, cost).send({ from: this.accounts[0] });
      console.log(result);
      alert("Send "+cost+" Wei to "+result.events.Step.returnValues._address);
    };
  
    handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
    
    listenToPaymentEvent = () => {
      let self = this;
      this.propertyManager.events.Step().on("data", async function(evt) {
        if(evt.returnValues._step === 1) {
          let property = await self.propertyManager.methods.properties(evt.returnValues._Propertyindex).call();
          console.log(property);
          alert("Property " + property._identifier + " was paid, deliver keys now!");
        };
        console.log(evt);
      });
    }
 

  
    render() {
        const { products } = useContext(ProductsContext);
        console.log(products);
        const { dispatch } = useContext(CartContext);
    return (
        <>
            {products.length !== 0 }
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.productImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.Adress}
                        </div>
                        <div className='product-price'>
                            ETH {product.Price}.00
                    </div>
                        <button className='addcart-btn' onClick={() => this.handleSubmit()}>BUY HOUSE</button>
                    </div>
                ))}
            </div>
        </>
    )
                }
}

