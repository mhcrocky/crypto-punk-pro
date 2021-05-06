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
const SearchInput = tw.div`flex border-red-800 w-1/2 mx-auto`;
const FormInput = tw.input`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`;
const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function serchValue() {
    console.log(FormInput.value);
    return document.getElementsByTagName(FormInput).value;
}
const CryptoSearch = (props) => {
    const query = useQuery();
    const history = useHistory();
    const [punks,setPunks] = useState([]);
    const [sales,setSales] = useState([]);
    const [searchValue,setSearchValue] = useState('');


    const updatePage = (value) => {
        let tmp_sales=[] ;
        let tmppunks= _.filter(ct_punk,function(punk){
            if(punk.type ==value){
                return punk;
            };
            if(punk.attr.indexOf(value)!==-1){
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
    }
    useEffect(()=>{
        updatePage(query.get('query'));
    },[])
    const handleGoDetail = (link) => {
        history.push(`/cryptopunks/detail/${link}`);

    }
    
    const handleGoSearch = (link) => {
        history.push(`/cryptopunks/search?query=${link}`);
        updatePage(link);
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


    const handleSearchInputChange = (val) => {
        setSearchValue(val);

    }

    return(
        <>
        <SearchInput>
            <FormInput 
                onChange={(e)=>handleSearchInputChange(e.target.value)} value={searchValue} />
            <PrimaryButton onClick={()=>handleGoSearch(searchValue)}>Search</PrimaryButton>
        </SearchInput>
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