import React, { useEffect, useState } from 'react'
import {useHistory,useLocation} from 'react-router-dom';
import tw from "twin.macro";

import transactions from 'data/transaction.json';
import rightColumnImage from 'images/design-illustration.svg';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CircularProgress from '@material-ui/core/CircularProgress';

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col justify-center`;
const TransactionForm = tw.form`w-full max-w-lg`;
const TrFormGrid6 = tw.div`flex flex-wrap -mx-3 mb-6`;
const Divhf = tw.div`w-full md:w-1/2 px-3 mb-6 md:mb-0`;
const Divfull = tw.div`w-full px-3 mb-6 md:mb-0`;
const Divfullpb3 = tw.div`w-full px-3 mb-6 md:mb-0 md:pb-3`;
const FormLabel = tw.label`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2`;
const FormInput = tw.input`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`;
const SubtitleP = tw.p`text-red-500 text-lg text-center p-5`;
const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const Transaction = () => {
    let query = useQuery();
    const history =  useHistory();
    // console.log(query.get('uuid'),transactions);
    const [transaction,setTransaction] = useState({});
    const [actionButton,setActionButton] = useState(<PrimaryButton onClick={()=>handleCancel()}>Cancel</PrimaryButton>);
    const [stateObj,setStateObj] = useState(<CircularProgress />);
    useEffect(()=>{
        let uuid = query.get('uuid');
        transactions.map(tr=>{
            if(tr.uuid ===uuid){
                setTransaction(tr)
            }
        })
        console.log('sdfs')
        setTimeout(() => {
            setActionButton(<PrimaryButton onClick={()=>handleBuyAnother()}>Buy Another</PrimaryButton>)
            setStateObj(<DoneOutlineIcon />);
        }, 3000);
    },[]);
    const handleCancel = () => {
        history.push('/');
    }
    const handleBuyAnother = () => {
        history.push(`/gotran`);;
    }
    return (
        <Container>
            <TwoColumn>                        
                <LeftColumn>
                <TransactionForm>
                    <TrFormGrid6>
                        <Divfull>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <FormInput  type="text" value={'Awaiting Transaction'} placeholder="Jane" disabled/>
                        </Divfull>
                        <Divfull>
                            <SubtitleP>Subtitle Text</SubtitleP>
                        </Divfull>
                        <Divfullpb3>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <FormInput type="text" value={transaction.value} placeholder="Jane" disabled/>
                        </Divfullpb3>
                        <Divfullpb3>
                            <FormInput type="text" value={transaction.address} placeholder="Jane" disabled/>
                        </Divfullpb3>
                        <Divhf>
                        {actionButton}
                        
                        </Divhf>
                        <Divhf>
                           {stateObj}
                        </Divhf>
                    </TrFormGrid6>
                </TransactionForm>
                </LeftColumn>
                <RightColumn>
                <img src={rightColumnImage} />
                </RightColumn>            
            </TwoColumn>
        </Container>
    )
}

export default Transaction;