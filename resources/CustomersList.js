import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  Card,
  ResourceList,
  TextStyle,
  Thumbnail,
} from '@shopify/polaris';
import store from 'store-js';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';


const GET_ALL_CUSTOMERS_WITH_ORDERS = gql`
  query
 {
   customers(first: 5) {
     edges {
       node {
         id
         displayName
         image {
           originalSrc
         }
         email
         acceptsMarketing
         defaultAddress {
           name
           address1
           address2
           city
           province
           country
           zip
         }
         ordersCount
         orders(first: 3) {
           edges {
             node {
               processedAt
               totalPriceSet {
               	    shopMoney {
                        amount
                    }
          	    }
               subtotalLineItemsQuantity 
               currencyCode
               name
               displayFulfillmentStatus 
               fullyPaid
             }
           }
         }
       }
     }
   }
}
`;

class CustomerList extends React.Component {
  static contextType = Context;

  render() {
    const app = this.context;
    const redirectToOrders = () => {
      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.APP,
        '/orders',
      );
    };

    return (
      <Query query={GET_ALL_CUSTOMERS_WITH_ORDERS} variables={{ ids: store.get('ids') }}>
        {({ data, loading, error }) => {
          if (loading) { return <div>Loading…</div>; }
          if (error) { return <div>{error.message}</div>; }
          console.log(data.customers.edges)
          return (
            <Card>
                <ResourceList
                showHeader
                resourceName={{ singular: 'Customer', plural: 'Customers' }}
                items={data.customers.edges}
                renderItem={(item) => {
                    const media = (
                        <Thumbnail
                          source={
                            item.node.image
                              ? item.node.image.originalSrc
                              : ''
                          }
                          alt={
                            item.node.image
                              ? item.node.image.__typename
                              : ''
                          }
                        />
                      );
                  return (
                    <ResourceList.Item
                      id={item.node.id}
                      media={media}
                      accessibilityLabel={`View details for ${item.node.displayName}`}
                      onClick={() => {
                        const customer = item.node.displayName;
                        const orders = item.node.orders.edges;
                        const rowOrders = orders.map(order => {
                            const fullPaid  = (order.node.fullyPaid) ? "PAID" : "PENDING";
                            var formatter = new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: order.node.currencyCode,
                            });
                            const totalPrice = formatter.format(order.node.totalPriceSet.shopMoney.amount);

                            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                            const processedAt = new Date(order.node.processedAt);
                            
                            const row = [order.node.name, processedAt.toLocaleDateString('en-US', options), order.node.displayFulfillmentStatus, fullPaid, order.node.subtotalLineItemsQuantity, totalPrice];
                            return row;
                        })
                        store.set('orders', rowOrders);
                        store.set('customer', customer);
                        redirectToOrders();
                      }
                      }
                    >
                        <h3>
                            <TextStyle variation="strong">{item.node.displayName}</TextStyle>
                        </h3>
                        <div>Total Orders: {item.node.ordersCount}</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default CustomerList;