import { useState ,useRef, useEffect} from 'react';
import {RiAccountCircleFill, RiAccountCircleLine, RiArrowDownLine,RiMenu3Line, RiArrowLeftRightLine, RiArrowRightCircleLine, RiTv2Line, RiMusic2Line, RiNavigationLine, RiSearch2Line, RiShoppingBag2Fill, RiShoppingBag3Line, RiUser2Line, RiVideoLine, RiCloseLine} from 'react-icons/ri'
import {RiAlbumLine, RiContactsBook2Line, RiDownloadCloudLine, RiHeadphoneLine, RiMenu2Line, RiPlayList2Line, RiSortDesc, RiSpeaker2Line, RiUpload2Line} from 'react-icons/ri'
import { connect } from 'react-redux';
import {signOutGoogleApi, signOutCustomApi,getUserAuth, format_text}  from  '../actions'
import axios from 'axios';
import Swal from 'sweetalert2';
import Link from 'next/link'
import styled from 'styled-components'
import {useRouter} from 'next/router'


const  Header = (props) => {

    const [query, setQuery] = useState('');
    const [showdrawer, setshowdrawer] = useState(false);
    const [authen, setAuthen]= useState('Login');
    const history = useRouter();

      

    useEffect(() => {

           if(sessionStorage.getItem("visitCount") === null) {
                sessionStorage.setItem("visitCount","visited");  
                UPDATE();
            }
            window.addEventListener("beforeunload", (ev) => {  
               sessionStorage.setItem("visitCount",null);
            });
            getUserAuth(window.sessionStorage.getItem("fbuser"));

            if(props.user){
                sessionStorage.setItem("SignInUser",props.user.User ? JSON.stringify(props.user) : "")
                setAuthen("Logout");
            }
            
           
    },[])

    

    
    const SortDiv = () => {

    } 

    const GetAlbumPlaylist = (e) => {

    }


    const SortByGenre = () => {

    }
  

    const GetDownloadHighCount = (e) => {

    }



    function UPDATE(){
        axios.post(process.env.NEXT_PUBLIC_UPDATE_VISIT_COUNT,{count:1})
        .then(res => {
            console.log(res.data.message,"Visted")
        }).catch(err => {
            console.log(err);
        })         
    }


    const homeNav = () => {
        window.scrollTo(0,0);
        sessionStorage.setItem("View","home");
    }

    const userNav = () => {
            window.scrollTo(0,0);
            sessionStorage.setItem("View","user");
    }


    const Streaming = () => {
        window.scrollTo(0,0);
        sessionStorage.setItem("View","streaming");
    }


    const Music = () => {
        window.scrollTo(0,0);
        sessionStorage.setItem("View","music"); 
    }

    

    const runquery = () => {
        console.log(sessionStorage.getItem("View"));
        if(sessionStorage.getItem("View") === "music"){
             if(query.trim().length > 0){
                 let q = query.toLowerCase().replace(/ /g,'+');
                 history.push("/Search/" + q);
             }
        }else
           if(sessionStorage.getItem("View") === "streaming")
                history.push("/VSearch/"+query.toLowerCase());
        else
          if(sessionStorage.getItem("View") === "home")
                history.push("/Bsearch/"+query.toLowerCase());

    }

    const auth = () => {
        var data = document.getElementById("authstate").innerText;
        if(data === "Login")
           history.push("/Signin");
        else{
            setAuthen("Login") 
            if(props.user)
                props.user.displayName ? props.logout(2) : props.logout(1);
            window.sessionStorage.setItem("SignInUser",null); 
            history.push("/");
            }
         
    }


    function show(){
        setshowdrawer(true);
        window.scrollTo(0,0);
    }
  



    return (
          <>
           {showdrawer ? 
              <ShowDiv>
                <div  id='mainview'>
                    <button onClick={(e) => setshowdrawer(false)}><RiCloseLine/></button>
                        <Searchs>   
                            <div>
                                <input placeholder='Search for music,post,video' value={query}  onChange={(e) => setQuery(e.target.value)} />
                            </div>
                            <SearchIcons onClick={(e) => runquery()}>
                                <RiSearch2Line
                                    size={15}   
                                    color='#000'/>
                            </SearchIcons>
                        </Searchs>   


                        <SideNav>
                            <Grooves>
                                @Webfly  
                            </Grooves>

                            <MenuBar>
                                <RiMenu2Line/>
                            </MenuBar>

                            <HR>
                                <hr/>
                            </HR>
                            <table>

                                <tr>
                                    <td>
                                        <TabInfo>
                                        <RiHeadphoneLine/> &nbsp;&nbsp; Your Groove
                                        </TabInfo>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <SubContainer>
                                        <RiSortDesc  onClick={(e)=> SortDiv(e)}/> Sort By
                                        </SubContainer>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                       <SubContainer>
                                        <RiDownloadCloudLine  onClick={(e) =>  GetDownloadHighCount(e)}/> Trending
                                        </SubContainer>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <SubContainer>
                                        <RiAlbumLine   onClick={(e) => GetAlbumPlaylist(e)}/> Album
                                        </SubContainer>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <SubContainer>
                                        <RiPlayList2Line onClick={(e) => SortByGenre(e)}/> Genre
                                        </SubContainer>
                                    </td>
                                </tr>
                            </table>  
                            <HR>
                                <hr/>
                            </HR>
                            <table>
                                <tr>
                                    <td>
                                        <TabInfo1>
                                            QUICK ACCESS
                                        </TabInfo1>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <SubContainer>
                                        <RiSpeaker2Line/> Promote Music
                                        </SubContainer>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <SubContainer>
                                        <RiUpload2Line/> Upload Music
                                        </SubContainer>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <SubContainer>
                                        <RiContactsBook2Line/> Contact Webfly
                                        </SubContainer>
                                    </td>
                                </tr>
                            
                            </table>  
                         </SideNav>
                </div>   
           </ShowDiv>
           :
           ""}
        <Container>
            <Content>
                   <Link href="/">
                     <Webdealit onClick={homeNav}>
                        <img alt='webfly logo' src="/images/webfly_logo.png"/>
                         Webfly
                        </Webdealit>
                    </Link>


                    <NavBar onClick={(e) => show()}>
                         <RiMenu3Line  id="menu" color="#f5f5f5"/>
                    </NavBar>
         

                <Search>
                    <div>
                        <input placeholder='Search for music,post,video' value={query}  onChange={(e) => setQuery(e.target.value)} />
                    </div>
                        <SearchIcon onClick={(e) => runquery()}>
                            <RiSearch2Line
                                size={15}
                                color='#000'/>
                        </SearchIcon>
                </Search>

                <Nav>
                    <Navlist>
                        <Navchild onClick={userNav}>
                            <Link href="/User">
                                    <a>
                                    {props.user  ?
                                        (
                                        <RiAccountCircleFill
                                        size={20}
                                        color="#0D96FF"/>
                                        ):(
                                        <RiAccountCircleLine
                                        size={20}
                                        color="#fff"/>
                                        )}
                                        <span  style={ props.user ? {color:"#0D96FF"} :  {color:"#fff"} }>User</span>
                                    </a>
                                    </Link>
                        </Navchild> 
                     


                        <Navchild  onClick={Streaming}>
                            <Link href="/Videosui">
                                <a>
                                    <RiTv2Line
                                    size={20}
                                    color="#fff"/>
                                    <span>Stream</span>
                                </a>
                            </Link>  
                        </Navchild>


                        <Navchild   onClick={Music}>
                            <Link href="/Music">
                                <a>
                                    <RiMusic2Line
                                    size={20}
                                    color="#fff"/>
                                    <span>Music</span>
                                </a>
                            </Link>
                        </Navchild>


                        <Navchild  onClick={auth}>
                            <a>
                                <RiArrowRightCircleLine
                                size={20}
                                color="#fff"/>
                                {props.user ?
                                  <span id='authstate'> {props.user ? authen : authen}</span>
                                 : props.fbuser ?
                                  <span id='authstate'> {props.fbuser ? authen : authen}</span>
                                 : <span id='authstate'>Login</span>
                                 }
                            </a>
                        </Navchild>
                    </Navlist>
                </Nav>
            </Content>
        </Container>
        </>
    )
}


const Container = styled.div`  
background-image: linear-gradient(to top right,#1f505f, #07091C);
padding: 0  24px;
position:  fixed;
left: 0;
top: 0;
width: 100%;
z-index: 555;
height: 60px;



`;


const ShowDiv = styled.div`
position: absolute;
height: 100vh;
width: 100%;
z-index:600;
top:0;

#mainview{
height: 100vh;
width: 100%;
background-image: linear-gradient(to top right,#1f505f, #07091C); 
}

button{
display: flex;
justify-content:center;
border-radius:50%;
padding: 5px;
font-size:25pt;
color: #f5f5f5;
background: transparent;
border:none;
}
`;



const Content = styled.div`
display: flex;
align-items: center;
margin: 0 auto;
min-height: 100%;
max-height: 60%;
max-width: 1128px;
`;



const Webdealit = styled.div`
padding: 10px;
color: #fff;
font-size:20pt;
font-weight:700;
font-family: "Poppins", sans-serif;
margin: 5px;
margin-top:-10px;
cursor: pointer;

img{
width: 50px;
height: 50px;
}

@media(max-width:968px){
font-size:15pt;
margin: 0px;
margin-top:-20px;
margin-left:-20px;
}

`;


const Search = styled.div`
opacity:1;
flex-grow:1;
position: relative;
margin-top:5px;
& > div{
max-width:280px;
input{
border: none;
box-shadow:none;
background-color:#f5f5f5;
border-radius:7px;
color: rgba(0,0,0,0.9);
width: 218px;
padding: 0 8px 0 40px;
line-height:1.75;
font-weight:400;
font-size:14px;
height: 34px;
border-color:#dce6f1;
vertical-align:text-top;
text-align:left;
}
}
@media(max-width:1200px){
input{
width: 178px;
}
}

@media(max-width:968px){
input{
display: none;
}
}
&:hover{
input{
background-color: #eef3f8;
}
}

`;



const Searchs = styled.div`
opacity:1;
flex-grow:1;
position: relative;
margin-top:30px;
& > div{
display: flex;
align-items:center;
justify-content:center;

input{
border: none;
box-shadow:none;
background-color:#f5f5f5;
border-radius:7px;
color: rgba(0,0,0,0.9);
width: 218px;
padding: 0 8px 0 40px;
line-height:1.75;
font-weight:400;
font-size:14px;
height: 34px;
border-color:#dce6f1;
vertical-align:text-top;
text-align:left;
}
}

@media(max-width:1200px){
div{
input{
width: 82%;
}
}
}
`;




const NavBar = styled.div`
#menu{
display: none;
}
@media(max-width:968px){
position: absolute;
top:0;
right: 0;
margin:10px;
width: 100px;
height: auto;
display: flex;
justify-content:space-between;
font-size:25pt;
#menu{
display: block;
}
}

`;


const SearchIcon =  styled.div` 
width: 40px;
position: absolute;
z-index: 1;
top:10px;
left: 2px;
margin:0;
cursor:pointer;
display: flex;
justify-content: center;

@media(max-width:968px){
display: none;
}
`;

const SearchIcons = styled(SearchIcon)`
@media(max-width:968px){
display:block;
margin-left:5px;
height:40px;
top:-3px;
}
`;



const Nav = styled.nav`
margin-left: auto;
display: block;



@media(max-width: 968px){
position: fixed;
left: 0;
bottom: 0;
width: 100%;
} 

`;


const Navlist = styled.ul`
display: flex;
flex-wrap:nowrap;
list-style-type:none;
@media(max-width: 1200px){
margin-right: 40px;
} 

@media(max-width:968px){
width: 100%;
height: 60px;
display: flex;
justify-content: center;
align-items: center;
position: fixed;
bottom: 0;
background-image: linear-gradient(to top right,#1f505f, #07091C);
}
`;


const Navchild = styled.li`
display: flex;
align-items: center;
cursor: pointer;
a{
align-items: center;
background:transparent;
display: flex;
flex-direction: column;
font-size: 12px;
font-weight: 400;
justify-content: center;
line-height: 1.5;
min-height:42px;
max-width: 250px;
margin-left: 45px;
margin-top:0px;
position: relative;
text-decoration: none;

span{
color: #fff;
display: flex;
align-items: center;
}
}


@media(max-width:1100px){
width: 25%;
text-align:left;
a{
width: 20%;
height:100%;
display: flex;
justify-content: center;
align-items: center;
margin-left:25px;
}
} 


&:hover, &:active{
a{
span{
color:rgba(0,0,0,0.9);
}
}
}
`;





const SideNav = styled.div`
@media(max-width:968px){
width:90%;
height: 100vh;
margin-top:10px;
padding:15px;
}

`;


const SubContainer = styled.div`
margin-top:15px;
color: #b8b9be; 
font-size:10pt;
`;


const TabInfo = styled.div`
display:flex;
justify-content:center;
align-items:center;
text-align:center;
font-weight:700;
color:#b8b9be;
margin-top:10px;
`;


const TabInfo1 = styled(TabInfo)`
margin-left:-10px;

`;


const Grooves = styled.div`
width: 70%;
padding-top:20px;
font-weight:800;
font-family: "Poppins", sans-serif;
color:#fff;
`;


const MenuBar = styled(Grooves)`
font-weight:none;
font-size:20pt;
color: #b8b9be;


`;


const HR = styled(Grooves)`
font-weight:none;
color: #b8b9be;
`;


const Tabs = styled.span`
font-weight:600;
cursor:pointer;
font-family: "Poppins", sans-serif;
margin-left:18px; 
`;






const mapStateToProps = (state) => {
    return{
        user: state.userState.user,
        fbuser:state.fbState.fbuser,
    };
};

const mapDispatchToProps = dispatch => ({
    logout :(e) => { {e === 1 ?  dispatch(signOutCustomApi()) : dispatch(signOutGoogleApi())}   window.sessionStorage.setItem("SignInUser",null) },
});


export default connect(mapStateToProps,mapDispatchToProps)(Header);






