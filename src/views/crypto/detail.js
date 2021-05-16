import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import tw from 'twin.macro';
import ct_punk from 'data/data';
import _ from 'lodash';
const Container = tw.div`relative mx-5`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-2 md:py-3`;
const Grid = tw.div`grid grid-cols-3 px-5`;
const GridCol = tw.div`py-5`;
const GoToSearch = tw.b`cursor-pointer`;
const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;
const isFirefox = typeof InstallTrigger !== 'undefined';

const CryptoDetail = (props) => {
    const params = useParams();
    const [punk,setPunk] = useState({});
    const history = useHistory();
    const [punkTypeCouunt,setPunkTypeCount] = useState(0);
    useEffect(()=>{
        ct_punk.map((cell)=>{
            if(cell.id == params.crypto_id){
                setPunk(cell);
            }
            return(<></>)
        })
    },[])
    useEffect(()=>{
        let count_punk = 0;
        ct_punk.map((pk)=>{
            if(pk.type === punk.type){
                count_punk++;
            }
        })
        setPunkTypeCount(count_punk);
    },[punk]);
    const handleGoSearch = (link) => {
        history.push(`/cryptopunks/search?query=${link}`);
    }
    const handleBuyNowClick = () => {
        history.push(`/gotran`);
    }
    return(
    <>
        <div style={{background:'grey'}}>
            <img src={`/images/${punk.src}`} style={{maxHeight:'512px',maxWidth:'512px',width:'100%',margin:'auto',imageRendering: isFirefox?'-moz-crisp-edges':'pixelated'}} alt={''}/>
        </div>
        <Container>
            <TwoColumn>
                <h2 style={{ width:'100%' }}>crypto punk</h2>
                <PrimaryButton onClick={()=>handleBuyNowClick()} className="pixel-font" as="a" href='#/'>BuyNow</PrimaryButton>
            </TwoColumn>
            <TwoColumn>
                <h2>One of {punkTypeCouunt}<GoToSearch onClick={()=>handleGoSearch(punk.type)} >{punk.type}</GoToSearch> Punks.</h2>
            </TwoColumn>
            <TwoColumn>
                <h2>Accesories</h2>
            </TwoColumn>
            <Grid>
                {punk.attr?punk.attr.map((attr,key)=>{
                    let attr_punks= _.filter(ct_punk,function(punk){
                        if(punk.attr.indexOf(attr)!==-1){
                            return punk;
                        };
                    })
                    return (
                    <GridCol key={key}>
                        <GoToSearch onClick={()=>handleGoSearch(attr)} >{attr}</GoToSearch>
                        <br/>
                        {attr_punks.length} Punks have this.
                    </GridCol>)
                }):''}
            </Grid>
        </Container>
    </>)
}
export default CryptoDetail;