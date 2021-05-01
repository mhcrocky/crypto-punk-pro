import React, { useEffect,useState } from 'react';
import tw from 'twin.macro';
import _, { map } from 'lodash';
import ct_punk from 'data/data';

import { useHistory,useLocation } from "react-router-dom";

const PunkImgs = tw.div`inline-flex`;
const PunkImg = tw.img`cursor-pointer h-16`;
const Container = tw.div`relative mx-5`;
const GridCol = tw.div`grid grid-cols-12`;
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const CryptoSearch = (props) => {
    const query = useQuery();
    const history = useHistory();
    const [punks,setPunks] = useState([]);

    useEffect(()=>{
        let tmppunks= _.filter(ct_punk,function(punk){
            if(punk.type ==query.get('query')){
                return punk;
            };
            if(punk.attr.indexOf(query.get('query'))!==-1){
                return punk;
            };
        })
        console.log('dfsdf')
        setPunks(tmppunks);
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
    return(
        <Container>
            <div>{punks.length}  Punks found</div>
            <Punks punks={punks} />
        </Container>
    )
}
export default CryptoSearch;