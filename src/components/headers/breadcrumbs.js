import react from 'react';
import tw from 'twin.macro';
import {useHistory, useLocation} from 'react-router-dom';
const BCNav = tw.nav` bg-gray-lightest p-3 rounded font-sans w-full m-4`;
const BCOl = tw.ol`list-none text-black flex text-gray-lightest`;
const BCLink =  tw.a`text-blue-100 font-bold text-black`;
const BCSpan = tw.span`mx-2 text-black`;
const BreadCrumbs  = () => {
    let history = useHistory();
    let location  =  useLocation();
    console.log(location)  
    const routers = [
        {path:'/cryptopunks/attributes',name:'Attrubutes'},
        {path:'/cryptopunks/search',name:'Search'},
        {path:'/cryptopunks/detail/:crypto_id',name:'Detail'},
        {path:'/cryptopunks/*',name:'404'},
        {path:'/transaction',name:'Transaction'},
        {path:'/',name:'Home'},
        {path:'*',name:'404'}
    ]
    let res = routers.filter(router=>router.path ===location.pathname);
    let router;

    const handleGoParent =(link) =>{
        history.push('/'+link);
    }
    if(res[0]){
        router = res[0];
        if(router.path.split('/').length>2){
            return(
                <BCNav>
                    <BCOl>
                        <li><BCLink onClick={()=>handleGoParent(router.path.split('/')[1])}>{router.path.split('/')[1]}</BCLink></li>
                        <li><BCSpan>/</BCSpan></li>
                        <li><BCLink>{router.name}</BCLink></li>
                    </BCOl>
                </BCNav>
            )
        }else{
            return (<></>)
        }
    }    
    else{
        return (<></>)
    }
}
export default BreadCrumbs;