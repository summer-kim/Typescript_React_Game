import * as React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Gugudan from './component/Gugudan/Gugudan';
import RockScissorPaper from './component/RockSicssorPaper/RockScissorPaper';
import Lotto from './component/Lotto/Lotto';
import FindingMine from './component/FindingMine/MineSearch';

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
        <Link to='/findingMine'>FindingMine</Link>
        <br />
      </div>
      <div>
        <Switch>
          <Route path='/gugudan' component={Gugudan} />
          <Route path='/RSP' component={RockScissorPaper} />
          <Route path='/lotto' component={Lotto} />
          <Route path='/findingMine' component={FindingMine} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Games;
