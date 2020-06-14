import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddStolenCase from '../stolenCase/AddStolenCase';
import Addpolice from '../police/AddPolice';
import ResolvedCase from '../stolenCase/ResolvedCase';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import PendingCase from '../stolenCase/PendingCase';
import PoliceList from '../police/PoliceList';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/addcase' component={AddStolenCase} />
        <Route exact path='/addpolice' component={Addpolice} />
        <Route exact path='/resolved' component={ResolvedCase} />
        <Route exact path='/pending' component={PendingCase} />
        <Route exact path='/allpolice' component={PoliceList} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
