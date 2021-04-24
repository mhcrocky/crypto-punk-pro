import React from "react"
import "style.css"
import "tailwindcss/dist/base.css"
import Header from "components/headers/light.js";
import Rotas from "./rotas"
import Footer from "components/footers/MiniCenteredFooter"
import AnimationRevealPage from "./helpers/AnimationRevealPage"

function App() {

  return (
    <>
     <Header />
      <AnimationRevealPage>
        <Rotas />
      </AnimationRevealPage>     
     <Footer />     
    </>
     
  )
}

export default App