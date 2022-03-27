import React,{useState,useEffect} from 'react'
import axios from 'axios'
import  styled  from 'styled-components'
import Header from './Header'
import Ad from './Ad'
import {RiAlbumLine, RiContactsBook2Line, RiDownloadCloudLine, RiHeadphoneLine, RiMenu2Line, RiPlayList2Line, RiSortDesc, RiSpeaker2Line, RiUpload2Line} from 'react-icons/ri'
import Musicplayer from './Musicplayer'
import  {MobileView, BrowserView}  from 'react-device-detect';
import Load from './Load'
import TwoTone from './TwoTone'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'



 const SearchbyArtistsName = (props) => {

    const {query} = useParams();
    document.title =  "Search result: "+query;
    const [music, setMusic] = useState([]);
    const [errand, setErrand] = useState('');
    const [showPlayermodel, setshowPlayermodel] = useState("close");
    const [pageErrand,setpageErrand] = useState({musicArtist:"",musicTitle:"",musicUrl:"",musicVideoUrl:"",musicThumb:"",doc_id:"",promoIncentive:""})
   


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

        let x = query;
        console.log(x);
      
        axios.post(process.env.REACT_APP_GET_SONG_BY_TITLE,{Music:{music_title:x}})
        .then(res => {
            console.log(res.data.message);
            if(res.data.message.length <= 0)
                CALL_TWO(x)
          else
            setMusic(res.data.message);
        }).catch(err=> {
            console.log(err);
        })
    },[])




    function CALL_TWO(x){
        axios.post(process.env.REACT_APP_GET_SONG_BY_NAME,{Music:{music_artist:x}})
        .then(res => {
            console.log(res.data.message);
            if(res.data.message.length <= 0)
                Swal.fire({text:"Sorry no music found !", icon:"info"})
          else
             setMusic(res.data.message);
        }).catch(err=> {
            console.log(err);
        })
    }
  
 


    const SortDiv = () => {

    } 

    const GetAlbumPlaylist = (e) => {

    }


    const SortByGenre = () => {

    }

    const GetDownloadHighCount = (e) => {

    }



    


    return (
        <>
                <TwoTone/>
                <Container>
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
                                        <RiDownloadCloudLine  onClick={(e) =>  GetDownloadHighCount(e)}/> Trending
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
                                        <RiContactsBook2Line/> Contact Webdealz
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

                        <MusicMedias>
                            {music.length> 0 ? (
                                 music.map((v,i) => 
                                    <MusicGlide>
                                        
                                         <img 
                                           onClick={(e) => PopUpPlayer(e,setpageErrand({musicTitle:v.Music.music_title, musicThumb:v.Music.music_thumbnail, musicArtist:v.Music.music_artist, musicVideoUrl:v.Music.music_video, musicUrl:v.Music.music_url, doc_id: v.Music.doc_id,promoIncentive:"https://"}))} src={process.env.REACT_APP_BASE_URL+v.Music.music_thumbnail}/>
                                        
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


@media(max-width:768px){
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

@media(max-width:768px){
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


@media(max-width:768px){
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


@media(max-width:768px){
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



const MusicMedias = styled.div`
height: 49.5%;
width: 100%;
display: inline-block;
overflow-x:scroll;

::-webkit-scrollbar {
 display:none;
}


@media(max-width:768px){
height: 100%;
text-align:center;
}
`;


const MusicGlide = styled.div`
width: 200px;
height: 200px;
margin:5px;
text-align:center;
display: inline-block;
font-family: "Poppins", sans-serif;




img{
width: 200px;
height: 200px;
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

@media(max-width:768px){  
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





 export default SearchbyArtistsName;


