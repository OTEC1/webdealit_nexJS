import {useState,useEffect} from 'react'
import axios from 'axios'
import  styled  from 'styled-components'
import Header from './Header'
import Ad from './Ad'
import Head from 'next/head'
import {RiAlbumLine, RiContactsBook2Line, RiDownload2Line, RiDownloadCloudLine, RiHeadphoneLine, RiMenu2Line, RiPlayLine, RiPlayList2Line, RiShareLine, RiSortDesc, RiSpeaker2Line, RiUpload2Line} from 'react-icons/ri'
import Musicplayer from './Musicplayer'
import  {MobileView, BrowserView}  from 'react-device-detect';
import Load from './Load'
import TwoTone from './TwoTone'
import {useLocation} from 'react-router-dom'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { BiDisc, BiTime, BiUser } from 'react-icons/bi'
import {FacebookShareButton,TwitterShareButton,WhatsappShareButton,FacebookIcon,WhatsappIcon,TwitterIcon} from 'react-share'



 const MusicSearch = (props) => {
    const  route = useRouter();
    const base  = route.query;
    const [mus, setmus] = useState([]);
    const [music, setMusic] = useState({Music:{music_artist:"",music_title:"",music_year:"",music_url:"",music_video:"",music_thumbnail:"",music_section:"",doc_id:"",email:""}});
    const [musiclink, setMusicLink] = useState([]);
    const [share, setShare] = useState(false);
    const [errand, setErrand] = useState('');
    const [showPlayermodel, setshowPlayermodel] = useState("close");
    const [pageErrand, setpageErrand] = useState({musicArtist:"",musicTitle:"",musicUrl:"",musicVideoUrl:"",musicThumb:"",doc_id:"",promoIncentive:""})
    let musiclist = [];
    useEffect( async() => {  
         
        if(FontEndDB(1,base.M).length<=0)
                FontEndDB(2,base.M);

        //console.log(musiclist);

        setMusic(musiclist[0]);
        setmus(musiclist);

        
    },[route]);

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
    

    function FontEndDB(index,value){

        JSON.parse(sessionStorage.getItem("musiclist")).map((v,i) => {
            if(index == 1){
               if(v.Music.music_artist == base.M)
                   musiclist.push(v);
            }else{
                if(v.Music.music_title == base.M)
                   musiclist.push(v);
            }
        })
        return musiclist
    }


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
               {music ?
               <>
                <title>Search result: {music.Music.music_title} By {music.Music.music_artist}</title>
                <meta name="description" content={`Downlaod ${music.Music.music_title} by {music.Music.music_artist} @ webfly.click`} />
                <meta property="og:title" content={`Search result: ${music.Music.music_title} By ${music.Music.music_artist}`} />
                <meta property="og:description" content={`Downlaod ${music.Music.music_title} By ${music.Music.music_artist} @ webfly.click`} />
                <meta property="og:url" content={`https://webfly.click`} />
                <meta property="og:type" content="website" />
                <link rel="icon" href="/favicon.ico" />
                </>
                :""}
          </Head>

         <Header/>
          {share ? 
            <ShareDialog>
              {music != undefined ? 
                <div>
                    <div id="house">
                            <div id="writeup">
                              Share via 
                            </div>
                            <div>
                                
                                <FacebookShareButton
                                    url={`https://us-central1-grelots-ad690.cloudfunctions.net/dynamicpostRender?i=${process.env.NEXT_PUBLIC_BASE_URL+music.Music.music_thumbnail}&a=${music.Music.music_artist.toString().toUpperCase()}"&t=${base.M}"&d=${music.doc_id}"&s=m&m="${music.email}`} 
                                    quote={music.Music.music_artist.toUpperCase()+":  "+music.music_title+"  Download @ webfly.click"}
                                    onClick={(e) => setShare(false)}>
                                <FacebookIcon round size={35}/>
                                </FacebookShareButton>
                            </div>
                        </div>

                        <div id="house">
                            <div id="writeup">
                                Share via
                            </div>
                    
                            <WhatsappShareButton
                                url={`https://us-central1-grelots-ad690.cloudfunctions.net/dynamicpostRender?i=${process.env.NEXT_PUBLIC_BASE_URL+music.Music.music_thumbnail}&a=${music.Music.music_artist.toString().toUpperCase()}"&t=${base.M}"&d=${music.doc_id}"&s=m&m="${music.email}`} 
                                quote={music.Music.music_artist.toUpperCase()+":  "+music.Music.music_title+"  Download @ webfly.click"}
                                onClick={(e) => setShare(false)}>
                            <WhatsappIcon round size={35}/>
                            </WhatsappShareButton>
                        </div>


                         <div id="house">
                                <div id="writeup">
                                    Share via
                                </div>
                                <TwitterShareButton
                                     url={`https://us-central1-grelots-ad690.cloudfunctions.net/dynamicpostRender?i=${process.env.NEXT_PUBLIC_BASE_URL+music.Music.music_thumbnail}&a=${music.Music.music_artist.toString().toUpperCase()}"&t=${base.M}"&d=${music.doc_id}"&s=m&m="${music.email}`} 
                                    quote={music.Music.music_artist.toUpperCase()+":  "+music.Music.music_title+"  Download @ webfly.click"}
                                    onClick={(e) => setShare(false)}>
                                <TwitterIcon round size={35}/>
                                </TwitterShareButton>
                        </div>
                        <button onClick={(e) => setShare(false)}>Cancel</button>
                </div>
             :<p></p>}     
             </ShareDialog> :""}
        

                <TwoTone/>
                <Container >
                    <SideNav>
                            <Grooves>
                                Groove
                            </Grooves>


                            <MenuBar>
                                <RiMenu2Line/>
                            </MenuBar>

                            <HR>
                                <hr/>
                            </HR>
                            <table>

                                <tr>
                                    <td>
                                        <TabInfo>
                                        <RiHeadphoneLine/> &nbsp;&nbsp; Your Groove
                                        </TabInfo>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <SubContainer>
                                        <RiSortDesc  onClick={(e)=> SortDiv(e)}/> Sort By
                                        </SubContainer>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                       <SubContainer>
                                        <RiDownloadCloudLine  onClick={(e) => GetDownloadHighCount(e)}/> Trending
                                        </SubContainer>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <SubContainer>
                                        <RiAlbumLine   onClick={(e) => GetAlbumPlaylist(e)}/> Album
                                        </SubContainer>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <SubContainer>
                                        <RiPlayList2Line onClick={(e) => SortByGenre(e)}/> Genre
                                        </SubContainer>
                                    </td>
                                </tr>
                            </table>  

                            <HR>
                                <hr/>
                            </HR>

                            <table>
                                <tr>
                                    <td>
                                        <TabInfo1>
                                            QUICK ACCESS
                                        </TabInfo1>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <SubContainer>
                                        <RiSpeaker2Line/> Promote Music
                                        </SubContainer>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <SubContainer>
                                        <RiUpload2Line/> Upload Music
                                        </SubContainer>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <SubContainer>
                                        <RiContactsBook2Line/> Contact Webfly
                                        </SubContainer>
                                    </td>
                                </tr>
                            
                            </table>  


                    </SideNav>
                    
                    <MusicBanner>
                        <TopMostPart>
                                <h1>
                                  Music Collection
                                </h1>
                            
                        </TopMostPart>
                        <SecondTopMost>
                            <table>
                                <tr>
                                    <td>
                                        <Tabs>Artist &nbsp;&nbsp;</Tabs> 
                                        <Tabs>Album &nbsp;&nbsp;</Tabs>
                                        <Tabs>Playlist &nbsp;&nbsp;</Tabs>  
                                    </td>
                                </tr>
                            </table>
                        </SecondTopMost>


                        <MusicMediasResult>
                            {music ? 
                                        <>
                                        <LEFTWING>
                                           <img src={process.env.NEXT_PUBLIC_BASE_URL+music.Music.music_thumbnail}/>
                                        </LEFTWING>
                                        

                                        <RIGHTWING>
                                            <table>
                                            <tr>
                                                    <td>
                                                    <BiUser/> Title: {music.Music.music_title}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <RiAlbumLine/> Artist: {music.Music.music_artist}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                    <BiTime/> Year: {music.Music.music_year}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div  id='widget'
                                                            onClick={(e) => PopUpPlayer(e,setpageErrand({musicTitle:music.Music.music_title, musicThumb:music.Music.music_thumbnail, musicArtist:music.Music.music_artist, musicVideoUrl:music.Music.music_video, musicUrl:music.Music.music_url, doc_id: music.Music.doc_id,promoIncentive:"https://"}))} src={process.env.REACT_APP_BASE_URL+music.Music.music_thumbnail}>
                                                            <RiDownload2Line/> Download   
                                                        </div>
                                                        
                                                            &nbsp;&nbsp;&nbsp;&nbsp; 
                                                        
                                                          <div  id='widget'
                                                           onClick={(e) => PopUpPlayer(e,setpageErrand({musicTitle:music.Music.music_title, musicThumb: music.Music.music_thumbnail, musicArtist:music.Music.music_artist, musicVideoUrl:music.Music.music_video, musicUrl:music.Music.music_url, doc_id:music.Music.doc_id, promoIncentive:"https://"}))} src={process.env.REACT_APP_BASE_URL+music.Music.music_thumbnail}>
                                                              <RiPlayLine/> Play
                                                            </div>

                                                            &nbsp;&nbsp;&nbsp;&nbsp; 
                                                        
                                                            <div  id='widget' onClick={(e) => popup()}>
                                                              <RiShareLine/> Share
                                                            </div>
                                                    
                                                    
                                                    </td>
                                                </tr>
                                            </table>

                                            
                                            
                                            <MusicMedias>
                                                    {mus.length> 0 ? (
                                                        mus.map((v,i) => 
                                                            <MusicGlide>
                                                                
                                                                <img   onClick={(e) => PopUpPlayer(e,setpageErrand({musicTitle:v.Music.music_title, musicThumb:v.Music.music_thumbnail, musicArtist:v.Music.music_artist, musicVideoUrl:v.Music.music_video, musicUrl:v.Music.music_url, doc_id: v.Music.doc_id,promoIncentive:"https://"}))} src={process.env.NEXT_PUBLIC_BASE_URL+v.Music.music_thumbnail}/>
                                                                
                                                                <BrowserView>
                                                                    <h4>{ v.Music.music_title.length > 13 ? v.Music.music_title.substring(0,13)+"..." : v.Music.music_title}</h4>
                                                                </BrowserView>

                                                                <MobileView>
                                                                    <h4>{ v.Music.music_title.length > 10 ? v.Music.music_title.substring(0,8)+"..." : v.Music.music_title}</h4>
                                                                </MobileView>
                                                                
                                                                <h5>{v.Music.music_artist}</h5>
                                    
                                                            </MusicGlide>
                                                            )
                                                        ):(
                                                            <div  id="loader">
                                                                <Load/>
                                                            </div>
                                                        )}
                                             </MusicMedias>

                                            </RIGHTWING>
                                            </>
                                        :(
                                        <div  id="loader">
                                                <Load/>
                                            </div>
                                        )}  
                          </MusicMediasResult>

                          

                    </MusicBanner>
                    <Musicplayer  showPlayermodel={showPlayermodel}   PopUpPlayer={PopUpPlayer}  musicData={pageErrand}/>
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
margin-top:10px;
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
height: 95%;
object-fit:cover;
margin-top:10px;
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
display:flex;
flex-direction:column;
flex-wrap:wrap;
@media(max-width:968px){
width: 100%;
}

`;


const MusicMedias = styled.div`
height: 26vh;
width: 100%;
display: inline-block; 
overflow-x:scroll;
padding-top:50px;
text-align:left;


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




 export default MusicSearch;

