import React,{useState,useEffect} from 'react'
import swal from 'sweetalert2'
import Loader from "react-loader-spinner"
import Downloadmodel from './Downloadmodel'
import Header from './Header';
import Head from 'next/head';
import axios from 'axios';
import { format } from '../actions';
import styled from 'styled-components'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { RiThumbUpLine, RiPlayCircleLine, RiGroup2Line, RiPlayLine, RiArrowLeftCircleLine,RiArrowRightCircleLine, RiShareBoxLine, RiShareLine, RiDownload2Line, RiThumbUpFill, RiRotateLockLine} from 'react-icons/ri'
import { BiSlideshow, BiSortDown } from 'react-icons/bi';
import {FaSearchengin, FaSearchPlus} from 'react-icons/fa'
import {CloudinaryContext, Image, Transformation} from 'cloudinary-react'
import  {MobileView, BrowserView}  from 'react-device-detect';
import Footer from './Footer';



export const  getStaticProps = async() => {
    const  res1  =  await fetch(process.env.GETMOVIES);
    const data1 =   await res1.json();

    const res2 = await fetch(process.env.MOVIES_CATEGORY);
    const data2 = await res2.json();

    var options = {
      method: 'GET',
      url: process.env.MORECLIPS,
      params: {name: 'action', limit: '70', page: '1'},
      headers: {'x-rapidapi-host': process.env.HOST_KEY,'x-rapidapi-key': process.env.MOVIEKEY}
    };

  const res3 = await axios.request(options);
  const data3 = await res3.data;

  return {
    props: {list1:data1.message, list2:data2.message, list3:data3.results}
  }
}


 const mashup = (args) => {
    return [...new Set([].concat(...args))];
  }
  
  
  const Videosui = ({list1,list2,list3}) => {

    

  
    const [listing, setlisting] = useState([]);
    const [update, setUpdate] = useState(false);
    const [progress1, setProgress1] = useState(false);
    const [progress2, setProgress2] = useState(false);
    const [returner, setReturner] = useState(10001);
    const [showmodel, setshowmodel] = useState("close");
    const [downloadlink, setdownloadlink] = useState('');
    const [moviename, setmoviename] = useState('');
    const list4 = ["2000", "2001","2002","2003"]
    
  
    useEffect(() => {
      setlisting(mashup(list1.concat(list3)));
    },[]);

     const thanks = ()  => {
       if(!update)
           setUpdate(true);
        else
           setUpdate(false);
     }

     const reset = (e) => {
      setUpdate(false);
      //console.log(e.slideIndex)
    }

     const startDownload = (index,ins,dlk,name) => {
          console.log(dlk);
           setReturner(ins);
           setdownloadlink(dlk);
           setmoviename(name);
     
          if(index === 1)
             setProgress1(true);
          else
             setProgress2(true)
  
          switch(showmodel){
            case "open":
                  setshowmodel("close");
                  break;
            case "close":
                  setshowmodel("open");
                  break;
            default:
                  setshowmodel("close");
                  break;
          }
     }
  
  
  return(
      <>
      <Head>
      <title>webfly movies Downlaod</title>
      <meta name="description" content={`webflyblog produces content on healthy life tips, crypto market news also downlaod action & romantic movies and trending music.`} />
      <meta property="og:title" content={`webfly.click`} />
      <meta property="og:description" content={`webflyblog produces content on healthy life tips, crypto market news also downlaod action & romantic movies and trending music.`} />
      <meta property="og:url" content={`https://webfly.click`} />
      <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
       <Container>
          <SortDivs>
             <Sort>
                 <BreakDown>
                        <div>
                          <span>Category</span> 
                          <select>
                            {list2.map((v,i) =>
                              i !== 0 ?
                              <option  key={i}>{v}</option>
                                :
                              <p></p>
                            )}
                          </select>
                        </div>
  
                        <div>
                          <span>Year released</span> 
                          <select>
                            {list4.map((v,i) =>
                              <option  key={i}>{v}</option>
                            )}
                          </select>
                        </div>
  
                      <BottomQuery>
                          <FaSearchPlus  color='#000'/>
                      </BottomQuery>
                       
                  </BreakDown>
  
                 Sort Movies by <BiSortDown id='sort'/>
             </Sort>
          </SortDivs>
  
          <MovieSection>
              <TopSection>   
                   <Slider  id="slider" duration={3500} autoplay={1} previousButton={<RiArrowLeftCircleLine color="#f5f5f5"/>} nextButton={<RiArrowRightCircleLine  color="#f5f5f5"/>}  onSlideChange={(e) => reset(e)}>
                      {listing.map((v,i) =>
                         <div>
                              
                              <Readmore>
                               {i === 0 || i === 1 ?
                                  v.writeUp.length >= 140 ? v.writeUp.substring(0,140) : v.writeUp
                                  : 
                                  v.overview.length >= 140 ? v.overview.substring(0,140) + " ..." : v.overview
                                  }
                               </Readmore>
  
                                <img  style={{transform: [{rotate: `${v.spin}deg`}]}} 
                                 src={
                                  i === 0 || i === 1 ?
                                  process.env.NEXT_PUBLIC_S3_STREAM_THUMB_NAIL_BUCKET+v.fileName+".png"
                                  : 
                                  process.env.NEXT_PUBLIC_MOVIE_THUMBNAIL+v.poster_path
                                  } />
                           
  
                                 <div id='contain'>
                                      <div  id='Top_teaser' onClick={() => thanks()}>
                                       {update ? <RiThumbUpFill  id="icons"  color='#4180FF'  />  : <RiThumbUpLine  id="icons"  color='#f5f5f5'  /> }{update ?  parseInt(v.likes)+1 : format(v.likes)}
                                      </div>
  
                                      <pre  id='WriteUp'>
  
                                          { i === 0 || i === 1 ?
                                             v.writeUp.length >= 225 ? v.writeUp.substring(0,225) : v.writeUp
                                             : 
                                             v.overview.length >= 225 ? v.overview.substring(0,225) + " ..." : v.overview
                                          }
  
                                      </pre>
  
                                      <div  id='Bottom_teaser'>
                                        <RiShareLine id="icons"   color='#f5f5f5'/> 
                                      </div>
                                      
                                  </div>
  
                               <div id="player-btn">
                                   <table>
                                       <tr>
                                           <td>
                                           <label  id='Upcaving'>
                                             Title: 
                                             { i === 0 || i === 1 ?
                                              v.Mtitle
                                              : 
                                              v.title
                                              }
                                           </label> 
                                             {!progress1 ? 
  
                                              <label  id='Upcaving' 
                                                  onClick={(e) => startDownload(1,i, i <= 1 ?  process.env.NEXT_PUBLIC_S3_STREAM_THUMB_NAIL_BUCKET+v.fileName+".mp4" : v.download_links , i <= 1  ? v.Mtitle+".mp4" : v.title+".mp4") }>
                                                  Download  &nbsp;&nbsp;<RiDownload2Line id='Slider_icons'/>
                                              </label> 
  
                                               : returner === i ?
                                                 <label id='Upcaving'> <Loader  type="Oval" color="#f5f5f5" height={20}width={20}/></label>
                                               :
                                               <label  id='Upcaving' 
                                                 onClick={(e) => startDownload(1,i, i <= 1 ?  process.env.NEXT_PUBLIC_S3_STREAM_THUMB_NAIL_BUCKET+v.fileName+".mp4" : v.download_links , i <= 1  ? v.Mtitle+".mp4" : v.title+".mp4") }>
                                                 Download  &nbsp;&nbsp;  <RiDownload2Line id='Slider_icons'/>
                                               </label> 
  
                                              }
                                           
                                            <label  id='Upcaving'>
                                              Year release: 
                                              { i === 0 || i === 1 ?
                                                v.year
                                                :
                                                 " "
                                              }
                                            </label>
                                           </td>
                                       </tr>
  
                                   </table>
                                
                              </div>
  
                         </div>
                           )}
                      </Slider> 
              </TopSection>
  
              
              <br/>
              <br/>
              <br/>
              <br/>
                <span id='Span'>Trending</span>
                  <BottomSection>
                      {listing.map((v,i)=>
                      <div id='videos'>
                            <MobileView>
                             <img 
                                style={{ transform: `rotate(${v.spin}deg)`}}
                                src={ 
                                  i === 0 || i === 1 ?
                                  process.env.NEXT_PUBLIC_S3_STREAM_THUMB_NAIL_BUCKET+v.fileName+".png"
                                  : 
                                  process.env.NEXT_PUBLIC_MOVIE_THUMBNAIL+v.poster_path
                                  } />
                            </MobileView>
  
                             <BrowserView> 
                              <img 
                               src={ 
                                i === 0 || i === 1 ?
                                 process.env.NEXT_PUBLIC_S3_STREAM_THUMB_NAIL_BUCKET+v.fileName+".png"
                                : 
                                 process.env.NEXT_PUBLIC_MOVIE_THUMBNAIL+v.poster_path
                                }
                                />
                            </BrowserView>
  
  
                             <div  id='downComponent'>
                              {!progress2 ?
                              <label  id='caving'>
                                <RiDownload2Line onClick={(e) => startDownload(2,i, i <= 1 ?  process.env.REACT_APP_APP_S3_STREAM_VIDEO_BUCKET+v.fileName+".mp4" : v.download_links , i <= 1  ?  v.Mtitle+".mp4" :  v.title+".mp4") } />
                              </label> 
                              : returner === i ?
                              <label  id='caving'><Loader  type="Oval" color="#f5f5f5" height={20} width={20}/></label>
                              :
                              <label  id='caving'>
                                <RiDownload2Line onClick={(e) => startDownload(2,i , i <= 1 ?  process.env.REACT_APP_APP_S3_STREAM_VIDEO_BUCKET+v.fileName+".mp4" : v.download_links , i <= 1  ? v.Mtitle+".mp4" : v.title+".mp4") } />
                              </label> 
                             }
  
                              <label  id='cavingName'>
                                 Title: 
                                { i === 0 || i === 1 ?
                                 v.Mtitle
                                : 
                                v.title.length > 20 ? v.title.substring(0,17) +"...": v.title
                                }
                              </label>
  
                             </div>
                      </div>
                      
                      )}
                  </BottomSection>
          </MovieSection>
          <br/><br/><br/>
      </Container>
  
    { downloadlink ?
      <Downloadmodel showModel={showmodel}  closemodel={startDownload}  link={downloadlink} moviename={moviename}/>
    :
      console.log("None")
    }
     <Footer/>
      </>
  )
  }
  
const Container = styled.div`
margin-left:auto;
margin-right:auto;
width: 80%;


#player-btn{
left:2%;
font-size:25px;
margin-top: -10%;
color: #fff;
cursor: pointer;
}

#Upcaving{
font-size:9pt;
border: 1px solid #fff;
border-radius:5px;
font-weight:500;
padding: 3px;
margin: 10px;
display: flex;
justify-content:center;
align-items:center;
text-align:center;
cursor: pointer;
}


tr td{
display: flex;
}


img{
height: 200px;
width: 200px;
}




@media(max-width:768px){
width: 100%;

#player-btn{
left:2%;
font-size:25px;
margin-top:-50%;
}

}

`;




const SortDivs = styled.div`
width: 100%;
height: 10vh;
margin-top:150px;
margin-bottom:30px;
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
@media(max-width:768px){
font-size:8pt;
}

`;







const BreakDown = styled.div`
display:none;
position: absolute;
width: 200px;
height: 200px;
margin-top:240px;
background: #fff;
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
border-radius:10px;
z-index:50;
padding: 10px;

div{
display: flex;
align-items:center;
justify-content:space-between;
margin-top:10px;

}
span{
color: #000;
font-weight:10;
margin-right: 5px;
}
select{
float: right;
margin-top:5px;

}


@media(max-width:768px){
position: relative;
width: 200px;
border:2px solid #f5f5f5;
left:25%;
z-index:500;


}

`;



const Sort = styled.div`
float: right;
width:auto;
height: 100%;
color: #fff;
display: flex;
align-items: center;
font-weight:700;
padding-right: 5px;
font-family: "Poppins", sans-serif;

#sort{
float: right;
font-size:35px;

}

&:hover{
${BreakDown}{
display: block;
}
}

@media(max-width:768px){
#sort{
font-size:20px;
}
}
`;




const BottomQuery = styled.div`
position: absolute;
right: 0;
bottom: 0;
margin: 10px;
cursor: pointer;
font-size:25px;

`;




const MovieSection = styled.div`
width: 100%;
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
margin-bottom:5px;


#Span{
margin: 10px;
font-weight:800;
font-family: "Poppins", sans-serif;
color:#f5f5f5
}

@media(max-width:768px){
padding-bottom:50px;
}

`;



const TopSection = styled.div`
height: 60vh;
width: 100%; 
padding-bottom:0px;
position: relative;

img{
max-width:100%;
width: 100%;
min-width:100%;
max-height:100%;
height: 100%;
min-height:100%;
object-fit:cover;
}

#icons{
font-size:45px;
}

#contain{
position:absolute;
top:0;
right:0;
max-width: 35%;
height: auto;
max-height:100px;
min-height:100px;
color:#f5f5f5;
}
#WriteUp{
word-wrap: break-word;
white-space: pre-wrap;
font-family: "Poppins", sans-serif;
width:100%;
padding:15px;
overflow-y: scroll;
text-align:left;
color: #f5f5f5;
font-weight:500;
margin-right:10px;
background-image: linear-gradient(to top right,#1f505f, #07091C);
border-radius:20px;
text-align:left;
}

#WriteUp::-webkit-scrollbar {
display: none;
}

#Top_teaser{
float: right;
height:70px;
width:  70px;
margin: 10px;
cursor: pointer;
}


#Bottom_teaser{
float: right;
height:70px;
width:  70px;
margin: 10px;
cursor: pointer;
}

@media(max-width:768px){
height: 70vh;
img{
max-width:100%;
width: 100%;
min-width:100%;
max-height:70%;
height: 90%;
min-height:90%;
object-fit:cover;
}


#contain{
max-width: 100%;
text-align:left;
margin: 0px;
position:relative;
}

#WriteUp{
padding-top:40px;
max-height:100px;
height: 100px;
overflow: scroll;
overflow-y:scroll;
width:350px;
max-width:350px;
padding-left:5px;
padding-right:5px;

}

#Top_teaser{
height: 40px;
margin-right:-12px;
justify-content:center;
align-items:center;
text-align:center;
margin: 5px;
}


#Bottom_teaser{
position: absolute;
float:left;
top: 0px;
margin: 2px;
}

#icons{
position: relative;
top:5px;
font-size:30px;
}
}
`;


const Readmore = styled.div`
display: none;

@media(max-width:768px){
display: block;
position: absolute;
width: 60%;
height: 100px;
right:0;
font-size:9pt;
border-radius:10px;
margin: 5px;
padding: 5px;
color: #fff;
background-image: linear-gradient(to top right,#1f505f, #07091C);
font-family: "Poppins", sans-serif;
}
`;




const BottomSection= styled.div`
width: 100%;
padding-top:5px;
height: 40vh;
overflow: auto;
white-space: nowrap;


#videos{
display: inline-block;
margin: 10px;
}


#downComponent{
margin-top:-50px;
display: flex;
align-items:center;
justify-content:space-between;
color: #fff;
}


#caving{
border: 1px solid #fff;
border-radius:5px;
font-weight:500;
padding: 3px;
margin: 3px;
cursor: pointer;
}

#cavingName{
font-size:10pt;
border: 1px solid #fff;
border-radius:5px;
font-weight:500;
padding: 3px;
margin: 3px;
}

::-webkit-scrollbar {
display: none;
}



@media(max-width:768px){
margin-top:10px;

#downComponent{
position: relative;
margin-top:-50px;
z-index:900;
}

}
`;


  export default Videosui;