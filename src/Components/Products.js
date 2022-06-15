import React, { useContext } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { CartContext } from '../Global/CartContext'

export const Products = () => {

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
                        <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>BUY HOUSE</button>
                    </div>
                ))}
            </div>
        </>
    )
}
