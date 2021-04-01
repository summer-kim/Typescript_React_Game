import * as React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Gugudan from './component/Gugudan/Gugudan';
import RockScissorPaper from './component/RockSicssorPaper/RockScissorPaper';
import Lotto from './component/Lotto/Lotto';

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to='/gugudan'>Gugudan</Link>
        <br />
        <Link to='/RSP'>RockScissorPaper</Link>
        <br />
        <Link to='/lotto'>Lotto</Link>
        <br />
      </div>
      <div>
        <Switch>
          <Route path='/gugudan' component={Gugudan} />
          <Route path='/RSP' component={RockScissorPaper} />
          <Route path='/lotto' component={Lotto} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Games;
