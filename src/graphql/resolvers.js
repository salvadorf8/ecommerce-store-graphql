import { gql } from 'apollo-boost';

// define the type ie the schema that this localside is going to use as we get access to
// extend means I want you to extend the existing mutations from the server side - if none exist, then its ok, we'll just add what we will call
// type defenition should be capitalized
// mutation defenition can be camelcase
export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }

    extend type Mutation {
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]!
    }
`;

const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`;

// we need to pull off the cartItems like we did with the carthidden when we pulled off the cartHidden
// @ means client directive
const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

// underscores means they are meant to not be modified (according to apollo docs)
// we will not be using the _root, but for future purpose, the _root will come into play when there is an association like collections and Items
export const resolvers = {
    // this is replacing redux state
    Mutation: {
        toggleCartHidden: (_root, _args, { cache }) => {
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN
            });

            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden }
            });

            return !cartHidden;
        },

        // destructuring from _root, _args, _context
        addItemToCart: (_root, { item }, { cache }) => {
            // add that cartItems above here
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            // make the new cartItems as a constant, which will be our function that will pass the items plus
            // the new item to add
            // const newCartItems = addItemToCart(cartItems, item);
            const newCartItems = [...cartItems, item];

            // now we're going to write to this query
            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });

            // then were going to return the newCartItems
            return newCartItems;
        }
    }
};

// leacture 244: we created our toggleCartHidden mutation and we used it
// to leverage local cache state of apollo in order to modify our application
// so now our cartHidden is stored in apollo instead of redux
