import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './views/home'
import Transaction from './views/transaction';
import CryptoAttr from './views/crypto/attributes';
import CryptoSearch from './views/crypto/search';
import CryptoDetail from './views/crypto/detail';
function Rotas(){
    const uuid = '0126c9ec-95c9-4952-1df5-c2989bdd1948';

    return (
        <Switch>
            <Redirect from={'/gotran'} to={`/transaction?uuid=${uuid}`} />
            <Route path="/cryptopunks/attributes" component={CryptoAttr}/>
            <Route path="/cryptopunks/search" component={CryptoSearch}/>
            <Route path="/cryptopunks/detail/:crypto_id" component={CryptoDetail}/>
            <Route path="/cryptopunks/*" render={()=><div>404</div>} />
            <Route path="/transaction" component={Transaction} />
            <Route path="/" component={Home} />
            <Route path="*" render={()=><div>404</div>} />
        </Switch>
    )
}

export default Rotas