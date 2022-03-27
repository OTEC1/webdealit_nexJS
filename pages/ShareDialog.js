import { useState } from "react";
import styled  from "styled-components";
import {FacebookShareButton,TwitterShareButton,WhatsappShareButton,FacebookIcon,WhatsappIcon,TwitterIcon} from 'react-share'



const ShareDialog = (props) => {

   
    const reset = (args) => {
        props.redirectUser(args);
    }


  
    return(
        <>
           {props.showModel === "open" &&(
            <ShareDialogs>
                <div>
                       <div id="house">
                                <div id="writeup">
                                    Share via
                                </div>
                                    <FacebookShareButton
                                            url={"https://us-central1-grelots-ad690.cloudfunctions.net/dynamicpostRender?i="+process.env.REACT_APP_BASE_URL+props.musicThumb+"&a="+props.musicArtist.toUpperCase()+"&t="+props.musicTitle+"&d="+props.doc_id_b+"&s="+props.section+"&m="+props.mail}
                                            quote={ props.section === "m" ? props.musicArtist.toUpperCase()+": "+  props.musicTitle+" Download @ webfly.click" : props.musicTitle}
                                            onClick={(e) => reset(e)}>
                                        <FacebookIcon round size={35}/>
                                    </FacebookShareButton>

                        </div>

                        <div id="house">
                            <div id="writeup">
                                Share via
                            </div>
                                <WhatsappShareButton
                                    url={"https://us-central1-grelots-ad690.cloudfunctions.net/dynamicpostRender?i="+process.env.REACT_APP_BASE_URL+props.musicThumb+"&a="+props.musicArtist.toUpperCase()+"&t="+props.musicTitle+"&d="+props.doc_id_b+"&s="+props.section+"&m="+props.mail}
                                    quote={ props.section === "m"  ? props.musicArtist.toUpperCase()+": "+  props.musicTitle+" Download @ webfly.click" :  props.musicTitle}
                                    onClick={(e) => reset(e)}>
                                  <WhatsappIcon round size={35}/>
                                </WhatsappShareButton>
                        </div>



                        <div id="house">
                                <div id="writeup">
                                    Share via
                                </div>
                                    <TwitterShareButton
                                        url={"https://us-central1-grelots-ad690.cloudfunctions.net/dynamicpostRender?i="+process.env.REACT_APP_BASE_URL+props.musicThumb+"&a="+props.musicArtist.toUpperCase()+"&t="+props.musicTitle+"&d="+props.doc_id_b+"&s="+props.section+"&m="+props.mail}
                                        quote={ props.section === "m"  ? props.musicArtist.toUpperCase()+": "+  props.musicTitle+" Download @ webfly.click" : props.musicTitle}
                                         onClick={(e) => reset(e)}>
                                         <TwitterIcon round size={35}/>
                                    </TwitterShareButton>
                        </div>

                        <button onClick={(e) => reset(e)}>Cancel</button>
                </div>   
             </ShareDialogs>
            )}
            </>
           
         )
}


const ShareDialogs = styled.div`
position: absolute;
width: 30%;
height: 200px;
z-index:500;
background: #fff;
border-radius:10px;
margin-top:20%;
top:0;
padding: 20px;
margin-left:35%;
z-index:999;



#house{
width: 100%;
display: flex;
justify-content:space-between;
align-items:center;
text-align:left;
margin: 10px;
}


button{
border: none;
border-radius:10px;
padding: 10px;
font-weight:700;
}



@media(max-width:768px){
position: fixed;
overflow: hidden;
width: 100%;
height: 250px;
bottom: 0;
margin-left:0px;
margin-bottom:80px;
margin-top:40vh;
padding: 0px;

#house{
width: 95%;
}
button{
margin: 5px;
}
}
`;



export default ShareDialog;


