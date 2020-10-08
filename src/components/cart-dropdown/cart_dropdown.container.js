import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CartDropdown from './cart-dropdown.component';

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;

const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

const CartDropdownContainer = () => (
    <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {
            //
            (toggleCartHidden) => (
                <Query query={GET_CART_ITEMS}>
                    {
                        // we are wrapping the component so it gets the two functionalities
                        // cartItems and toggleCartHidden
                        ({ data: { cartItems } }) => <CartDropdown cartItems={cartItems} toggleCartHidden={toggleCartHidden} />
                    }
                </Query>
            )
        }
    </Mutation>
);

export default CartDropdownContainer;
