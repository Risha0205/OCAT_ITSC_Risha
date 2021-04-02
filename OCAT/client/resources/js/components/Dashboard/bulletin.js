import React from 'react';
import { NavLink } from 'react-router-dom';

export class DashboardBulletin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { } = this.state;

    return (
        <>
            <div>
              <h1 >OCAT Dashboard</h1>
              <NavLink to="/assessment/new">New</NavLink>
              <NavLink to="/assessment/list">List</NavLink>
              <hr />
            </div>
        </>
      );
  }
}