import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { default as CollectionItem } from './collection-item.container';

const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: Item!) {
        addItemToCart(item: $item) @client
    }
`;

// this is just a shorthand way so we dont have to pass the variables prop, then grab the item
const CollectionItemContainer = (props) => (
    <Mutation mutation={ADD_ITEM_TO_CART}>
        {
            //
            (addItemToCart) => (
                //
                <CollectionItem {...props} addItem={(item) => addItemToCart({ variables: { item } })} />
            )
        }
    </Mutation>
);

export default CollectionItemContainer;
