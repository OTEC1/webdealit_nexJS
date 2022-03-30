import styled  from "styled-components";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import ReactPlayer from "react-player";
import  {RiEyeFill, RiEyeLine, RiThumbUpFill, RiThumbUpLine, RiLiveFill, RiArrowLeftCircleLine, RiArrowRightCircleLine, RiTv2Line, RiCodeView, RiSendPlaneLine, RiSendPlane2Line, RiSendPlaneFill } from 'react-icons/ri';
import { useEffect, useRef, useState } from "react";
import { updatePostlikes, format } from "../actions";
import {CloudinaryContext, Image, Transformation} from 'cloudinary-react'
import  {MobileView, BrowserView}  from 'react-device-detect';
import Bottom from "./Bottom";
import Link from 'next/link'
import { useRouter } from "next/router";




const Top = (props) => {
    var a  = 170; 
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
        sessionStorage.setItem("cloud",x.cloudinaryPub);
        sessionStorage.setItem("doc_id_a",x.doc_id_a);
        sessionStorage.setItem("doc_id_b",x.doc_id_b);
        sessionStorage.setItem("cloudinaryPub",x.cloudinaryPub);
        sessionStorage.setItem("exifData",x.exifData);
        sessionStorage.setItem("media",x.media);
        sessionStorage.setItem("writeup",x.writeup);
        sessionStorage.setItem("date_time",x.date_time);
        sessionStorage.setItem("likes",x.likes);
        sessionStorage.setItem("title",x.title);
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
                    <RiLiveFill   size={20}  color="red"/> <h4>Explore feeds</h4>
                   </SectionTab>
                    <Slider autoplay={1} 
                          duration={3500} 
                          previousButton={<RiArrowLeftCircleLine
                          color="red"/>} 
                          nextButton={<RiArrowRightCircleLine color="red"/>}>
                          {L1.length <= 0 ?<p></p>
                            : 
                           L1.map((value, index) => value.UserPost.image ?
                            <div>
                                  <PosterDetails>
                                    <img id="userImg" src={value.User.user_img !== "icons" ?  
                                        value.User.user_img : "images/customSignInbackground.png"} onClick={UserPage}/>
                                        &nbsp;&nbsp;
                                    {value.User.useremail}
                                  </PosterDetails>


                                    <BrowserView>
                                        <CloudinaryContext cloudName="otecdealings">
                                                <Image   alt={value.UserPost.title}   publicId={value.UserPost.cloudinaryPub}/>
                                        </CloudinaryContext>
                                    </BrowserView>

                                    <MobileView>
                                         <CloudinaryContext cloudName="otecdealings">
                                                <Image alt={value.UserPost.title}  height="300"  width="100%" publicId={value.UserPost.cloudinaryPub}>
                                                   <Transformation  angle={value.UserPost.exifData} />
                                                 </Image>
                                        </CloudinaryContext>
                                    </MobileView>   

                                    <Link href={`/Read/${value.UserPost.title.replace(/ /g,'+')}`}>
                                        <WriteUp 
                                              onClick={(e) => navigates({frame:"Pictureframe",useremail:value.User.useremail, doc_id_a:value.UserPost.doc_id_a,doc_id_b:value.UserPost.doc_id_b, title:value.UserPost.title, cloudinaryPub: value.UserPost.cloudinaryPub, exifData: value.UserPost.exifData, media: value.UserPost.image, writeup:value.UserPost.writeup, date_time:value.UserPost.date_time, likes:value.UserPost.likes, views:value.UserPost.views})}>
                                            {
                                            value.UserPost.writeup.length > a ?
                                            <div>{value.UserPost.writeup.toString().substring(0, a)} ...Read more</div>
                                            :
                                            <div>{value.UserPost.writeup} <RiSendPlaneFill/></div>
                                            }
                                        </WriteUp>
                                    </Link>

                                    <Reactions>
                                      <div>
                                        <RiThumbUpFill size={20}/>&nbsp;{format(value.UserPost.likes)}
                                      </div>
                                      <div>
                                        <RiEyeFill   size={20}/>&nbsp;{format(value.UserPost.views)}
                                      </div>     
                                    </Reactions>
                               </div>
                              :
                            value.UserPost.video ?
                            <div>

                              <PosterDetails>
                                 <img id="userImg" src={value.User.user_img !== "icons" ?  
                                    value.User.user_img : "images/customSignInbackground.png"} onClick={UserPage}/>
                                &nbsp;&nbsp;
                                {value.User.useremail}
                              </PosterDetails>

                                <BrowserView>
                                      <CloudinaryContext cloudName="otecdealings">
                                              <Image  alt={value.UserPost.title}   height="500"  width="500" publicId={value.UserPost.cloudinaryPub}/>
                                      </CloudinaryContext>
                                </BrowserView>


                                <MobileView>
                                     <CloudinaryContext cloudName="otecdealings">
                                              <Image  alt={value.UserPost.title}   height="300"  width="100%" publicId={value.UserPost.cloudinaryPub}>
                                                  <Transformation  angle={value.UserPost.exifData} />
                                              </Image>
                                      </CloudinaryContext>
                                </MobileView>
                                     
                            
                                <Link href={`/Read/${value.UserPost.title.replace(/ /g,'+')}`}>
                                    <WriteUp onClick={(e)=> 
                                     navigates({frame:"Videoframe",useremail:value.User.useremail, doc_id_a:value.UserPost.doc_id_a,doc_id_b:value.UserPost.doc_id_b, title: value.UserPost.title, cloudinaryPub: value.UserPost.cloudinaryPub, exifData: value.UserPost.exifData, media: value.UserPost.video, writeup: value.UserPost.writeup, date_time:value.UserPost.date_time, likes:value.UserPost.likes,views:value.UserPost.views})}>
                                        {
                                        value.UserPost.writeup.length > a ?
                                        <div>{value.UserPost.writeup.toString().substring(0, a)} ...<span>Read more</span></div>
                                        :
                                        <div>{value.UserPost.writeup} <RiSendPlaneFill/></div>
                                        }
                                    </WriteUp>
                                 </Link>

                                    <Reactions>
                                      <div>
                                      <RiThumbUpFill size={20}/>&nbsp;{format(value.UserPost.likes)}
                                      </div>
                                     
                                     <div>
                                       <RiEyeFill   size={20}/>&nbsp;{format(value.UserPost.views)}
                                     </div>     
                                    </Reactions>

                            </div>
                              :
                            value.UserPost.youtubeLink ?
                            <div>

                              <PosterDetails>
                                 <img id="userImg" src={value.User.user_img !== "icons" ?  
                                    value.User.user_img : "images/customSignInbackground.png"} onClick={UserPage}/>
                                &nbsp;&nbsp;
                                {value.User.useremail}
                              </PosterDetails>

                                  <BrowserView>
                                    <ReactPlayer  alt={value.UserPost.title}   width="100%"  height="500px" url={value.UserPost.youtubeLink}  controls  />
                                  </BrowserView>

                                  <MobileView>
                                    <ReactPlayer  alt={value.UserPost.title}   width="100%"  height="320px" url={value.UserPost.youtubeLink}  controls  />
                                  </MobileView>
                                  
                                  
                                  <Link href={`/Read/${value.UserPost.title.replace(/ /g,'+')}`}>
                                    <WriteUp onClick={(e)=> 
                                       navigates({frame:"Playerframe",useremail:value.User.useremail, doc_id_a:value.UserPost.doc_id_a,doc_id_b:value.UserPost.doc_id_b, title: value.UserPost.title, cloudinaryPub: value.UserPost.cloudinaryPub, exifData: value.UserPost.exifData, media: value.UserPost.youtubeLink, writeup: value.UserPost.writeup, date_time:value.UserPost.date_time, likes:value.UserPost.likes, views:value.UserPost.views})}>
                                        {
                                        value.UserPost.writeup.length > a ?
                                        <div>{value.UserPost.writeup.toString().substring(0, a)} ...<span>Read more</span></div>
                                        :
                                        <div>{value.UserPost.writeup} <span>See more</span></div>
                                        }
                                    </WriteUp>
                                    </Link>

                                    <Reactions>
                                      <div>
                                      <RiThumbUpFill size={20}/>&nbsp;{format(value.UserPost.likes)}
                                      </div>
                                     
                                     <div>
                                       <RiEyeFill   size={20}/>&nbsp;{format(value.UserPost.views)}
                                     </div>     
                                    </Reactions>

                            </div>
                              :
                            <p></p>
                          )
                          }
                  </Slider>
                </TopLeftinnerDiv>

                <AdRunner>

                </AdRunner>

                 <TopOuterDiv onScroll={onScrollRecoder} ref={myref}>      
                    <SectionTab>
                      <RiTv2Line   size={20}  color="red"/> <h4>Sidebar feeds</h4>
                    </SectionTab>
                    <TopRightinnerDiv>
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
                                              <div>
                                                <Image  alt={value.UserPost.title}  width="100%"  height={index === 0 ? "300" : "200"} publicId={value.UserPost.cloudinaryPub}/>
                                              </div>
                                        </CloudinaryContext>
                                      </BrowserView>

                                      <MobileView>
                                        <CloudinaryContext cloudName="otecdealings">
                                                <Image alt={value.UserPost.title}   width="100%"  height="300" publicId={value.UserPost.cloudinaryPub}>
                                                  <Transformation    angle={value.UserPost.exifData} />
                                                </Image>
                                        </CloudinaryContext>
                                      </MobileView>

                                      <Link href={`/Read/${value.UserPost.title.replace(/ /g,'+')}`}>
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
                                 :
                             value.UserPost.video ?
                         
                                <Locals>
                                  <div  id="UserProfile1">
                                       <img id="userImg" src={value.User.user_img !== "icons" ?  
                                            value.User.user_img : "images/customSignInbackground.png"} onClick={UserPage}/>
                                            &nbsp;&nbsp;
                                          {value.User.useremail}
                                  </div>

                                  <BrowserView>
                                  <CloudinaryContext cloudName="otecdealings">
                                          <div>
                                            <Image alt={value.UserPost.title}   width="100%"  height="200" publicId={value.UserPost.cloudinaryPub}/>
                                          </div>
                                    </CloudinaryContext>

                                  </BrowserView>
                                   


                                    <MobileView>
                                        <CloudinaryContext cloudName="otecdealings">
                                                <Image alt={value.UserPost.title}   width="100%"  height="300" publicId={value.UserPost.cloudinaryPub}>
                                                   <Transformation  angle={value.UserPost.exifData} />
                                                </Image>
                                        </CloudinaryContext>
                                     </MobileView>

                                     <Link href={`/Read/${value.UserPost.title.replace(/ /g,'+')}`}>
                                      <RightSideWriteUp  
                                          onClick={(e)=>   navigates({frame:"Videoframe",useremail:value.User.useremail, doc_id_a:value.UserPost.doc_id_a,doc_id_b:value.UserPost.doc_id_b, title: value.UserPost.title, cloudinaryPub: value.UserPost.cloudinaryPub, exifData: value.UserPost.exifData, media: value.UserPost.video, writeup: value.UserPost.writeup, date_time:value.UserPost.date_time, likes:value.UserPost.likes, views:value.UserPost.views})}>
                                        {
                                        value.UserPost.writeup.length > a ?
                                        <div>{value.UserPost.writeup.toString().substring(0, a)} ...<span>Read more</span></div>
                                        :
                                        <div>{value.UserPost.writeup} <RiSendPlaneFill/></div>
                                         }
                                      </RightSideWriteUp>
                                     </Link>
                                  </Locals>
                          :
                        value.UserPost.youtubeLink  ?
                        <Locals>
                          <div  id="UserProfile1">
                               <img id="userImg" src={value.User.user_img !== "icons" ?  
                                value.User.user_img : "images/customSignInbackground.png"} onClick={UserPage}/>
                                &nbsp;&nbsp;
                                {value.User.useremail}
                          </div>


                          <ReactPlayer  alt={value.UserPost.title}   width="100%"  height="100%" url={value.UserPost.youtubeLink}  controls  />

                          <Link href={`/Read/${value.UserPost.title.replace(/ /g,'+')}`}>
                              <RightSideWriteUpYoutube   
                                onClick={(e)=>   navigates({frame:"Playerframe",useremail:value.User.useremail, doc_id_a:value.UserPost.doc_id_a,doc_id_b:value.UserPost.doc_id_b, title: value.UserPost.title, cloudinaryPub: value.UserPost.cloudinaryPub, exifData: value.UserPost.exifData, media: value.UserPost.youtubeLink, writeup: value.UserPost.writeup, date_time:value.UserPost.date_time, likes:value.UserPost.likes, views:value.UserPost.views})}>
                                {
                                  value.UserPost.writeup.length > a ?
                                  <div>{value.UserPost.writeup.toString().substring(0, a)} ...<span>Read more</span></div>
                                  :
                                  <div>{value.UserPost.writeup} <RiSendPlaneFill/></div>
                                }
                              </RightSideWriteUpYoutube>
                            </Link>
                        </Locals>
                        :
                      <p></p>
                      )}

                    </TopRightinnerDiv>
                </TopOuterDiv> 
              </TopSection>
             
        </Container>
         </>
    )
}



const Container = styled.div`
width: 98%;
text-align:center;
display: flex;
flex-wrap: wrap;
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
padding: 10px;
@media(max-width:768px){
height: 75vh;
width: 100%;
padding: 0px;
}


`;



const TopSection = styled.div`
display: flex;
flex-wrap:wrap;
height: 70vh;
width: 100%;
text-shadow: 2px 2px #4180FF;
margin-top:0px;
@media(max-width:768px){
height: 50vh;
}

`;


const TopLeftinnerDiv = styled.div`
width: 50%;
height:100%;

div{
display:flex;
img{
top:0;
left:0;
margin-top:0;
margin-left:0;
border-radius:15px;
width:100%;
height:100%;
object-fit:cover;
}
}


@media(max-width:768px){
width: 100%;
height: 90%; //Edit here for ad on homePage
}
`;

const SectionTab = styled.div`
text-align:left;
width: 45%;
height: 25px;
display: flex;

h4{
color:#f5f5f5;
}
`;




const AdRunner = styled.div`
display: none;

@media(max-width:768px){
display: block;
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
height: 220px;
width: 100%;
margin-left:auto;
margin-right:auto;
margin-top:0px;
}

`;






const PosterDetails = styled.div`
position: absolute;
width: 20%;
height: 15px;
top: 0;
left:0;
color:#fff;
display: flex;
margin: 10px;


#userImg{
border-radius:50%;
height: 24px;
width:24px;
z-index:500;
cursor: pointer;
}

`;



const WriteUp = styled.div`
position: absolute;
font-family: "Poppins", sans-serif;
width: 90%;
height: 120px;
bottom: 0;
left:0;
text-align:left;
padding: 5px;
color:#fff;
font-weight:900;
display: flex;
justify-content:space-between;
z-index:200;
margin-bottom:50px;

@media(max-width:768px){
margin-bottom:82px;
font-size:10pt;
height: 100px;
}
`;


const Reactions = styled.div`
position: absolute;
background: #fff;
border-radius: 10px 0px 0px 10px;
padding:5px;
width: 20%;
bottom: 0;
right:0;
display: flex;
justify-content:space-between;
color: #828282;
margin-bottom:10px;
margin-right:5px;

div{
display: flex;
justify-content:center;
text-align:center;
align-items:center;
}
text-shadow: none;

@media(max-width:768px){
width: 30%; 
margin-bottom:105px;
}
`;



const TopOuterDiv = styled.div`
height: 90%;
width: 50%;
justify-content:center;
overflow-y:scroll;
overflow-x:hidden;


::-webkit-scrollbar {
display: none;
}

@media(max-width:768px){
width: 100%;
height: 130%;
overflow-x:hidden;
}

`;


const TopRightinnerDiv = styled.div`
display: flex;
flex-wrap:wrap;
justify-content:center;
height: 500px;


& > *:first-of-type{
width: 100%;
height: 300px;
margin: 5px;
}

`;



const Locals = styled.div`
width: 48%;
margin: 2px;
font-size:10pt;
color:#fff;
position: relative;


img{
border-radius:10px;
width: 100%;
object-fit:cover;
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





const RightSideWriteUpYoutube = styled.div`
position: relative;
height: 30%;
width: 100%;
left: 0;
bottom: 0;
margin-top:-100px;
color:#fff;
text-align:left;
padding:5px;
font-weight:800;
display: flex;
line-height:1.99;


div{
width: 80%;
}

@media(max-width:768px){
position:none;
height: 80px;
}
`;








export default Top