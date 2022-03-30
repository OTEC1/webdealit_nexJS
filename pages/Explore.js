import React from 'react';
import styled from 'styled-components'
import ReactPlayer from 'react-player';
import Loader from 'react-loader-spinner';
import WriteUp from './WriteUps';
import { RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';
import { useState, useRef,useEffect} from 'react';
import Load from './Load';
import {updatePostlikes,format,app} from '../actions'
import {CloudinaryContext, Image, Transformation} from 'cloudinary-react'
import  {MobileView, BrowserView}  from 'react-device-detect';
import { connect } from 'react-redux';
import axios from 'axios';
import Images from './Images';



const Explore  =  (props) => {


    useEffect(()=>{
        window.scrollTo(0,0);
      },[])

    const [react, setReact] = useState(false);
    const [update, setUpdate] = useState(false);
    const imgRef = useRef();


    const reset =  (email, docA, docB) =>  {
        if(react){
            setReact(false);  setUpdate(false);
        }else{
            setReact(true); updatePostlikes(1,1,0,email,docA,docB); setUpdate(true);
        }
    } 


    useEffect(() => {
     if(props.fbuser)
         apicall(props.fbuser.tokenDetail.userID,props.fbuser.tokenDetail.accessToken)    
    
    },[props.fbuser])


    
   
    function apicall(n,x){
        axios.get(`https://graph.facebook.com/${n}/accounts?access_token=${x}`)
        .then(res=>{
            console.log(res)
            permissoncheck(res.data.data)
        }).catch(err =>{
                console.log(err)
        })
    }




    function permissoncheck(d){}

  
    return(
       <>
        <Container>
           <Content>
            {props.frame === "Pictureframe" ? (
                        <div className='frame'>  
                                   <div>  
                                       <div  id='soap'>
                                           <table>
                                               <tr>
                                                   <td   onClick={() => reset(props.useremail,props.doc_id_a, props.doc_id_b)}>
                                                    {!react ?  <RiThumbUpLine  id='thumb'/> :  <RiThumbUpFill color='#4180FF'  id='thumb'/>}
                                                   </td>
                                               </tr>

                                               <tr>
                                                   <td>
                                                   <span>{update ?  parseInt(format(props.likes))+1 : format(props.likes)}</span>
                                                   </td>
                                               </tr>
                                           </table>
                                       </div>
                                        <Images title={props.title} cloud={sessionStorage.getItem("cloud")} />
                                        <WriteUp title={props.title}  date_time={props.date_time}  writeup={props.writeup}  views={props.views}  doc_id_b={props.doc_id_b} media={props.media}  frame={props.frame}   doc_id_a={props.doc_id_a}  User={props.useremail}/>
                                    </div>
                                </div>  
                                
                                ):props.frame === "Videoframe" ? (
                                    <div className='frame'> 
                                     <div>

                                        <div  id='soap'>
                                            <table>
                                                <tr>
                                                    <td   onClick={() => reset(props.useremail,props.doc_id_a, props.doc_id_b)}>
                                                        {!react ?  <RiThumbUpLine  id='thumb'/> :  <RiThumbUpFill color='#4180FF'  id='thumb'/>}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                    <span>{update ?  parseInt(props.likes)+1 : format(props.likes)}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>

                                            <ReactPlayer  alt={props.title}   width="100%"  height="400px"  controls url={process.env.REACT_APP_APP_S3_VIDEO_BUCKET+props.media}  autoPlay />
                                            <WriteUp title={props.title}  date_time={props.date_time}  writeup={props.writeup}  views={props.views}  doc_id_b={props.doc_id_b}  media={props.media}  frame={props.frame}  doc_id_a={props.doc_id_a} User={props.useremail}/>
                                     </div>
                                    </div>
                                  ):props.frame === "Playerframe" ? (
                                    <div className='frame'>  
                                      <div>
                                        <div  id='soap'>
                                            <table>
                                                <tr>
                                                    <td   onClick={() => reset(props.useremail,props.doc_id_a, props.doc_id_b)}>
                                                        {!react ?  <RiThumbUpLine  id='thumb'/> :  <RiThumbUpFill color='#4180FF'  id='thumb'/>}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                    <span>{update ?  parseInt(format(props.likes))+1 : format(props.likes)}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                         </div>

                                        <ReactPlayer  alt={props.title}   width="100%"  height="400px" controls url={props.media}  autoPlay/>
                                        <WriteUp title={props.title}  date_time={props.date_time}  writeup={props.writeup}  views={props.views}   doc_id_b={props.doc_id_b}  media={props.media} frame={props.frame} doc_id_a={props.doc_id_a} User={props.useremail} />
                                      </div>
                                    </div>
                                ):(<p></p>)

                           }
        </Content>
        </Container>
     </>
    
    )

  
    
}


const Container = styled.div`
width: 100%;
margin-bottom:100px;
`;



const Content = styled.div`
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
width:80%;
margin:auto;
margin-top:40px;
padding-bottom:100px;



.frame{
width: 60%;
height: auto;
margin-bottom:10px;
position: relative;
}



#soap{
position: absolute;
height: 70px;
width: 70px;
border-radius:50%;
background: #fff;
display: flex;
right:0;
margin-right:20px;
margin-top:-35px;
text-align:left;
justify-content:center;
align-items:center;
}

#thumb{
font-size:25pt;
cursor: pointer;
}



span{
display: flex;
text-align:center;
justify-content:center;
align-items:center;
}




@media(max-width:968px){
width: 100%;

.frame{
width: 100%;
margin: none;
}

img{
height: 300px;
width: 100%;
}


#soap{
height: 70px;
width: 70px;
margin-right:5px;
margin-top:-35px;
}
#thumb{
font-size:19pt;
}



span{
font-size:10pt;
}
}
`;






const  mapStateToProps = (state)  => {
    return {
        fbuser: state.fbState.fbuser,
        user:state.userState.user,
    };
};

const mapDistpachToProps = (dispatch) => ({
   
});


export default  connect(mapStateToProps,mapDistpachToProps)(Explore);