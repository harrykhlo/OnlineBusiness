import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Customer } from './components/Customer';
import { Product } from './components/Product';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
    <Layout>
            <Route exact path='/' component={Customer} />
            <Route path='/product' component={Product} />
        
        {/*<Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/customer' component={Customer} />*/}
      </Layout>
    );
  }
}
