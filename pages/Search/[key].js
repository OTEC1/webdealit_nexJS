import {useState,useEffect} from 'react'
import axios from 'axios'
import  styled  from 'styled-components'
import Header from '../Header'
import Ad from '../Ad'
import Head from 'next/document'
import {RiAlbumLine, RiContactsBook2Line, RiDownload2Line, RiDownloadCloudLine, RiHeadphoneLine, RiMenu2Line, RiPlayLine, RiPlayList2Line, RiShareLine, RiSortDesc, RiSpeaker2Line, RiUpload2Line} from 'react-icons/ri'
import Musicplayer from '../Musicplayer'
import  {MobileView, BrowserView}  from 'react-device-detect';
import Load from '../Load'
import TwoTone from '../TwoTone'
import {useLocation} from 'react-router-dom'
import Swal from 'sweetalert2'
import { BiDisc, BiTime, BiUser } from 'react-icons/bi'
import {FacebookShareButton,TwitterShareButton,WhatsappShareButton,FacebookIcon,WhatsappIcon,TwitterIcon} from 'react-share'



export const getStaticPaths = async () => {
    var options = {
        method: 'GET',
        url: process.env.GET_SONG,
      };
    const  res = await axios.request(options)
    const data = await res.data; 
    console.log(data.message.length,"HERE");
   
    const paths = data.message.map((v,i) => {
        return { params: {key : v.Music.music_title.toString()} }
    });

    return {
        paths,
        fallback: false
    }
}


export const getStaticProps = async (context) => {
    const title = context.params.key;
    var options = {
        method: 'POST',
        url: process.env.GET_SONG,
        data: {Music:{music_artist: title}}
      };
     
    const  res = await axios.request(options);
    const data = await res.data; 
    console.log(data.message.length,"ALSO");

    return {
        props: {song: data.message}
    }
}



 const MusicResult = ({song}) => {

    const [music, setMusic] = useState([]);
    const [musiclink, setMusicLink] = useState([]);
    const [share, setShare] = useState(false);
    const [errand, setErrand] = useState('');
    const [showPlayermodel, setshowPlayermodel] = useState("close");
    const [pageErrand, setpageErrand] = useState({musicArtist:"",musicTitle:"",musicUrl:"",musicVideoUrl:"",musicThumb:"",doc_id:"",promoIncentive:""})
   
    const PopUpPlayer  = (e,v) => {
        e.preventDefault();
        switch(showPlayermodel){
            case "open":
                setshowPlayermodel("close");
                break;
            case "close":
                 setshowPlayermodel("open")
                 break;
            default:
                setshowPlayermodel("close");
                break;
        }
    }    
    
    useEffect(() => {
        setMusic(song);
        console.log(song);
    },[song]);


    const SortDiv = () => {

    } 

    const GetAlbumPlaylist = (e) => {

    }


    const SortByGenre = () => {

    }

    const GetDownloadHighCount = (e) => {

    }


    const popup = () => {
     setShare(true)
     
    }

   
    return (
        <>
         <Head>
               {music  ?
                  music.map((v) =>
                  <>
                    <title>Search result: {music.Music.music_title} By {music.Music.music_artist}</title>
                    <meta name="description" content={`Downlaod ${music.Music.music_title} by {music.Music.music_artist} @ webfly.click`} />
                    <meta property="og:title" content={`Search result: ${music.Music.music_title} By ${music.Music.music_artist}`} />
                    <meta property="og:description" content={`Downlaod ${music.Music.music_title} By ${music.Music.music_artist} @ webfly.click`} />
                    <meta property="og:url" content={`https://webfly.click`} />
                    <meta property="og:type" content="website" />
                    <link rel="icon" href="/favicon.ico" />
                    </>
                    )
                :""}
          </Head>
         <Header/>
        <Container>
        </Container>
        </>
    )
 }



 const Container = styled.div`
 position: relative;
 display:flex;
 width: 100%;

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
#loader{    
margin-top:45%;
height:100px;
width:100px;
}
}
 `;


const SideNav = styled.div`
width:20%;
height: 100vh;
background:#f2f5fc;
margin-top:137px;
padding-left:18px;

@media(max-width:968px){
display: none;
}
`;


const SubContainer = styled.div`
margin-top:15px;
color: #b8b9be; 
font-size:10pt;
`;


const TabInfo = styled.div`
display:flex;
justify-content:center;
align-items:center;
text-align:center;
font-weight:700;
color:#b8b9be;
margin-top:10px;
`;


const TabInfo1 = styled(TabInfo)`
margin-left:-20px;

`;


const Grooves = styled.div`
width: 70%;
padding-top:20px;
font-weight:800;
font-family: "Poppins", sans-serif;
`;


const MenuBar = styled(Grooves)`
font-weight:none;
font-size:20pt;
color: #b8b9be;


`;


const HR = styled(Grooves)`
font-weight:none;
color: #b8b9be;
`;




const MusicBanner = styled.div`
width:80%;
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
margin-top:10px;
color:#f5f5f5;
 

`;


const Tabs = styled.span`
font-weight:600;
cursor:pointer;
font-family: "Poppins", sans-serif;
margin-left:18px; 
`;


const MusicMediasResult = styled.div`
width: 100%;
height: 60vh;
display: flex;
justify-content:center;
align-items:center;
text-align:center;
margin-bottom:10px;

tr td{
padding-left: 50px;
margin-top:20px;
display: flex;
justify-content:left;
align-items:left;
text-align:left;
font-weight:700;
color: #f5f5f5;
} 

#widget{
border:1px solid #fff;
border-radius:5px;
padding:5px;
cursor: pointer;
}


@media(max-width:968px){
flex-wrap:wrap;
height: 500px;


tr td{
padding-left: 5px;
}
}


`;



const LEFTWING = styled.div`
height: 100%;
width: 47.5%;
img{
width: 100%;
height: 100%;
object-fit:cover;
}

@media(max-width:968px){
width: 100%;
height: 60%;
img{
height: 300px;
}
}

`;


const RIGHTWING = styled.div`
height: 100%;
width: 47.5%;
@media(max-width:968px){
width: 100%;
}

`;


const MusicMedias = styled.div`
height: 25vh;
width: 100%;
display: inline-block; 
overflow-x:scroll;


::-webkit-scrollbar {
 display:none;
}


@media(max-width:968px){
height: 50%;
text-align:center;
}
`;


const MusicGlide = styled.div`
width: 150px;
height: 120px;
margin:5px;
text-align:center;
display: inline-block;
font-family: "Poppins", sans-serif;




img{
width: 100px;
height: 100px;
object-fit:cover;
}

h4{
color: #000000;
font-size:12pt;
}

h5{
color:#b8b9be;
margin: 0px;
}

@media(max-width:968px){  
width: 100px;
height: 100px;
margin:5px;
margin-top:20px;

img{
width: 100px;
height: 100px;
}  

h5{
font-size:8pt;
}
}

`;



const ShareDialog= styled.div`
position: absolute;
width: 25%;
height: auto;
z-index:500;
background: #fff;
border-radius:10px;
margin-top:20%;
margin-left:35%;
padding: 20px;



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



@media(max-width:968px){
position: absolute;
overflow: hidden;
width: 100%;
height: auto;
bottom: 0;
margin-left:0px;
padding: 0px;

#house{
width: 95%;
}
button{
margin: 5px;
}
}
`;




 export default MusicResult;


