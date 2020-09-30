import { Page, Card, ResourceList, ResourceItem, Avatar, TextStyle } from '@shopify/polaris';
import CustomersList from '../resources/CustomersList'
const Index = () => (
    <div>
        <Page title="Customer List">
            <Card>
                <CustomersList />
            </Card> 
        </Page>
    </div>
  );
  
  export default Index;