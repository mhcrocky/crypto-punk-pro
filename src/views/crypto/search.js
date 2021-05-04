import React, { useEffect,useState } from 'react';
import tw from 'twin.macro';
import _, { functions, map } from 'lodash';
import ct_punk from 'data/data';
import ct_sale from 'data/sale';

import { useHistory,useLocation } from "react-router-dom";

const PunkImgs = tw.div`inline-flex`;
const PunkImg = tw.img`cursor-pointer h-16`;
const Container = tw.div`relative mx-5 pb-10`;
const GridCol = tw.div`grid grid-cols-12`;
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const CryptoSearch = (props) => {
    const query = useQuery();
    const history = useHistory();
    const [punks,setPunks] = useState([]);
    const [sales,setSales] = useState([]);

    useEffect(()=>{
        let tmp_sales=[] ;
        let tmppunks= _.filter(ct_punk,function(punk){
            if(punk.type ==query.get('query')){
                return punk;
            };
            if(punk.attr.indexOf(query.get('query'))!==-1){
                return punk;
            };
        })
        setPunks(tmppunks);
        _.filter(ct_sale,function(sale){
            _.filter(tmppunks,function(punk){
                if(sale.punk_id ==punk.id){
                    tmp_sales.push({
                        punk_id:punk.id,
                        x:sale.x,
                        y:sale.y,
                        img_src:punk.src
                    });
                }
            })
        })
        setSales(tmp_sales);
        console.log(tmp_sales)
    },[])
    const handleGoDetail = (link) => {
        history.push(`/cryptopunks/detail/${link}`);

    }
    
    
    const Punks = (props) =>{
        return (
            <GridCol>
            {props.punks.map((punk,key)=>{
                return(<>
                    <PunkImg onClick={()=>handleGoDetail(key)} src={`/images/${punk.src}`} />                            
                </>)
            })}
            </GridCol>
        )
    }
    const Sales = (props) => {
        return(
            <GridCol>
            {props.sales.map((sale,key)=>{
                return(<div>
                    <PunkImg onClick={()=>handleGoDetail(key)} src={`/images/${sale.img_src}`} /> 
                    {sale.x} Ξ<br/>   
                    ${sale.y} M                           
                </div>)
            })}
            </GridCol>
        )
    }
    return(
        <>
        <Container>
            <div>{punks.length}  Punks found</div>
            <Punks punks={punks} />
        </Container>
        <Container>
            <div>{punks.length}  Sales found</div>
            <Sales sales={sales} />
        </Container>
        </>
    )
}
export default CryptoSearch;