import { useState, useEffect } from 'react'
import {Card, DataTable, Page, Button, FooterHelp} from '@shopify/polaris';
import store from 'store-js';


const Orders = () => 
    {
        const [orders, setOrders] = useState([]);
        const [customerName, setCustomerName] = useState('');

        useEffect(() => {
            const storeOrders = store.get('orders');
            //const customer = store.get('customer');
            console.log(storeOrders)
            if(storeOrders.length > 0) setOrders(storeOrders);
            if(customer) setCustomerName(customer);
        },[]);
        
        return (
            <div>
                <Page
                    breadcrumbs={[{
                        content: 'Customers', 
                        //url: '/index'
                        onAction: () => {
                            window.history.back();
                        }
                        }]}
                    title={`Order List of ${customerName}`}>
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