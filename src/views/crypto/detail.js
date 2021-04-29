import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'twin.macro';
import ct_punk from 'data/data';
const Container = tw.div`relative mx-5`;


const CryptoDetail = (props) => {
    const params = useParams();
    console.log(ct_punk[params.crypto_id]);
    const [punk,setPunk] = useState({});
    useEffect(()=>{
        setPunk(ct_punk[params.crypto_id]);
    },[])
    return(
    <>
        <div>
            <img src={`/images/${punk.src}`} style={{height:'500px',margin:'auto'}}/>
        </div>
        <Container>
            crypto punk 
            One of {punk.type} Punks.
            Accesories
            {punk.attr?punk.attr.map((attr)=>{
                return (<>
                    {attr}
                </>)
            }):''}
        </Container>
    </>)
}
export default CryptoDetail;