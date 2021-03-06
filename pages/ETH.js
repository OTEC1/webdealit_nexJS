import React,{useState,useEffect} from 'react'
import axios from 'axios'
import  styled  from 'styled-components'
import Header from './Header'
import Ad from './Ad'
import {RiAlbumLine, RiContactsBook2Line, RiDownloadCloudLine, RiHeadphoneLine, RiMenu2Line, RiPlayList2Line, RiSortDesc, RiSpeaker2Line, RiUpload2Line} from 'react-icons/ri'
import Musicplayer from './Musicplayer'
import {MobileView, BrowserView}  from 'react-device-detect';
import Load from './Load'
import { useRouter} from 'next/router'
import {updatePostlikes} from '../actions'
import Footer from './Footer'



 const ETH = (props) => {

    
    const history = useRouter();
    const ep = history.query;

    
 
    const [music, setMusic] = useState([]);
    const [errand, setErrand] = useState('');
    const [showPlayermodel, setshowPlayermodel] = useState("close");
    const [pageErrand,setpageErrand] = useState({title:"",cloud:"",date_time:"",doc_id_a:"",musicThumb:"",doc_id:"",doc_id_b:"",cloudinaryPub:"",exifData:"",writeup:"", likes:"", frame:"",useremail:"", media:"",views:""})
   


    const PopUpPlayer  = (e,x) => {
        e.preventDefault();

        let frame = x.frame;
        let useremail=x.useremail;
        let views = x.views
        let caller = "o";
        updatePostlikes(1,0,1,useremail,x.doc_id_a,x.doc_id_b);
        history.push(`/Read/${x.title.replace(/ /g,'+')}`)
    
    }



    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_GET_BY_ORIENTATION, {UserPost:{orientations:ep.e}})
        .then(res => {
            setMusic(res.data.message);
            mapping(res.data.message);
        }).catch(err=> {
            console.log(err);
        })

    },[ep.e])

  
    function mapping(blob){
        sessionStorage.setItem("crypto",  JSON.stringify(blob));
    }

    function  formation(datas){
     return  datas = datas.charAt(0).toUpperCase() + datas.slice(1); 
    }


    return (
        <>
                <Header/>
                <Container>
                    <MusicBanner>
                        <TopMostPart>
                                <h1>
                                  {ep.e}
                                </h1>
                            
                        </TopMostPart>

                        <SecondTopMost>
                            ADVERTISMENT
                        </SecondTopMost>
  
                         <MusicMedias>
                            {music.length> 0 ? (
                                 music.map((v,i) => 
                                    <MusicGlide  key={i} onClick={(e) => PopUpPlayer(e,{title:v.UserPost.title, cloud:v.UserPost.cloudinaryPub,  date_time:v.UserPost.date_time,  doc_id_a:v.UserPost.doc_id_a, 
                                        doc_id_b:v.UserPost.doc_id_b,  cloudinaryPub:v.UserPost.cloudinaryPub,  exifData:v.UserPost.exifData, 
                                        writeup:v.UserPost.writeup, likes:v.UserPost.likes, frame:"Pictureframe",useremail:v.User.useremail, media:v.UserPost.image,
                                        views:v.UserPost.views})}>
                                        
                                        <img src={process.env.NEXT_PUBLIC_APP_S3_IMAGE_BUCKET+v.UserPost.image}/>
                                         
                                          <BrowserView>
                                              <h4>{v.UserPost.writeup.length > 13 ? formation(v.UserPost.writeup.substring(0, i==0 ? 120 : 70))+"...Read more" : formation(v.UserPost.writeup) }</h4>
                                          </BrowserView>

                                          <MobileView>
                                              <h4>{v.UserPost.writeup.length > 10 ? formation(v.UserPost.writeup.substring(0,i==0 ? 90 : 50))+"...Read more" : formation(v.UserPost.writeup)}</h4>
                                          </MobileView>
                                      </MusicGlide>
                                    )
                                   ):(
                                    <div  id="loader">
                                        <Load/>
                                    </div>
                              )}
                        </MusicMedias>

                    </MusicBanner>
                    
                </Container>    
                <Footer/>  
        </>
    )
 }



 const Container = styled.div`
 position: relative;
 display:flex;
 width: 100%;
 height: 120vh;

#loader{
width: 100px;
height: 100px;
height: 200px;
margin-top:10%;
text-align:center;
margin-left:auto;
margin-right:auto;
}


@media(max-width:968px){
overflow-x:hidden;
#loader{    
margin-top:45%;
height:100px;
width:100px;
}
}
`;




const MusicBanner = styled.div`
width:80%;
height: 80vh;
margin-top:137px;



@media(max-width:968px){
width: 100%;
margin-top:150px;
}
`;


const TopMostPart = styled.div`
width: 100%;
color:#f5f5f5;


h1{
margin-left:20px;
font-size:30pt;
font-weight:1000;
font-family: "Poppins", sans-serif;
}


@media(max-width:968px){
h1{
font-size:15pt;  
} 
}
`;


const SecondTopMost = styled.div`
width: 100%;
height: 100px;
margin-top:10px;
color:#f5f5f5;
font-weight:200;
margin-left:20px;
 

`;


const Tabs = styled.span`
font-weight:600;
cursor:pointer;
font-family: "Poppins", sans-serif;
margin-left:18px; 
`;



const MusicMedias = styled.div`
height: 110%;
width: 100%;
display: inline-block;
overflow-y:scroll;



::-webkit-scrollbar {
 display:none;
}

& > *:first-of-type{
width: 56.5%;
height: 300px;
margin:5px;
img{
clip-path: none;
border-radius:7px;
}
div{
height:280px;
margin-top:22px;
}
}




@media(max-width:968px){
height: 60%;
text-align:center;
overflow:none;
& > *:first-of-type{
width: 90%;
div{
height:80px;
margin-top:22px;
}
}
}
`;


const MusicGlide = styled.div`
width: 300px;
height: 300px;
margin-top:5px;
text-align:center;
display: inline-block;
font-family: "Poppins", sans-serif;
background: #f5f5f5;
border-radius:10px;

img{
width: 100%;
height: 200px;
object-fit:cover;
clip-path: ellipse(78% 100% at 32.64% 0%);
border-radius: 5px 5px 0px 0px;
}

h4{
color:  #000000;
font-size:12pt;
padding: 10px;
text-align:left;
}


@media(max-width:968px){  
width: 90%;
height: 250px;
margin:7px;
overflow-x:hidden;
overflow-y:none;

img{
height: 60%;
}  

h5{
font-size:8pt;
}
}

`;




  export default ETH;


