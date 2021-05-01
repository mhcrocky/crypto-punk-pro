import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'twin.macro';
import ct_punk from 'data/data';
const Container = tw.div`relative mx-5`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-2 md:py-3`;
const Grid = tw.div`grid grid-cols-3`;

const CryptoDetail = (props) => {
    const params = useParams();
    console.log(ct_punk[params.crypto_id]);
    const [punk,setPunk] = useState({});
    useEffect(()=>{
        setPunk(ct_punk[params.crypto_id]);
    },[])
    return(
    <>
        <div style={{background:'grey'}}>
            <img src={`/images/${punk.src}`} style={{height:'500px',margin:'auto',imageRendering: 'pixelated'}}/>
        </div>
        <Container>
            <TwoColumn>
                <h2>crypto punk</h2>
            </TwoColumn>
            <TwoColumn>
                <h2>One of {punk.type} Punks.</h2>
            </TwoColumn>
            <TwoColumn>
                <h2>Accesories</h2>
            </TwoColumn>
            <TwoColumn>
                <Grid>
                {punk.attr?punk.attr.map((attr)=>{
                    return (<div>
                        {attr}
                    </div>)
                }):''}
                </Grid>
            </TwoColumn>
        </Container>
    </>)
}
export default CryptoDetail;