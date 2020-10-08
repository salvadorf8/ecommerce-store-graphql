import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// allows the application to access the state in apollo
import { ApolloProvider } from 'react-apollo';
// this createHttpLink will allow us to connect our client with the one graphql endpoint
import { createHttpLink } from 'apollo-link-http';
// this checks the data in cache
import { InMemoryCache } from 'apollo-cache-inmemory';
// access components
import { ApolloClient, gql } from 'apollo-boost';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
import { resolvers, typeDefs } from './graphql/resolvers';

const httpLink = createHttpLink({
    uri: 'https://crwn-clothing.com'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link: httpLink,
    cache,
    resolvers,
    typeDefs
});

client.writeData({
    data: {
        cartHidden: true,
        cartItems: []
    }
});

client
    .query({
        query: gql`
            {
                collections {
                    id
                    title
                    items {
                        id
                        imageUrl
                        name
                        price
                    }
                }
            }
        `
    })
    .then((res) => console.log('what is the response: ', res));

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);
