import { RiArrowDownCircleLine, RiArrowDownLine, RiArrowDropDownFill, RiArrowDropDownLine, RiCloseCircleLine, RiDownloadCloud2Fill, RiDownloadCloudLine, RiDownloadLine, RiPauseCircleLine,RiPlayCircleLine, RiShareLine, RiSkipBackFill, RiSkipForwardFill, RiVideoDownloadFill } from "react-icons/ri"
import styled from "styled-components"
import { useEffect, useState } from "react"
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import Loader from "react-loader-spinner";
import ShareDialog from './ShareDialog'
import axios from "axios";
import  swal from 'sweetalert2'






const Musicplayer = (props) => {


    const [progress1, setProgress1] = useState(false);
    const [progress2, setProgress2] = useState(false);
    const [showModel, setShowModel] = useState("close");

    const reset =  (e) => {
        props.PopUpPlayer(e);
    };



    const DownloadFiles = (dataUrl, filename,index) => {
        if(index === 1)
            setProgress1(true);
        else
            setProgress2(true)
            
        axios({ url: dataUrl,
                method: 'GET', responseType: 'blob',})
             .then((response) => { 
                 const url = window.URL.createObjectURL(new Blob([response.data])); 
                  const link = document.createElement('a');
                   link.href = url; link.setAttribute('download', filename);
                    document.body.appendChild(link); link.click(); 
                    if(index === 1)
                       setProgress1(false);
                    else
                      setProgress2(false);
                }).catch(err => {
                    alert(err);
                    if(index === 1)
                        setProgress1(false);
                    else
                      setProgress2(false);
                })
        
    }
    



    const redirectUser = (e) => {
        e.preventDefault();
 
           switch(showModel){
            case "open":
                setShowModel("close");
                break;

            case "close":
                setShowModel("open");
            break;

            default:
                setShowModel("close");
                break;
        };

    }


    return(
        
            <>
           
           <ShareDialog showModel={showModel}  musicArtist={props.musicData.musicArtist} musicTitle={props.musicData.musicTitle.replace(/ /g, '')}  musicThumb={props.musicData.musicThumb}  doc_id_b={props.musicData.doc_id_b} section="m"  redirectUser={redirectUser} mail={null}/> 
                {props.showPlayermodel === "open" &&(
                    <Container>
                        <WidgetButton>

                            <Widget>
                           

                            </Widget>

                            <MusicPicture>
                              <img src={process.env.NEXT_PUBLIC_BASE_URL+props.musicData.musicThumb}/>
                              <tr>
                                  <td>
                                  <h5>{props.musicData.musicTitle.length > 20 ? props.musicData.musicTitle.substring(0,20)+"..." : props.musicData.musicTitle }</h5>
                                  <h4>{props.musicData.musicArtist}</h4>
                                  </td>
                              </tr>
                            </MusicPicture>

                        </WidgetButton>

                        <ProgressCount>
                            <AudioPlayer
                                    layout="horizontal-reverse"
                                    defaultCurrentTime={<Loader type="Oval" color="#f5f5f5" height={30}width={30}/>}
                                    defaultDuration={<Loader type="Oval" color="#f5f5f5" height={30}width={30}/>}
                                    customVolumeControls={[]}
                                    customAdditionalControls={[]}
                                    src={process.env.NEXT_PUBLIC_BASE_URL+props.musicData.musicUrl}
                                    onPlay={e => console.log("onPlay")}
                                />
                        </ProgressCount>


                        <DownloadShare>

                            <DownloadFile>
                               
                               <div onClick={(e) => DownloadFiles(process.env.NEXT_PUBLIC_BASE_URL+props.musicData.musicUrl,props.musicData.musicTitle+"_"+props.musicData.musicArtist+".mp3",1)}>
                                    <RiDownloadCloud2Fill  />
                                    {!progress1 ? <h5>Download Music</h5> :<div id="loadimg"><Loader  type="Oval" color="#f5f5f5" height={20}width={20}/></div>}
                               </div>
                                  
                                <div  onClick={(e) => DownloadFiles(process.env.NEXT_PUBLIC_BASE_URL+props.musicData.musicVideoUrl,props.musicData.musicTitle+"_"+props.musicData.musicArtist+".mp4",2)}>
                                    <RiVideoDownloadFill/>
                                    {!progress2 ? <h5>Download Video</h5> :<div id="loadimg"><Loader  type="Oval" color="#f5f5f5" height={20}width={20}/></div>}
                                </div>

                            </DownloadFile>

                            <Incentivesection>
                                  
                                 <div onClick={(e) =>redirectUser(e)}>
                                    <RiShareLine/>
                                    <h5>Share Post to win weekly prize</h5>
                                </div>
                                
                            </Incentivesection>

                            <CloseSection>
                               <RiArrowDownCircleLine onClick={(e)=> reset(e)}/>
                            </CloseSection>

                        </DownloadShare>

                     
                    </Container>
                  
                    
                    )}
        
               
            </>
            
        )
}



const Container = styled.div`
display: flex;
position: fixed;
left: 0;
bottom: 0;
width: 100%;
background-image: linear-gradient(to top right,#1f505f, #07091C);
height:90px;
z-index:100;


@media(max-width:968px){
display: flex;
flex-flow: column nowrap;
margin-bottom:55px;
padding-bottom:30px;
height: 50vh;
}

`;




const ProgressCount = styled.div`
width: 45%;
height: 100%;


.rhap_container{
outline:none;
background:transparent;
height: 100%;
box-shadow:none;
}


.rhap_container svg{
color: #ffffff;
}

.rhap_time{
color: #ffffff;   
}


@media(max-width:968px){  
height: 50%;
width:100%;
.rhap_container svg{
font-size:20pt;
}  
 
}
`;



const WidgetButton = styled.div`
display: flex;
width:25%;
height: 100%;

@media(max-width:968px){
width:100%;
height: 70%;
text-align:left;
}
`;

const Widget = styled.div`
display: flex;
font-size:20pt;
width: 35%;
height: 100%;
padding-top: 35px;
cursor: pointer;
justify-content:center;

@media(max-width:968px){
padding-top: 0px;
width: 0%;
}
`;


const MusicPicture = styled.div`
display: flex;
justify-content:space-evenly;
align-items:center;
text-align:center;
width: 65%;
height: 100%;
font-family: "Poppins", sans-serif;


img{
height: 70px;
width: 70px;
margin-top: 12px;
border-radius:50%;
object-fit:cover;
}

h5{
font-size:12pt;
margin: 5px;
color: rgba(255,255,255,.7);
}

h4{
font-size:8pt;
margin: 5px;
color: #b8b9be;
}


@media(max-width:968px){
width:100%;
flex-direction:row;
img{
margin-top: 5px;
}

h5{
font-size:8pt;
margin: 2px;
}

h4{
font-size:6pt;
margin: 2px;
}

}
`;




const  DownloadShare = styled.div`
width: 30%;
height: 100%;
color:#ffffff;
display: flex;

@media(max-width:968px){
flex-direction:row;
height: 50%;   
width:100%;
}
`;






const DownloadFile = styled.div`
display:flex;
width: 40%;
height: 100%;
margin-left:35px;


div{
width: 100%;
cursor: pointer;
padding-top:15px;    
text-align:center;    
font-weight:100;
font-family: "Poppins", sans-serif;
}
div>h5{
font-size:8pt;    
}

#loadimg{
position: relative;
margin-top:-25px;
}



@media(max-width:968px){
width: 50%;
margin-left:0px;
div{    
margin-left:10px;  
padding-top:4px;
}

#loadimg{
position: relative;
margin-top:-50px;
margin-left:-10px;
}

}
`;

const Incentivesection = styled.div`
width: 30%;
height: 100%;
display:flex;
margin-left:15px;
justify-content:center;
align-items:center;
font-size:15pt;
div{
cursor: pointer;
padding-top:2px;    
text-align:center;    
font-weight:100;
font-family: "Poppins", sans-serif;
}
div>h5{
font-size:8pt;    
}

@media(max-width:968px){
div{
height: 100%;
}
}

`;

const CloseSection = styled.div`
width: 20%;
height: 100%;
font-size:20pt;
text-align:right;
padding: 10px;
cursor: pointer;

`;





export default Musicplayer;