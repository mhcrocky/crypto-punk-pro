import React from "react"
import "style.css"
import "tailwindcss/dist/base.css"
import Header from "components/headers/light.js";
import BreadCrumbs from 'components/headers/breadcrumbs.js';
import Rotas from "./rotas"
import Footer from "components/footers/MiniCenteredFooter"
import AnimationRevealPage from "./helpers/AnimationRevealPage"
import { createBrowserHistory } from "history";
import {Router} from 'react-router-dom';

function App() {
  const hist = createBrowserHistory();

  return (
    <>
    <Router history={hist}>
     <Header />
     <BreadCrumbs />
      <AnimationRevealPage>
        <Rotas />
      </AnimationRevealPage>     
     <Footer />     
    </Router>
    </>
     
  )
}

export default App