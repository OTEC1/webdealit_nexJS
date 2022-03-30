import { RiArrowRightFill, RiArrowRightSLine, RiEye2Line, RiFacebookBoxLine, RiGoogleFill, RiInstagramLine, RiLockPasswordLine, RiMailLine, RiTwitterLine } from 'react-icons/ri';
import {connect} from 'react-redux'
import { CustomSignIn, signInAPIGoogle,handleError,signInfacebookApi} from '../actions';
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import swal from 'sweetalert2'
import {useRouter} from 'next/router'
import  axios  from 'axios';
import Loader from 'react-loader-spinner';
import FacebookProvider, {Login} from 'react-facebook-sdk'
import Link from 'next/link'





const Signin = (props) => {

    const route = useRouter();

    const Viewpass = () => {
        const pass2 = document.querySelector('#password');
        if(!document.getElementById('password').value)
            console.log()
        else{
            const type = pass2.getAttribute('type') === 'password' ? 'text' : 'password';
            pass2.setAttribute('type', type);
        }
    }



    const ForgotPass =()=> {
    
    }


    const CreateAccount =()=>{
    }

    function handleResponse(data){
        window.sessionStorage.setItem("fbuser",JSON.stringify(data));
       if(data && !props.user){ 
        signInfacebookApi(data);
        router.push("/"); 
     }
    }
    
     
    const Redirect = () =>{
        route.push("/");
    }

  


    return(
               <Container>
                   {props.user && Redirect() }
                        <Section className="screen">
                            <Content>
                              <Screencontent>
                                    <Logins>
                                        <Loginfield>
                                            <RiMailLine id='mail' size={20}  color='#6A679E'/>
                                            <input type="text" className="login__input" placeholder="Username / Email"   id='email'/>
                                        </Loginfield>


                                        <Loginfield>
                                            <RiLockPasswordLine id='pass' size={20}  color='#6A679E'/>
                                            <input type="password" className="login__input" placeholder="Password"  id='password' />
                                            <RiEye2Line  id='Eye'  onClick={Viewpass} size={20}  color='#000' />
                                        </Loginfield>

                                            
                                        <button  onClick={(e) => props.Login(1)}>
                                            
                                            <span id="button__text">{props.promise ?  <Loader  type="Oval" color="#6A679E" height={20}  width={20}/> : "login" }</span>
                                            <RiArrowRightSLine size={20}  color='#6A679E'/>
                                        </button>		

                                        <Carries>
                                            <Link href="/Register">
                                               <a onClick={CreateAccount}>Dont have an account ? Create  account</a>	
                                            </Link>
                                            <br/>	
                                            <a onClick={ForgotPass}>Forgot Password</a>	
                                        </Carries>
                                        
                                    </Logins>

                                    <Sociallogin>
                                        <h3>log in via</h3>
                                        <Socialicons>
                                          

                                            <FacebookProvider appId={process.env.NEXT_PUBLIC_APP_ID}>
                                                <Login
                                                scope="email"
                                                onResponse={handleResponse}
                                                onError={handleError}>
                                                <RiFacebookBoxLine size={20}  color='#fff'/>
                                                </Login>
                                            </FacebookProvider>

                                           
                                            <RiInstagramLine  size={20} color='#fff'/>
                                            <RiTwitterLine  size={20} color='#fff'/>
                                            <RiGoogleFill  onClick={() => props.Login(2)} size={20} color='#fff'/>
                                        </Socialicons>
                                    </Sociallogin>
                            </Screencontent>


                                <Screenbackground>
                                    <span className="screen__background__shape screen__background__shape4"></span>
                                    <span className="screen__background__shape screen__background__shape3"></span>		
                                    <span className="screen__background__shape screen__background__shape2"></span>
                                    <span className="screen__background__shape screen__background__shape1"></span>
                                </Screenbackground>
                              </Content>
                        </Section>
               </Container>
           
    )
}


const Container = styled.div`  
box-sizing: border-box;	
font-family: Raleway, sans-serif;
background: linear-gradient(90deg, #C7C5F4, #776BCC);	
height: 100%;
margin:0;
padding:0;

#mail{
position: absolute;
margin-left:1px;
margin-top:5px;
}


#pass{
position: absolute;
margin-left:1px;
margin-top:5px;
}



#Eye{
position: absolute;
right:40px;
cursor: pointer;
}


h3{
margin-bottom:10px;
}

@media(max-width:768px){
overflow: hidden;
}
`;


const Carries = styled.div`
margin-top:10px;
cursor: pointer;
a{
font-size:10pt;
color: navy;
text-decoration:none;
}
`;

const  Section = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh;

`;

const Content =styled.div`		
background: linear-gradient(90deg, #5D54A4, #7C78B8);		
position: relative;	
height: 600px;
width: 360px;	
box-shadow: 0px 0px 24px #5C5696;
`;

const Screencontent = styled.div`
z-index: 1;
position: relative;	
height: 100%;
`;

const Screenbackground = styled.div`		
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: 0;
-webkit-clip-path: inset(0 0 0 0);
clip-path: inset(0 0 0 0);	


.screen__background__shape {
transform: rotate(45deg);
position: absolute;
}

.screen__background__shape1 {
height: 520px;
width: 520px;
background: #FFF;	
top: -50px;
right: 120px;	
border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
height: 220px;
width: 220px;
background: #6C63AC;	
top: -172px;
right: 0;	
border-radius: 32px;
}

.screen__background__shape3 {
height: 540px;
width: 190px;
background: linear-gradient(270deg, #5D54A4, #6A679E);
top: -24px;
right: 0;	
border-radius: 32px;
}

.screen__background__shape4 {
height: 400px;
width: 200px;
background: #7E7BB9;	
top: 420px;
right: 50px;	
border-radius: 60px;
}

`;


const Logins = styled.div`
width: 320px;
padding: 30px;
padding-top: 156px;


button{
margin-top:45px;
padding: 15px;
border-radius:30px;
width: 200px;
text-transform:uppercase;
font-weight:900;
display: flex;
justify-content:space-between;
color: #6A679E;
background: #fff;
border: 1px solid #6A679E;
box-shadow: rgba(106, 103, 158, 0.35) 0px 5px 15px;
cursor: pointer;
}

button:hover{
width: 220px;
}
`;


const Loginfield = styled.div`
padding: 20px 0px;	
position: relative;	
.login__input {
border: none;
border-bottom: 2px solid #D1D1D4;
background: none;
padding: 10px;
padding-left: 24px;
font-weight: 700;
width: 75%;
transition: .2s;
}
.login__input:active,
.login__input:focus,
.login__input:hover {
outline: none;
border-bottom-color: #6A679E;
}



.login__submit {
background: #fff;
font-size: 14px;
margin-top: 30px;
padding: 16px 20px;
border-radius: 26px;
border: 1px solid #D4D3E8;
text-transform: uppercase;
font-weight: 700;
display: flex;
align-items: center;
width: 100%;
color: #4C489D;
box-shadow: 0px 2px 2px #5C5696;
cursor: pointer;
transition: .2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
border-color: #6A679E;
outline: none;
}

`;


const Sociallogin = styled.div`	
position: absolute;
height: 140px;
width: 160px;
text-align: center;
bottom: 0px;
right: 0px;
color: #fff;
`;

const Socialicons =styled.div`
display: flex;
align-items: center;
justify-content: space-evenly;
cursor: pointer;

`;


const mapStateToProps = (state) => {
    return{
        user: state.userState.user,
        promise: state.promiseState.promise,
        fbuser:state.fbState.fbuser,
    };
}


const mapDispatchToprops = dispatch => ({
    Login: (e) => {e == 1 ? dispatch(CustomSignIn()) : dispatch(signInAPIGoogle())},
});
export default connect(mapStateToProps,mapDispatchToprops)(Signin);

