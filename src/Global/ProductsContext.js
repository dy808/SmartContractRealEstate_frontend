import React, { createContext } from 'react'
import { db } from '../Config/Config'

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        products: []
    }

   

    componentDidMount() {

        const prevProducts = this.state.products;
        db.collection('NTF').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevProducts.push({
                        ProductID: change.doc.id,
                        Adress: change.doc.data().Adress,
                        Price: change.doc.data().Price,
                        productImg:change.doc.data().productImg
                      
                    })
                }
                this.setState({
                    products: prevProducts
                })
            })
        })

    }
    
    render() {
        return (
            <ProductsContext.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}

