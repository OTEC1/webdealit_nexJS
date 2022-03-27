import { RiArrowRightFill, RiArrowRightSLine, RiEye2Line, RiFacebookBoxLine, RiGoogleFill, RiInstagramLine, RiLockPasswordLine, RiMailLine, RiTwitterLine } from 'react-icons/ri';
import styled from 'styled-components'
import { useState } from 'react';
import swal from 'sweetalert2'
import axois from 'axios'
import Loader from 'react-loader-spinner';
import { useRouter } from 'next/router'
var validator = require("email-validator");



const Register = () => {

    const [email, setEmail] = useState('');
    const [promise, setPromise] = useState('');
    const [login, setLogin] = useState(false);
    const history = useRouter();

    const LoginUI = () => {
        history.push("/auth");
    }

    async function  HASH(data){
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(parseInt(process.env.REACT_APP_BYCRPT_TIME));
        return (await bcrypt.hash(data.toString(), salt));
    }
  

    const authdata = () => {
        if(email.length <=0 || !document.querySelector('#password').value || !document.querySelector('#password2').value)
            swal.fire({text:"Pls fill out all fields ! ", icon:'warning'})
        else
           if(!validator.validate(email))
              swal.fire({text:"Invalid email !", icon:'error'})
        else
          if(document.querySelector('#password').value !== document.querySelector('#password2').value)
            swal.fire({text:"Password dosen't match ! ", icon:'warning'})
         else
            if(email && document.querySelector('#password').value.length > 0){
                setPromise(true);  setLogin(false);
                HASH(document.querySelector('#password').value)
                  .then(res => {
                    axois.post("https://us-central1-grelots-ad690.cloudfunctions.net/webdealit_RegisterUser",{User:{email:email,password:res}})
                        .then(res => {
                            swal.fire({text:res.data.message, icon: res.data.message === "New User account Registerd" ? 'success' : 'error'});
                            if(res.data.message === "New User account Registerd"){
                                document.querySelector('#password').value=''; document.querySelector('#password2').value=''; setEmail('')
                                  setLogin(true);
                            }
                                  setPromise(false);
                        }).catch(err => {
                            alert("Error occurred ", err);
                            setPromise(false);
                            setLogin(false);
                        }) 
                  })  
          }
    }
            


    const Viewpass = () => {
        const pass2 = document.querySelector('#password');
        if(!document.getElementById('password').value){
            console.log('nothing');
        }else{
            const type = pass2.getAttribute('type') === 'password' ? 'text' : 'password';
            pass2.setAttribute('type', type);
        }
    }


    const Viewpass2 = () => {
        const pass2 = document.querySelector('#password2');
        if(!document.getElementById('password2').value){
            console.log('nothing');
        }else{
            const type = pass2.getAttribute('type') === 'password' ? 'text' : 'password';
            pass2.setAttribute('type', type);
        }
    }







    return(
                <Container>
                        <Section class="screen">
                            <Content>
                              <Screencontent>
                                    <Login>
                                        <Loginfield>
                                            <RiMailLine id='mail' size={20}  color='#6A679E'/>
                                            <input type="text" class="login__input" placeholder="Username / Email"   value={email}  onChange={(e) => setEmail(e.target.value)}/>
                                        </Loginfield>

 


                                        <Loginfield>
                                            <RiLockPasswordLine id='mail' size={20}  color='#6A679E'/>
                                            <input type="password" class="login__input" placeholder="Password"  id='password'/>
                                            <RiEye2Line  id='Eye'  onClick={Viewpass} size={20}  color='#000' />
                                        </Loginfield>


                                        <Loginfield>
                                            <RiLockPasswordLine id='pass' size={20}  color='#6A679E'/>
                                            <input type="password" class="login__input" placeholder="Confirm password"  id='password2' />
                                            <RiEye2Line  id='Eye'  onClick={Viewpass2} size={20}  color='#000' />
                                        </Loginfield>
                                        <button  onClick={authdata}>
                                            <span id="button__text">{promise ?  <Loader  type="Oval" color="#6A679E" height={20}  width={20}/> : "Register" }</span>
                                            <RiArrowRightSLine size={20}  color='#6A679E'/>
                                            
                                        </button>		

                                        <span id='loginprompt'  onClick={LoginUI}>{login ? "Pls click here to login" : ""}</span>
                                        
                                        
                                    </Login>

                                    <Sociallogin>
                                        <h3>Register via</h3>
                                        <Socialicons>
                                            <RiFacebookBoxLine size={20} color='#fff'/>
                                            <RiInstagramLine  size={20} color='#fff'/>
                                            <RiTwitterLine  size={20} color='#fff'/>
                                            <RiGoogleFill  size={20} color='#fff'/>
                                        </Socialicons>
                                    </Sociallogin>
                            </Screencontent>


                                <Screenbackground>
                                    <span class="screen__background__shape screen__background__shape4"></span>
                                    <span class="screen__background__shape screen__background__shape3"></span>		
                                    <span class="screen__background__shape screen__background__shape2"></span>
                                    <span class="screen__background__shape screen__background__shape1"></span>
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


const Login = styled.div`
width: 320px;
padding: 30px;
padding-top: 90px;


#loginprompt{
 color:#00FF55;
 text-align:center;
 justify-content:center;
 display: flex;
 margin-top:10px;
cursor: pointer;
}

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

export default Register;

