import React, { Component } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class Introduction extends Component {
  static displayName = Introduction.name;

  render () {
    return (
        <div>
        <h1>Introduction</h1>
        <p>Welcome to Harry's sample of a single-page application which implemented a sale record system for users to create, read, update and delete the entities below in a SQL database:</p>
        <ul>
            <NavItem>
                <NavLink tag={Link} to="/customer"><strong>Customer</strong></NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/product"><strong>Product</strong></NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/Store"><strong>Store</strong></NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/Sales"><strong>Sales</strong></NavLink>
            </NavItem>
        </ul>
            <p>In the SQL database, the customer, product and store are parent entities. The Sale is child enetity containing the foreign key of another entities. Cascde delete rule is implemented in this parent-child relationship.</p>

            <p>This application and its Microsoft SQL data have been deployed to Azure cloud services. For your reference, the source code can be found in:</p>
        <ul>
                <li><a href='https://github.com/harrykhlo/OnlineBusiness'>Harry's GitHub at https://github.com/harrykhlo/OnlineBusiness</a></li>
        </ul>
        <p>This application is built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> and <a href='http://getbootstrap.com/'>Semantic UI React</a> for layout and styling</li>
                
        </ul>
        <p>Harry's email:</p>
        <ul>
            <li><a href="mailto: harrykylo@gmail.com">harrykylo@gmail.com</a></li>
        </ul>
      </div>
    );
  }
}
