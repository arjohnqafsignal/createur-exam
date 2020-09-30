import { useState, useEffect } from 'react'
import {Card, DataTable, Page, Button, FooterHelp} from '@shopify/polaris';
import store from 'store-js';


const Orders = () => 
    {
        const [orders, setOrders] = useState([]);

        useEffect(() => {
            const storeOrders = store.get('orders');
            if(storeOrders.length > 0) setOrders(storeOrders);
        },[]);
        
        return (
            <div>
                <Page breadcrumbs={[{content: 'Customers', onActionRequired: () => history.back()}]} title="Order List">
                    <Card>
                    <DataTable
                        columnContentTypes={[
                            'text',
                            'text',
                            'text',
                            'text',
                            'text',
                            'text',
                        ]}
                        headings={[
                            'Order#',
                            'Date',
                            'Fulfillment',
                            'Payment',
                            'Items',
                            'Total Price',
                        ]}
                        rows={orders || []}
                        />
                    </Card>
                </Page>
            </div>
          );

    }

  
  export default Orders;