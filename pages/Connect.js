import styled from 'styled-components'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loader from 'react-loader-spinner'

const Connect = (props) => {

    

    const [name, setName] = useState('');
    const [emailPhone, setEmailPhone] = useState('');
    const [message, setMassage] = useState('');
    const [respones, setRespones] = useState('');
    const [send, setsend] = useState(false);



    useEffect(() => {
        window.scrollTo(0,0);
    },[])


    const Post = () => {
            if(name && emailPhone && message)
                    PostRequest();
            else
               Swal.fire({text:"Pls fill out all fields !", icon:"warning"})
    }



    const PostRequest = () => {
        let user ={User:{name:name,emailPhone:emailPhone,message:message}}
        setsend(true);
        axios.post(process.env.REACT_APP_POST_CONNECT,user)
            .then(res => {
                setsend(false);
                  Snackbar();
                setRespones(res.data.message);
                setName(''); setEmailPhone(''); setMassage('');
            }).catch(err => {
                console.log(err)
            })
    }




    function Snackbar() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }

    return (
        <>
         
            
        <Container>  

            <div id='spinner'>
                <div id="snackbar">{respones}</div>
                {send ? <Loader  id type='Oval'  size={5} color='#fff'/> : ""}
            </div> 
            <div>
                <table>
                    <tr>
                        <td>
                        <h3>Contact Us</h3>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input  placeholder='Name'   value={name}   onChange={(e) => setName(e.target.value)}/>  &nbsp;  <input  placeholder='Email or Phone number'   value={emailPhone} onChange={(e) => setEmailPhone(e.target.value)}/>
                        </td>
                    </tr>

                
                    <tr>
                        <td>
                            <textarea  placeholder='Message'   value={message}  onChange={(e) => setMassage(e.target.value)}/>
                        </td>
                    </tr>

                    <tr>
                        <td>
                        {!send ? <button  onClick={(e) => Post()}>Send</button> : ""}
                        </td>
                    </tr>
                </table>
            </div>
        </Container>
        
        </>

    )
}


const Container = styled.div`
display: flex;
text-align:center;
overflow-x:hidden;


div{
border-radius:10px;
padding:10px;
width: 40%;
height: auto;
margin-left:auto;
margin-right:auto;
margin-top:150px;
align-items:center;
margin-bottom:100px;

table{
width: 100%;
tr td{
width: 100%;
display: flex;


input{
width: 50%;
border: 1px solid #f5f5f5;
border-radius:5px;
padding: 10px;
background: transparent;
color: #f5f5f5;
z-index:99;
}

textarea{
margin-top:20px;
width: 100%;
height: 200px;
border: 1px solid #f5f5f5;
border-radius:5px;
padding: 10px;
background: transparent;
color: #f5f5f5;
resize:none;
z-index:99;

}


button{
width:100%;
padding: 10px;
border-radius:5px;
background: #f5f5f5;
cursor:pointer;
margin-top:20px;
}
h3{
font-weight:700;
color: #f5f5f5;
font-size:25pt;
font-family: "Poppins", sans-serif;
}
}
}
}



#spinner{
position: absolute;
width: 300px;
margin-left:38%;
margin-right:auto;
margin-top:10%;
}


#snackbar{
  visibility: hidden; 
  width: 400px;
  background-color: #f5f5f5; 
  color: #000; 
  text-align: center; 
  border-radius: 2px; 
  border-radius:10px;
  margin-top: 0px;
  margin-left:-55px;
}
#snackbar.show {
  visibility: visible; 
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 30px; opacity: 1;}
}

@keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {top: 30px; opacity: 1;}
  to {top: 0; opacity: 0;}
}

@keyframes fadeout {
  from {top: 30px; opacity: 1;}
  to {top: 0; opacity: 0;}
}





@media(max-width:968px){
overflow-x:hidden;

#spinner{
width: 80%;
margin-left:7%;
margin-top:25vh;


}


#snackbar {
width: 90%;
left: 0; 
margin-left:0px;
}

div{
width: 100%;
}
}
`;


export default Connect;