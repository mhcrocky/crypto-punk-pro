import tw from 'twin.macro';
import {useHistory, useLocation,useParams,Switch,Route} from 'react-router-dom';
const BCNav = tw.nav` bg-gray-300 p-3 px-12 rounded font-sans mx-8 mt-8`;
const BCOl = tw.ol`list-none text-black flex text-gray-lightest`;
const BCLink =  tw.a`text-blue-100 font-bold text-black cursor-pointer`;
const Slash = tw.span`mx-2 text-black`;

const DetailBC = () => {
    let { id } = useParams();

  return (
    <li>
      <BCLink>{id}</BCLink>
    </li>
  );
}

const BreadCrumbs  = () => {
    let { id } = useParams();
    let history = useHistory();
    let location  =  useLocation();
    let punk_id = '';
    const routers = [
        {
            path:'/cryptopunks/attributes',
            breadcrumb:[
                {name:'cryptopunks',isSlash:true,link:'/cryptopunks'},
                {name:'attributes',isSlash:false,link:'/cryptopunks/attributes'}
            ]
        },{
            path:'/cryptopunks/search',
            breadcrumb:[
                {name:'cryptopunks',isSlash:true,link:'/cryptopunks'},
                {name:'cryptopunks',isSlash:false,link:'/cryptopunks/detail'},
            ]
        },{
            path:'/cryptopunks/detail/',
            breadcrumb:[
                {name:'cryptopunks',isSlash:true,link:'/cryptopunks'}
                // {name:'attributes',isSlash:true,link:'/cryptopunks/attributes'},
            ]
        }
    ]
    let res = routers.filter(router=>location.pathname.includes(router.path));
    let breadcrumbs;

    const handleGoParent =(link) =>{
        history.push(link);
    }
    if(res[0]){
        breadcrumbs = res[0].breadcrumb;
            return(
                <BCNav>
                    <BCOl>
                    {breadcrumbs.map((bc,index)=>{
                        return(
                            <li key={index}>
                                <BCLink onClick={()=>handleGoParent(bc.link)}>{bc.name}</BCLink>
                                {bc.isSlash?(<Slash>/</Slash>):<Slash></Slash>}
                            </li>
                        )
                    })}
                        <Switch>
                            <Route path="/cryptopunks/detail/:id" children={<DetailBC/>} />
                        </Switch>
                    </BCOl>
                </BCNav>
            )
    }    
    else{
        return (<></>)
    }
}
export default BreadCrumbs;