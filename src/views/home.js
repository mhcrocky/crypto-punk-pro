import React from 'react'
import Hero from "components/hero/TwoColumnWithVideo"
import Feature from "components/features/TwoColWithButton"
import Faqs from "components/faqs/SingleCol"

class Home extends React.Component{

    render(){
        return (
            <>
            <Hero />   
            <Feature />
            <Faqs />
            </>
        )
    }
}

export default Home



