import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionPage from './collection.component';
import Spinner from '../../components/spinner/spinner.component';

// lesson 2
const GET_COLLECTION_BY_TITLE = gql`
    query getCollectionsByTitle($title: String!) {
        getCollectionsByTitle(title: $title) {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

const CollectionContainer = (props) => {
    const { match } = props;
    // Just to show that props has nothing to do with graphQL or apollo
    console.log('react props: ', props);

    return (
        <Query query={GET_COLLECTION_BY_TITLE} variables={{ title: match.params.collectionId }}>
            {
                // usually the following are destructured {loading, error, data}
                // currently defining "promise" because thats what it is just for learning purpose to see what is coming through
                (promise) => {
                    console.log('apollo promise: ', promise);

                    if (promise.loading) {
                        return <Spinner />;
                    }

                    const { getCollectionsByTitle } = promise.data;

                    return <CollectionPage collection={getCollectionsByTitle} />;
                }
            }
        </Query>
    );
};

export default CollectionContainer;
