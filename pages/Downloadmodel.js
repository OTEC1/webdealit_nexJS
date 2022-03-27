import React, { Component, useEffect }  from 'react';
import styled from "styled-components";
import AWS from 'aws-sdk';
import {postArticleAPI} from '../actions';
import {useState,useRef} from "react";
import {connect} from "react-redux";
import axios from 'axios';
import swal from 'sweetalert2'
import ReactPlayer from 'react-player'
import { RiAlbumLine, RiCamera2Line, RiGalleryFill, RiGalleryLine, RiPictureInPicture2Line, RiRefreshLine, RiVideoAddLine, RiVideoUploadLine, RiYoutubeFill, RiYoutubeLine } from 'react-icons/ri';
import {v4 as uuid4}  from 'uuid';




const Downloadmodel = (props) => {


const [progress1, setProgress1] = useState(false);
const [progress2, setProgress2] = useState(false);
const [downloadlinks1, setdownloadlinks1] = useState([]);
const [downloadlinks2, setdownloadlinks2] = useState([]);



const reset = () => {
    props.closemodel();
}

const Value = () => {}
    


const startDowload = (urls,title,n) => {

    console.log(n, "   ", urls);

    if( n === 1){
        alert("Started Downloading "+  title)
        window.open(urls, '_blank').focus();
    }else{

        axios({ url: urls,
            method: 'GET', responseType: 'blob',})
            .then((response) => { 
               const url = window.URL.createObjectURL(new Blob([response.data])); 
               const link = document.createElement('a');
               link.href = url; link.setAttribute('download', title);
               document.body.appendChild(link); link.click();     
            }).catch(err => {
                alert(err);
            })
    }
}



useEffect(() => {
    setdownloadlinks1(props.link.original_lang);
    setdownloadlinks2(props.link.persian_sub);
    console.log(props.link.original_lang, "   ",props.link.persian_sub)
},[])

    return(
        <>  
        {props.showModel === "open" &&(
            <Container>
                <Content>
                    <Header>
                    <h2>Download links has been generated</h2>
                    <button  onClick={(event) => reset(event)}>X</button>
                    </Header>

                        <SharedContent>
                                <UserInfo>
                         
                                </UserInfo>

                                <Editor>
                                    <table>
                                        <tbody>
                                            {downloadlinks1 !== undefined && downloadlinks1 !== null ?
                                              downloadlinks1.map((v,i) =>
                                               v !== undefined ?
                                                <tr>
                                                  <td>

                                                      {i !== 0 ?
                                                        <PostButton  onClick={(e) => startDowload(v.downloadLinks,props.moviename,1)}>
                                                           Server A download link {i}
                                                        </PostButton>
                                                        :
                                                        "" }
                                                </td>
                                                </tr>
                                                : console.log("Undefind found ")
                                                ):  <tr>
                                                        <td>

                                                                <PostButton  onClick={(e) => startDowload(props.link,props.moviename,2)}>
                                                                 Server A download link 1
                                                                </PostButton>
                                                        </td>
                                                    </tr>
                                               } 

                                            {downloadlinks2 !== undefined && downloadlinks2 !== null ?
                                               downloadlinks2.map((v,i) =>
                                               v !== undefined ?
                                                <tr>
                                                  <td>
                                                  {i !== 0 ?
                                                    <PostButton   onClick={(e) => startDowload(v.downloadLinks,props.moviename,1)}>
                                                       Server B download link {i}
                                                    </PostButton>
                                                    :
                                                    ""}
                                                </td>
                                                </tr>
                                                : console.log("Undefind found ")
                                              ): <>
                                                <br/><br/>
                                                 Server requesting for link pls wait...                                          
                                                </>
                                               } 
                                            
                                        </tbody>
                                    </table>
                              
                                </Editor>  
                                
                            </SharedContent>

                            <ShareCreation>
                                <Attach>
                                  <RiCamera2Line size={20} id='pic'  onClick={(e) => Value("Pic")} />
                                  <RiVideoUploadLine size={20} id='vid' onClick={(e) => Value("Vid")}/>
                                  <RiYoutubeFill size={20} id='vid' onClick={(e) => Value("You")}/>
                                </Attach>
                        </ShareCreation>
                </Content>
        </Container>
        )}
        </>
    )       
}






const Container = styled.div `
position:fixed;
top:0;
left:0;
bottom:0;
color:black;
width:100%;
z-index:999;
background-color: rgba(0,0,0,0.8);

`;



const Content  =  styled.div`
max-width:40%;
background-color: white;
max-height:90%;
overflow:initial;
border-radius: 5px;
position: relative;
display: flex;
flex-direction: column;
margin: 0 auto;
margin-top:100px;


@media(max-width: 968px){
max-width:100%;
}

`;




const Header  =  styled.div`
display:  block;
padding : 16px 20px;
border-bottom: 1px solid rgba(0,0,0,0.15);
font-size:16px;
line-height: 1.5;
color: rgba(0,0,0,0.6);
font-weight: 400;
display:flex;
justify-content: space-between;
align-items:center;

button{
height:40px;
width:40px;
min-width:auto;
}
`;



const SharedContent = styled.div`
display:flex;
flex-direction: column;
flex-grow:1;
overflow-y:auto;
vertical-align: baseline;
background: transparent;
padding: 8px 12px;

::-webkit-scrollbar {
display: none;
}
`;



const UserInfo = styled.div`
display: flex;
align-items: center;
padding: 12px 24px;
svg,img{
width:48px;
height:48px;
background-clip: content-box;
border:2px solid  transparent;
border-radius:50%;
padding:5px;
}
span{
font-weight:600;
font-size:16px;
line-height:1.5px;
}

h5{
position: absolute;
margin-left: 22px;
font-weight:700;
font-size:20pt;
color:#fff;
font-family: "Poppins", sans-serif;
}
`;



const ShareCreation = styled.div`
display:flex;
justify-content: space-between;
padding: 12px 24px 12px 16px;
`;


const Attach = styled.div`
display:flex;
height:40px;
width: 30%;
min-width: auto;
color: rgba(0,0,0,0.5);
justify-content:space-between;
cursor:pointer;


#pic{
margin: 10px;
color: #000;
}

#vid{
margin: 10px;
color: #000;
}
`;





const PostButton = styled.button`
min-width:60px;
border-radius: 20px;
padding-left: 16px;
padding-right: 16px;
height: 35px;
right:2px;
background: #0a66c2;
color: white;
&:hover{
background:#004162;
}
`;


const Editor = styled.div`
display: flex;
justify-content:center;
align-items:center;
text-align:center;

`;





const  mapStateToProps = (state)  => {
    return {
        user: state.userState.user,
    };
};

const mapDistpachToProps = (dispatch) => ({
   
});

export default  connect(mapStateToProps,mapDistpachToProps)(Downloadmodel);

