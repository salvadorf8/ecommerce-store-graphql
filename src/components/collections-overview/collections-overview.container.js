import React from 'react';
//
import { Query } from 'react-apollo';
// to make graphql request
import { gql } from 'apollo-boost';

import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

// lesson 1
const GET_COLLECTIONS = gql`
    {
        collections {
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

const CollectionsOverviewContainer = () => (
    <Query query={GET_COLLECTIONS}>
        {(apollo) => {
            if (apollo.loading) {
                return <Spinner />;
            }

            return <CollectionsOverview collections={apollo.data.collections} />;
        }}
    </Query>
);

export default CollectionsOverviewContainer;
