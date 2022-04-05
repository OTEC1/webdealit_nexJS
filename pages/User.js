import React, { useState ,useEffect} from 'react'
import styled from 'styled-components'
import Ad from './Ad';
import Header from './Header';
import swal from 'sweetalert2'
import Postmodel from './Postmodel';
import { connect } from 'react-redux';
import axios from 'axios';
import { RiDeleteBackLine, RiDeleteBin3Line, RiOpenSourceLine, RiPencilLine } from 'react-icons/ri';
import ReactPlayer from 'react-player';
import Load from './Load'



const User = (props) => {

    const [showModel, setShowModel] = useState("close");
    const [allUserPost, setAllUserPost] = useState(["one","two"]);
    const [user, setUser] = useState({User:{email:""}})

    const redirectUser = (e) => {
        e.preventDefault();

        if(props.user){
            switch(showModel){
            case "open":
                setShowModel("close");
                break;
            case "close":
                setShowModel("open");
            break;
            default:
                setShowModel("close");
                break;
        };
  }else
      swal.fire({text:'Pls sign in to add Post', icon:'warning'})

    }


  
  

    useEffect(() => {

    if(props.user){
        var e = {User:{useremail: props.user.User ?   props.user.User.email :  props.user.email}};
        window.scrollTo(0,0);
        if(e.User.useremail){
            props.user ? (
                    axios.post(process.env.NEXT_PUBLIC_GET_SINGLE_USE_POST,e)
                            .then(res => {
                                setAllUserPost(res.data.message);
                            }).catch(err => {
                                console.log(err);
                            })
            ):(<p></p>)
        }    
    }

 },[]);





    return(
        <>
            <Header/>
                <Container>
                    <Section>
                        <Signinusersection>
                            <User_Page>
                            <CardBackground/>
                                <UserInfo>
                                        <UserNameDisplay>
                                        {/* Welcome {props.user ? props.user.displayName ?  props.user.displayName : props.user.User.email.substring(0,props.user.User.email.indexOf('@')) : "user" }   */}
                                        </UserNameDisplay>
                                    </UserInfo>

                                    <Sharebox  onClick={(e) => {redirectUser(e)}}>
                                        What would you like to share?
                                    
                                        <div>
                                        {props.user ? 
                                        <>
                                        <img src={props.user.photoURL ? props.user.photoURL : "images/customSignInbackground.png" } alt=""/>
                                        <h5>{props.user.User !== undefined ? props.user.User.email.substring(0,1).toUpperCase(): ""}</h5>
                                        </>
                                        : <img src="/images/user.svg" alt=""/>
                                        }
                                        <button>Start a post</button>
                                        </div>
                                        
                                    </Sharebox>
                            </User_Page>


                            <User_Page2>
                            <CardBackground/>
                                
                            </User_Page2>
                        </Signinusersection>
                        


                        <Signinuserrightsection>
                        <CardBackground2/>

                            {allUserPost.map((v,i) =>
                                v.UserPost !== undefined  ? (
                                <Postcards>
                                    {v.UserPost.image ?
                                    <img  src={process.env.NEXT_PUBLIC_APP_S3_IMAGE_BUCKET+v.UserPost.image}/>
                                    : v.UserPost.video ?
                                    <img  src={process.env.NEXT_PUBLIC_APP_S3_IMAGE_BUCKET+v.UserPost.video.replace("mp4","png")}/>
                                    : v.UserPost.youtubeLink ?
                                    <ReactPlayer />
                                    :<p></p>
                                    }
                                        <div>
                                                <label>
                                                {v.UserPost.writeup.length > 200 ? v.UserPost.writeup.substring(0,140)+"... read more" : v.UserPost.writeup}
                                                </label>
                                                <div>
                                                    <button><RiPencilLine/></button>
                                                    <button><RiDeleteBin3Line/> </button>
                                                </div>
                                        </div>  
                                </Postcards>
                                ):<div  id='loaders'>
                                        Loading...
                                </div>
                            )}
                        
                        </Signinuserrightsection>
                        
                    </Section>
                    <Postmodel showModel={showModel} redirectUser={redirectUser}/>
                </Container>
        </>
    )
}


const Container = styled.div`



`;

const Section = styled.section`
display: flex;
width:70%;
height: 100vh;
margin-top:150px;
margin-left:auto;
margin-right:auto;
text-align:center;


@media(max-width: 768px) {
height: auto;
width:100%;
flex-wrap:wrap;
}

`;


const User_Page =  styled.div`
overflow:hidden;
margin-bottom: 8px;
width:100%;
background-color: #fff;
border-radius: 5px;
transition: box-shadow 83ms;
border:none;
box-shadow: 0 0 0 1px rgba(0 0 0/15%), 0 0 0 rgba(0 0 0/20%);

@media(max-width:768px){
width:100%;
margin-left:auto;
margin-right:auto;
}
`;



const User_Page2 =  styled(User_Page)`
height:200px;
width:100%;
margin-top:20px;

@media(max-width:768px){
width:100%;
margin-left:auto;
margin-right:auto;
}
`;



const UserInfo = styled.div`
border-bottom:1px solid rgba(0,0,0,0.15);
padding: 12px 12px 16px;
word-wrap:break-word;
word-break:break-word;

`;



const CardBackground = styled.div`
background: url('/images/card-bg.svg');
background-position:center;
background-size:462px;
height:54px;
margin: -12px -12px 0;
`;


const UserNameDisplay = styled.div`
margin-top:20px;

`;

const CommonCard = styled.div`
text-align:center;
overflow:hidden;
margin-bottom:3px;
background-color:#fff;
border-radius:5px;
position:relative;
border:none;
box-shadow: 0 0 0 1pz rgba(0 0 0 /15%), 0 0 0 rgba(0 0 0/20%);

`;



const Sharebox = styled(CommonCard)`
display: flex;
flex-direction:column;
color:#95ab7b;
margin: 0 0 8px;
background:white;
margin-top:15px;

div{
button{
outline:none;
color:rgba(0,0,0,0.6);
font-size:14px;
line-height:1.5px;
min-height:48px;
background:transparent;
border:none;
display:flex;
align-items:center;
font-weight:600;
}
&:first-child{
display:flex;
align-items:center;
padding: 8px 16px 0px 16px;
}
img{
width:58px;
border-radius:50%;
margin-right:8px;
}
button{
margin: 4px 0;
flex-grow:1;
border-radius:35px;
padding-left:16px;
border:1px solid rgba(0,0,0,0.15);
background:#fff;
text-align:left;
}

h5{
position: absolute;
margin-left: 20px;
font-weight:700;
font-size:20pt;
color:#fff;
font-family: "Poppins", sans-serif;
}

}



@media(max-width:768px){
div{
img{
width:38px;
}
button{
min-height:38px;
}
h5{
margin-left: 12px;
}
}
}
`;


const Signinusersection  = styled.div`
height: 80vh;
width: 50%;
overflow:hidden;
border-radius: 5px;
transition: box-shadow 83ms;
border: none;
margin: 5px;




@media(max-width: 768px) {
width: 90%;
display: block;
margin: auto;
margin-bottom: 25px;
margin-top: 100px;
height: 60vh;

}

`;


const Signinuserrightsection = styled.div`
height: 70vh;
width: 50%;
margin: 5px;
border-radius: 5px;
transition: box-shadow 83ms;
border: none;
background: #fff;
box-shadow: 0 0 0 1px rgba(0 0 0/15%), 0 0 0 rgba(0 0 0/20%);
display: flex;
flex-wrap:wrap;
overflow-y:scroll;
overflow-x:hidden;



#loaders{
display: flex;
justify-content:center;
text-align:center;
align-items:center;
width: 100px;
height: 100px;
border:0.5px solid #000;
border-radius:50%;
margin-left:40%;
margin-top:35%;
}

::-webkit-scrollbar {
display: none;
}


@media(max-width:768px){
flex-wrap:wrap;
width: 90%;
margin-left:auto;
margin-right:auto;

#loaders{
margin-left:36%;
margin-top:50%;
}
}
`;


const CardBackground2 = styled.div`
background: url('/images/card-bg.svg');
background-position:center;
background-size:462px;
height:45px;
width: 100%;
margin: 0px;
`;



const Postcards = styled.div`
height: 100px;
width: 100%;
margin: 10px;
background: #f5f5f5;
border-radius:10px;
display: flex;



img{
object-fit:cover;
width: 100px;
height: 100px;
border-radius: 10px 0px 0px 10px;
}

div{
display: flex;
flex-wrap:wrap;
width: 80%;

label{
font-size:10pt;
height: 70%;
width: 100%;
text-align:left;
padding: 5px;
}

div{
margin-left: auto;
width: 30%;
height: 20%;
margin-top:-25px;
justify-content:space-between;
button{
margin: 5px;
}
}

}


@media(max-width:768px){
width: 100%;
justify-content:center;



div{
div{
width: 60%;
}
}
}
`;


const mapStateoProps = (state) =>{
    return{
        user:state.userState.user,
    };
};

const mapDipatchToProps = (dipatch) => ({

})

export default connect(mapStateoProps,mapDipatchToProps)(User);