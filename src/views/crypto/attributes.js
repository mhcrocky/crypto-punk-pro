import React from 'react';
import tw from 'twin.macro';
import ct_type from 'data/types';
import ct_punk from 'data/data';
import ct_attrs from 'data/attributes';
import ct_attr_cnt from 'data/attr_count';
import _, { map } from 'lodash';
import { useHistory } from 'react-router-dom';
const CryptoTable = tw.table`table-auto`;
const CryptoThead = tw.thead`bg-gray-100`;
const CryptoTh = tw.th`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`;
const CryptoTbody = tw.tbody`bg-white divide-y divide-gray-200`;
const CryptoTd = tw.td`px-6 py-4`;
const PunkImg = tw.div`inline-flex float-right`;
const Container = tw.div`relative mx-5`;





const CryptoAttr = (props) => {
    const history = useHistory();
    
    const TableHeader =() => (
        <CryptoThead><tr><CryptoTh tw={'w-1/2'}>Attribute</CryptoTh><CryptoTh>Count</CryptoTh><CryptoTh>More examples</CryptoTh></tr></CryptoThead>
    );
    const TableMoreExample = (props) =>{
        let punklen = 0;
        return (
            <CryptoTd>
                <PunkImg>
                {props.punks.map((punk,key)=>{
                    if(punklen<8){
                        punklen++;
                        return(
                        <img tw="cursor-pointer" onClick={()=>handleGoDetail(key)} src={`/images/${punk.src}`} />                            
                        )
                    }
                })}
                </PunkImg>
            </CryptoTd>
        )
    }
    const TypesTable = (props) => {
        let tmpdata= props.types.map((col)=>{
            let punks= _.filter(props.punks,function(punk){
                if(punk.type ==col.type){
                    return punk;
                };
            })
            col.punks= punks
            return col;
        })
        return (
        <CryptoTable>
            <TableHeader/>
                <CryptoTbody>
                {tmpdata.map((cell)=>{
                    return (
                        <tr>
                            <CryptoTd onClick={()=>handleGoSearch('type',cell.type)}>{cell.type}</CryptoTd>
                            <CryptoTd>{cell.punks.length}</CryptoTd>
                            <TableMoreExample punks={cell.punks} />
                        </tr>
                    )
                })}
            </CryptoTbody>
        </CryptoTable>)
    }
    
    const AttributesTable = (props) => {
        let tmpdata= props.attrs.map((col)=>{
            let punks= _.filter(props.punks,function(punk){
                if(punk.attr.indexOf(col.attribute)!==-1){
                    return punk;
                };
            })
            col.punks= punks
            return col;
        })
        return (
        <CryptoTable>
            <TableHeader/>
                <CryptoTbody>
                {tmpdata.map((cell)=>{
                    return (
                        <tr>
                            <CryptoTd onClick={()=>handleGoSearch('attr',cell.attribute)}>{cell.attribute}</CryptoTd>
                            <CryptoTd>{cell.punks.length}</CryptoTd>
                            <TableMoreExample punks={cell.punks} />
                        </tr>
                    )
                })}
            </CryptoTbody>
        </CryptoTable>
        );
    }
    
    const AttrCountTable = (props) => {
        let tmpdata= props.counts.map((col)=>{
            let punks= _.filter(props.punks,function(punk){
                if(punk.attr_count ==col.count){
                    return punk;
                };
            })
            col.punks= punks
            return col;
        })
        console.log(tmpdata)
    
        return (
        <CryptoTable>
            <TableHeader/>
                <CryptoTbody>
                {tmpdata.map((cell)=>{
                    return (
                        <tr>
                            <CryptoTd onClick={()=>handleGoSearch('attr_cnt',cell.attributes)}>{cell.attributes}</CryptoTd>
                            <CryptoTd>{cell.punks.length}</CryptoTd>
                            <TableMoreExample punks={cell.punks} />
                        </tr>
                    )
                })}
            </CryptoTbody>
        </CryptoTable>
        )
    }

    const handleGoSearch = (type,link) => {
        history.push(`/cryptopunks/search?${type}=${link}`);
    }

    const handleGoDetail = (link) => {
        history.push(`/cryptopunks/detail/${link}`);

    }

    return(
    <Container>
        <TypesTable types= {ct_type} punks = {ct_punk} />
        <AttributesTable attrs = {ct_attrs} punks={ct_punk} />
        <AttrCountTable counts = {ct_attr_cnt} punks={ct_punk} />
    </Container>
    )
}
export default CryptoAttr;