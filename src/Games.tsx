import * as React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Gugudan from './component/Gugudan';

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to='/gugudan'>Gugudan</Link>
      </div>
      <div>
        <Switch>
          <Route path='/gugudan' component={Gugudan} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Games;
