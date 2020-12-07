import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainLayout from "./components/layout/MainLayout/MainLayout";
import Dashboard from '../src/components/views/Dashboard/Dashboard';
import Kitchen from '../src/components/views/Kitchen/Kitchen';
import Login from '../src/components/views/Login/Login';
import Tables from '../src/components/views/Tables/Tables';
import TablesBooking from './components/views/TablesBooking/TablesBooking';
import TablesEvent from './components/views/TablesEvent/TablesEvent';
import Ordering from '../src/components/views/Ordering/Ordering';
import OrderNew from '../src/components/views/OrderNew/OrderNew';
import OrderSingle from '../src/components/views/OrderSingle/OrderSingle';

function App() {
  return (
    <BrowserRouter basename={'/panel'}>
      <MainLayout>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Dashboard} />

          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Login} />

          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Tables} />

          <Route exact path={process.env.PUBLIC_URL + '/tables/booking/:id'} component={TablesBooking} />
          <Route exact path={process.env.PUBLIC_URL + '/tables/event/:id'} component={TablesEvent} />

          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Ordering} />
          <Route exact path={process.env.PUBLIC_URL + '/Ordering/new'} component={OrderNew} />
          <Route exact path={process.env.PUBLIC_URL + '/Ordering/order/:id'} component={OrderSingle} />

          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Kitchen} />

        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
