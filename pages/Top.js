import styled  from "styled-components";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import ReactPlayer from "react-player";
import  {RiEyeFill, RiEyeLine, RiThumbUpFill, RiThumbUpLine, RiLiveFill, RiArrowLeftCircleLine, RiArrowRightCircleLine, RiTv2Line, RiCodeView, RiSendPlaneLine, RiSendPlane2Line, RiSendPlaneFill } from 'react-icons/ri';
import { useEffect, useRef, useState } from "react";
import { updatePostlikes, format, format_text } from "../actions";
import {CloudinaryContext, Image, Transformation} from 'cloudinary-react'
import  {MobileView, BrowserView}  from 'react-device-detect';
import Bottom from "./Bottom";
import Link from 'next/link'
import { useRouter } from "next/router";



const Top = (props) => {
    var a  = 160, b = 290; 
    const [scrollPostion, setScrollPosition] = useState(0);
    const [L1, setL1] = useState([]);
    const [L2, setL2] = useState([]);
    const myref = useRef(null);
    const imgRef = useRef();
    const history = useRouter();
    

    const UserPage = () => {
      history.push("/");
   }


   let size,last_size;
   useEffect(() => {
     handelScrollPosition();
      if(props.post.length > 0){        
          size = props.post.length;
          setL1(props.post.slice(0,size/2));
          setL2(props.post.slice(size/2, size));
      }
   },[])



   const  onScrollRecoder  = () => {
    //const scrollY = window.scrollY 
    const scrollTop = myref.current.scrollTop
    sessionStorage.setItem("scrollPoint", scrollTop);
  }


    const navigates = (x) =>{
      let frame = x.frame;
      let useremail=x.useremail;
        updatePostlikes(1,0,1,useremail,x.doc_id_a,x.doc_id_b);
    }


  const handelScrollPosition = () => {
      const scroll = sessionStorage.getItem("scrollPoint");
      if(scroll){
        window.scrollTo(0,parseInt(scroll));
        sessionStorage.removeItem("scrollPoint");
      }
    };
  

     return(
    <>
     <Container>
             <TopSection>
                <TopLeftinnerDiv>
                    <SectionTab>
                        <div>
                          <RiLiveFill   size={20}  color="red"/> Explore feeds
                        </div>
                    </SectionTab> 
                    <Slider autoplay={1} 
                          duration={4500} 
                          previousButton={<RiArrowLeftCircleLine
                          color="red"/>} 
                          nextButton={<RiArrowRightCircleLine 
                          color="red"/>}>
                           {L1.map((value, index) => value.UserPost.image ?
                              <div id="Contain">
                                  <div id="post_author">
                                       <div>
                                          <img id="userImg" src={value.User.user_img !== "icons" ?  
                                            value.User.user_img : "images/customSignInbackground.png"} onClick={UserPage}/>
                                            &nbsp;<h5>{value.User.useremail}</h5> 
                                       </div>
                                  </div>
                                  <div id="image_cell">
                                          <BrowserView>
                                            <CloudinaryContext cloudName="otecdealings">
                                            <Image   alt={value.UserPost.title} publicId={value.UserPost.cloudinaryPub}/>
                                            </CloudinaryContext>
                                          </BrowserView>
                                   </div>
                                   <div id="image_cell">
                                      <MobileView>
                                        <CloudinaryContext cloudName="otecdealings">
                                                <Image alt={value.UserPost.title}   publicId={value.UserPost.cloudinaryPub}/>
                                        </CloudinaryContext>
                                      </MobileView>
                                    </div>
                                 

                                  <div id="writeup_and_reaction">
                                    <h5>{value.UserPost.title.length >100 ? value.UserPost.title.substring(0,100)+"..." : value.UserPost.title}</h5>
                                   <Link href={`/Read/${format_text(value.UserPost.title)}`}>
                                        <MobileView>
                                           <div id="write" onClick={(e)=>  navigates({frame:"Pictureframe",useremail:value.User.useremail, doc_id_a:value.UserPost.doc_id_a,doc_id_b:value.UserPost.doc_id_b, title: value.UserPost.title, cloudinaryPub: value.UserPost.cloudinaryPub, exifData: value.UserPost.exifData, media: value.UserPost.image, writeup: value.UserPost.writeup, date_time:value.UserPost.date_time, likes:value.UserPost.likes, views:value.UserPost.views})}>
                                                  {value.UserPost.writeup.length > a ? <>{value.UserPost.writeup.toString().substring(0, a)} ...<span>Read more</span></>
                                                  :<>{value.UserPost.writeup} <RiSendPlaneFill/></>}
                                            </div>   
                                        </MobileView>
                                   </Link>

                                   <Link href={`/Read/${format_text(value.UserPost.title)}`}>
                                        <BrowserView>
                                           <div id="write" onClick={(e)=>  navigates({frame:"Pictureframe",useremail:value.User.useremail, doc_id_a:value.UserPost.doc_id_a,doc_id_b:value.UserPost.doc_id_b, title: value.UserPost.title, cloudinaryPub: value.UserPost.cloudinaryPub, exifData: value.UserPost.exifData, media: value.UserPost.image, writeup: value.UserPost.writeup, date_time:value.UserPost.date_time, likes:value.UserPost.likes, views:value.UserPost.views})}>
                                                  {value.UserPost.writeup.length > b ? <>{value.UserPost.writeup.toString().substring(0, b)} ...<span>Read more</span></>
                                                  :<>{value.UserPost.writeup} <RiSendPlaneFill/></>}
                                            </div>
                                        </BrowserView>
                                   </Link>
                                    <div id="reaction">
                                      <div>
                                         {value.UserPost.views}
                                         &nbsp;
                                        <RiEyeFill/>
                                      </div>

                                       <div>
                                       {value.UserPost.likes}
                                        &nbsp;
                                        <RiThumbUpFill/>
                                      </div>
                                    </div>
                                  </div>
                               </div>
                              :
                             <p/>
                          )}
                    </Slider>
                </TopLeftinnerDiv>





                <AdRunner>
                    ADVERTISMENT SPACE
                </AdRunner>






              <RightDiv>
                    <SectionTab>
                        <div>
                          <RiTv2Line   size={20}  color="red"/> Sidebar feeds
                        </div>
                    </SectionTab>
                   <TopRightinnerDiv onScroll={onScrollRecoder} ref={myref}> 
                      {L2.length <= 0 ? <p></p>
                      :
                      L2.map((value, index) => 
                        value.UserPost.image ?
                                   <Locals>   
                                     <div  id="UserProfile1">
                                        <img id="userImg" src={value.User.user_img !== "icons" ?  
                                            value.User.user_img : "images/customSignInbackground.png"} onClick={UserPage}/>
                                            &nbsp;&nbsp;
                                          {value.User.useremail}
                                      </div>
                                          <BrowserView>
                                              <CloudinaryContext cloudName="otecdealings">
                                                      <Image   loading="lazy"  alt={value.UserPost.title}  width="100%"  height={index === 0 ? "300" : "200"} publicId={value.UserPost.cloudinaryPub}/>
                                              </CloudinaryContext>
                                            </BrowserView>

                                            <MobileView>
                                              <CloudinaryContext cloudName="otecdealings">
                                                      <Image   loading="lazy" alt={value.UserPost.title}   width="100%"  height="300" publicId={value.UserPost.cloudinaryPub}>
                                                        <Transformation    angle={value.UserPost.exifData} />
                                                      </Image>
                                              </CloudinaryContext>
                                            </MobileView>
                                      <Link href={`/Read/${format_text(value.UserPost.title)}`}>
                                        <RightSideWriteUp  
                                            onClick={(e)=>  navigates({frame:"Pictureframe",useremail:value.User.useremail, doc_id_a:value.UserPost.doc_id_a,doc_id_b:value.UserPost.doc_id_b, title: value.UserPost.title, cloudinaryPub: value.UserPost.cloudinaryPub, exifData: value.UserPost.exifData, media: value.UserPost.image, writeup: value.UserPost.writeup, date_time:value.UserPost.date_time, likes:value.UserPost.likes, views:value.UserPost.views})}>
                                              {
                                              value.UserPost.writeup.length > a ?
                                              <div>{value.UserPost.writeup.toString().substring(0, a)} ...<span>Read more</span></div>
                                              :
                                            <div>{value.UserPost.writeup} <RiSendPlaneFill/></div>
                                          }
                                        </RightSideWriteUp>
                                   </Link>
                                  </Locals>
                                  : "" 
                                )}
                       </TopRightinnerDiv>
                    </RightDiv>
              </TopSection>
        </Container>
         </>
    )
}



const Container = styled.div`
width: 90%;
text-align:center;
display: flex;
flex-wrap: wrap;
padding: 10px;
margin: 0 auto;
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
@media(max-width:768px){
height: 75vh;
width: 100%;
padding: 0px;

}


`;



const TopSection = styled.div`
display: flex;
flex-wrap:wrap;
height: 75vh;
width: 100%;
top:0;
@media(max-width:768px){
height: 50vh;
}
`;


const SectionTab = styled.div`
text-align:left;
width: 30%;
height: 25px;
align-items:left;
div{
color:#f5f5f5;
display: flex;
justify-content:space-between;
}
@media(max-width:768px){
width:35%;
}

`;




const AdRunner = styled.div`
display: none;
@media(max-width:768px){
display: flex;
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
height: 300px;
width: 100%;
margin-left:auto;
margin-right:auto;
justify-content:center;
align-items:center;
margin-top:100px;
text-align:center;
color:#FFF;
}
`;




const TopLeftinnerDiv = styled.div`
width: 50%;
height:100vh;
min-height:100vh;
max-height:100vh;
position:relative;


#Contain{
width: 100%;
height: 100%;
display:flex;
align-items:center;
text-align:center;
justify-content:center;

#post_author{
top:0;
width:100%;
height:30px;
position:absolute;
z-index:999;
div{
display:flex;
justify-content:center;
align-items:center;
text-align:center;
position:relative;
#userImg{
width:30px;
height:30px;
padding:5px;
margin-right:auto;
border-radius:50%;
}
h5{
margin-right:auto;
position:absolute;
margin-top:7px;
margin-left:50px;
color:#fff;
left:0;
top:0;
text-shadow: 2px 2px #4180FF;
}
}
}

#image_cell{
width:100%;
height:100%;
position:absolute;
border-radius:10px;
img{
width:100%;
min-width:100%;
max-width:100%
height:100%;
object-fit:cover;
border-radius:10px;
}
}

#writeup_and_reaction{
background-image: linear-gradient(to top right,#1f505f, #07091C);
width:100%;
height:120px;
position:absolute;
bottom:0;
left:0;
h5{
position:absolute;
left:0;
top:0;
color:#fff;
font-size:9pt;
padding:10px;
font-weight:900;
font-family: "Poppins", sans-serif;
}
#reaction{
top:0;
right:0;
width:100px;
height:30px;
background:#fff;
border-radius: 5px 0px 0px 5px;
margin-top:5px;
position:absolute;
display:flex;
justify-content:space-between;
div{
display:flex;
align-items:center;
justify-content:space-between;
padding:10px;

}
}
#write{
text-align:left;
color:#fff;
font-family: "Poppins", sans-serif;
padding:5px;
font-size:9pt;
margin-top:35px;
}
}
}



@media(max-width:768px){
width: 100%;
height: 90%; //Edit here for ad on homePage
min-height:90%;
max-height:90%;
#image_cell{
position:absolute;
border-radius:30px;
img{
width:100%;
height:400px;
min-height:400px;
max-height:400px;
object-fit:contain;
}
}
#Contain{
#writeup_and_reaction{
margin-bottom:40px;
}
}
}
`;


const RightDiv = styled.div`
width: 50%;
height:65vh;
min-height:65vh;
max-height:65vh;
position:relative;
@media(max-width:988px){
width:100%;
}
`;


const TopRightinnerDiv = styled.div`
overflow-y:scroll;
overflow-x:hidden;
justify-content:center;
height:90%;
width:100%;
display:flex;
flex-wrap:wrap;

::-webkit-scrollbar {
display: none;
}
& > *:first-of-type{
width: 100%;
height: 300px;
margin: 5px;
}

@media(max-width:768px){
width: 100%;
height: 130%;
overflow-x:hidden;
}


`;

const Locals = styled.div`
width: 48%;
margin: 2px;
font-size:10pt;
color:#fff;
height:60%;
position: relative;
text-shadow: 2px 2px #4180FF;
div{
img{
border-radius:10px;
width: 100%;
object-fit:cover;
}
}


#UserProfile1{
position: absolute;
width: 100%;
height: 50px;
display: flex;
color: #fff;
font-weight:700;
text-shadow: 2px 2px #4180FF;
padding: 5px;
#userImg{
width: 24px;
height: 24px;
border-radius:50%;
}
}

@media(max-width:768px){
width: 100%;
height: 300px;
}


`;






const RightSideWriteUp = styled.div`
height: 100px;
width: 95%;
left: 0;
bottom: 0;
text-align:left;
padding:10px;
display: flex;
margin:2px;
margin-top:-100px;
`;


export default Top