import React from 'react'

import { Route, Switch, HashRouter } from 'react-router-dom'
import Home from './views/home'

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas