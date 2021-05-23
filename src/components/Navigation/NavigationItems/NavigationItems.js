import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Stock Photography
    </NavigationItem>
    {props.isAuthenticated ? (
      <Auxiliary>
        <NavigationItem link="/new-document">Upload document</NavigationItem>
        <NavigationItem link="/my-documents">My documents</NavigationItem>
        <li>Logged as: {props.currentUser}</li>
        {/* <NavigationItem link="/new-document">
          Logged as: {props.currentUser}
        </NavigationItem> */}
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Auxiliary>
    ) : (
      <NavigationItem link="/auth">Log in</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
