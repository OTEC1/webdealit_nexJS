import React,{useEffect, useState} from 'react';
import styled  from "styled-components";
import { updatePostlikes, format } from "../actions";
import ReactPlayer from 'react-player';
import {CloudinaryContext, Image, Transformation} from 'cloudinary-react'
import  {MobileView, BrowserView}  from 'react-device-detect';
import Footer from './Footer';
import { useRouter } from 'next/router';
import Link from 'next/link'


const Bottom = (props) => {

    const history = useRouter();
    const [list, setlist] = useState([])


    useEffect(() => {
        if(props.data.length > 0){     
           setlist(props.data);
        }
    },[props.data])





    const navigates = (x) =>{
        let frame = x.frame;
        let useremail=x.useremail;
        let views = x.views
        let caller = "o";
        
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
  
  
  

    return(<div>
            <Container>
                {list.map((v,i) =>
                v.UserPost.image ?
                 <CardShow>
                    <BrowserView>
                            <CloudinaryContext cloudName="otecdealings">
                                    <Image  alt={v.UserPost.title}   width="100%" publicId={v.UserPost.cloudinaryPub}/>
                            </CloudinaryContext>
                    </BrowserView>
                    <MobileView>
                                <CloudinaryContext cloudName="otecdealings">
                                        <Image  alt={v.UserPost.title}     width="100%" publicId={v.UserPost.cloudinaryPub}>
                                            <Transformation  angle={v.UserPost.exifData} />
                                        </Image>
                                </CloudinaryContext>
                     </MobileView>
                        
                     <Link href={`/Read/`+v.UserPost.title.replace(/ /g,'+')}>   
                        <div id='writeUp' onClick={(e)=>  navigates({frame:"Pictureframe",useremail:v.User.useremail, doc_id_a:v.UserPost.doc_id_a, doc_id_b:v.UserPost.doc_id_b, title:v.UserPost.title, cloudinaryPub: v.UserPost.cloudinaryPub, exifData: v.UserPost.exifData, media: v.UserPost.image, writeup: v.UserPost.writeup, date_time: v.UserPost.date_time, likes:v.UserPost.likes, views:v.UserPost.views})}>
                            {v.UserPost.writeup.length > 100 ? v.UserPost.writeup.substring(0,100)+" ... Read more" : v.UserPost.writeup }
                        </div>
                     </Link>
                
                </CardShow>
                : v.UserPost.video ?

                <CardShow>
                        <BrowserView>
                                <CloudinaryContext cloudName="otecdealings">
                                        <Image  alt={v.UserPost.title}     width="100%" publicId={v.UserPost.cloudinaryPub}/>
                                </CloudinaryContext>
                        </BrowserView>
                        <MobileView>
                                <CloudinaryContext cloudName="otecdealings">
                                        <Image  alt={v.UserPost.title}   height="300px"   width="100%" publicId={v.UserPost.cloudinaryPub}>
                                            <Transformation  angle={v.UserPost.exifData} />
                                        </Image>
                                </CloudinaryContext>
                        </MobileView>
                        
                        <Link href={`/Read/`+v.UserPost.title.replace(/ /g,'+')}>
                            <div id='writeUp' onClick={(e)=>  navigates({frame:"Videoframe",useremail:v.User.useremail, doc_id_a:v.UserPost.doc_id_a, doc_id_b:v.UserPost.doc_id_b, title:v.UserPost.title, cloudinaryPub: v.UserPost.cloudinaryPub, exifData: v.UserPost.exifData, media: v.UserPost.video, writeup: v.UserPost.writeup, date_time: v.UserPost.date_time, likes:v.UserPost.likes,views:v.UserPost.views})}>
                                {v.UserPost.writeup.length > 100 ? v.UserPost.writeup.substring(0,100)+" ... Read more" : v.UserPost.writeup }
                            </div>
                        </Link>

                </CardShow>

                : v.UserPost.youtubeLink ?

                <CardShow>
                <ReactPlayer alt={v.UserPost.title}  url={v.UserPost.youtubeLink}  controls width="100%" height="50%"/>
              
                <Link href={`/Read/`+v.UserPost.title.replace(/ /g,'+')}>
                    <div  id='writeUp' onClick={(e)=>  navigates({frame:"Playerframe",useremail:v.User.useremail, doc_id_a:v.UserPost.doc_id_a, doc_id_b:v.UserPost.doc_id_b, title:v.UserPost.title, cloudinaryPub: v.UserPost.cloudinaryPub, exifData: v.UserPost.exifData, media: v.UserPost.youtubeLink, writeup: v.UserPost.writeup, date_time: v.UserPost.date_time, likes:v.UserPost.likes, views:v.UserPost.views})}>
                        {v.UserPost.writeup.length > 100 ? v.UserPost.writeup.substring(0,100)+" ... Read more" : v.UserPost.writeup }
                    </div>
                 </Link>

                </CardShow>
                :<p></p>
                )}
            </Container>

            <Footer/>
        </div>
    )
}


const Container = styled.div`
position: relative;
height: 70vh;
width: 100%;
margin-top:100px;
background: #f5f5f5;
display: flex;
justify-content:center;
align-items:center;
flex-wrap:wrap;
overflow-y:scroll;

::-webkit-scrollbar {
display: none;
}

@media(max-width:968px){
margin-top:200px;
}
`;


const CardShow = styled.div`
height: 340px;
width: 350px;
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
margin:20px;
border-radius:10px;

img{
border-radius:10px;
width: 100%;
height: 250px;
clip-path: ellipse(78% 100% at 32.64% 0%);
object-fit:cover;
}


#writeUp{
margin: 10px;
padding: 5px;
}


@media(max-width:968px){
margin: 2px;
width: 90%;
height: 350px;

}
`;


export default Bottom