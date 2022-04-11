import styled from "styled-components";
import { useState,useEffect } from "react";
import { BiRocket } from 'react-icons/bi';
import {RiEye2Line, RiEyeLine, RiShareLine, RiTimeLine}  from 'react-icons/ri'
import InstagramEmbed from 'react-instagram-embed';
import ReactHtmlParser  from 'html-react-parser'
import ShareDialog from './ShareDialog'
import axios from "axios";
import { useRouter } from "next/router";
import {CloudinaryContext, Image, Transformation} from 'cloudinary-react'
import  {MobileView, BrowserView}  from 'react-device-detect';
import { updatePostlikes , format_text} from "../actions";
import { connect } from "react-redux";
import Link from 'next/link'






const WriteUp = (props) => {

    const [showModel, setShowModel] = useState("close");
    const [list, setList]= useState([]);
    let history = useRouter();



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




    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_GET_ALL_POST)
        .then(res => {
            setList(res.data.message);
        }).catch(err => {
           console.log(err.message)
        });

        <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
        </script>

    },[]);

    

    const navigates = (x) =>{
        let frame = x.frame;
        let useremail=x.useremail;
        let views = x.views
        let caller = "o"; 
        updatePostlikes(1,0,1,useremail,x.doc_id_a,x.doc_id_b);
        window.scrollTo(0,0);
        
      }
  

      const styles = {
        display:"block"
    };

    return(
        <>
        <Container>
          <table>
              <tr>
                  <td>
                   <BiRocket  id="startPin"/> <h4>{props.title}</h4>   <div id="sharebtn" onClick={(e)=> redirectUser(e)}><RiShareLine/></div>
                  </td>
              </tr>

              <tr>
                  <td>
                   <RiTimeLine id="datePin" /> <h5>{props.date_time}</h5>
                  </td>
              </tr>

              <tr>
                  <td>
                      <label>
                        <RiEyeLine id="datePin" /> <h5>{props.views}</h5>
                      </label>
                   
                  </td>
              </tr> 
                <tr>
                    <td> 
                    { props.writeup ? 
                         props.User == process.env.NEXT_PUBLIC_NOMAIL1 || props.User  == process.env.NEXT_PUBLIC_NOMAIL2 || props.User == process.env.NEXT_PUBLIC_NOMAIL3  ? 
                                <div>
                                    <pre>{ReactHtmlParser(props.writeup.substring(0, props.writeup.indexOf("&%")))} </pre>  
                                    <Ad> 
                                    ADVERTISMENT
                                    <ins className="adsbygoogle"
                                        style={styles}
                                        data-ad-client="ca-pub-8581831304889952"
                                        data-ad-slot="4848943328"
                                        data-ad-format="auto"
                                        data-full-width-responsive="true"></ins>
                                    </Ad>  

                                    <pre>{ReactHtmlParser(props.writeup.substring(props.writeup.indexOf("&%")+2, props.writeup.indexOf("&%%")))} </pre>  
                                    <Ad>
                                      ADVERTISMENT
                                      <ins className="adsbygoogle"
                                             style={styles}
                                            data-ad-client="ca-pub-8581831304889952"
                                            data-ad-slot="7070361100"
                                            data-ad-format="auto"
                                            data-full-width-responsive="true"></ins>
                                    </Ad> 
                                    
                                    <pre>{ReactHtmlParser(props.writeup.substring(props.writeup.indexOf("&%%")+3, props.writeup.indexOf("&%%%")))} </pre>  
                                    <Ad>
                                        ADVERTISMENT 
                                        <ins className="adsbygoogle"
                                        style={styles}
                                        data-ad-client="ca-pub-8581831304889952"
                                        data-ad-slot="4848943328"
                                        data-ad-format="auto"
                                        data-full-width-responsive="true"></ins>
                                    </Ad> 

                                    <pre>{ReactHtmlParser(props.writeup.substring(props.writeup.indexOf("&%%%")+4, props.writeup.length))} </pre>  
                                    <Ad>
                                        ADVERTISMENT 
                                        <ins className="adsbygoogle"
                                             style={styles}
                                            data-ad-client="ca-pub-8581831304889952"
                                            data-ad-slot="7070361100"
                                            data-ad-format="auto"
                                            data-full-width-responsive="true"></ins>
                                    </Ad> 
                                </div>
                            :<div>
                             <Ad>
                               ADVERTISMENT
                             </Ad>  
                             <pre>{ReactHtmlParser(props.writeup)} </pre>  
                           </div>
                        :""}
                    </td>
                </tr>
          </table>   
         </Container>
      <Contain>
      { props.writeup ? <ShareDialog showModel={showModel}  musicArtist={""} musicTitle={props.title}  musicThumb={props.media.includes(".mp4") ?  process.env.NEXT_PUBLIC_S3_PICTURE_SECTION+props.media :  process.env.NEXT_PUBLIC_APP_S3_IMAGE_BUCKET+props.media}   doc_id_b={props.doc_id_b} section="p"  redirectUser={redirectUser}  mail={props.User}/>  : ""}
      </Contain>

            <MoreContent>
                <label>
                You may also like
                </label>
                <RelatedContent>
                        {list.map((v,i) =>
                           v.UserPost.image  &&  v.UserPost.doc_id_a !== props.doc_id_a ?
                           <Link href={`/Read/${format_text(v.UserPost.title)}`}>
                                <MiniContainer>
                                    <img  id="im" src={process.env.NEXT_PUBLIC_APP_S3_IMAGE_BUCKET+v.UserPost.image}/>
                                        <MobileView>
                                        <div id="up">{v.UserPost.title}</div>
                                        <br/>
                                        <div id="down">{v.UserPost.writeup.length > 100 ? v.UserPost.writeup.substring(0,70)+" ... Read more" : v.UserPost.writeup }</div>
                                        </MobileView>
                                        <BrowserView>
                                        <div id="down"> {v.UserPost.writeup.length > 60 ? v.UserPost.writeup.substring(0,60)+" ... Read more" : v.UserPost.writeup }</div>
                                        </BrowserView>
                                </MiniContainer>
                              </Link>
                         : <div></div>
                        )}
                </RelatedContent>
            </MoreContent>

     </>
    )
}

const Contain = styled.div`
position: absolute;
top:0;
left:0;
height: 100vh;
width: 100%;
display: flex;

`;


const Container = styled.div`
text-align:left;
display: flex;

table{
max-width:90%;
width: 90%;
font-family: "Poppins", sans-serif;
color: #f5f5f5;
padding-bottom:100px;
font-size:12pt;
color:#ffffff;
}



h4{
font-weight:900;
font-size:15pt;
max-width:80%;
}

h5{
font-size:7pt;
}

tr td{
float:left;
display:flex;
text-align:left;
align-items:center;
justify-content:center
font-weight:500;
max-width:100%;
width:100%;
margin-left:10px;
color: #636360;


#sharebtn{
margin-left:auto;
font-size:16pt;
cursor: pointer;
z-index:9999;
}

}


label{
margin-left:auto;
display:flex;
text-align:left;
align-items:center;
justify-content:center   
max-width:auto;
width:auto;
font-weight:700;
font-size:15pt;
h5{
font-size:15pt;
}
}





pre{
word-wrap: break-word;
height: auto;
white-space: pre-wrap;
font-family: "Poppins", sans-serif;
font-size:12pt;
color: #636360;


>a{
text-decoration:none;
color: #33ff00;
}


img{
width: 100%;
height: 350px;
object-fit:cover;
margin-top:50px;
margin-bottom:50px;
}


}


#startPin{
margin:5px;
font-size:25pt;
color:#00ff5d;
}

#datePin{
margin:5px;
}



@media(max-width:768px){
text-align:center;
max-width: 100%;

table{
max-width:95%;
width: 95%;
font-size:14pt;

}
    
#startPin{
font-size:15pt;
}

h4{
font-size:12pt;
}


tr td{
max-width:99.5%;
width:99.5%;
float: none;
text-align:left;
}
}

`;



const Ad = styled.div`
width: 100%;
height: 100px;
color: #636360;
text-align:center;

`;




const MoreContent = styled.div`
width: 100%;
height: 200px;
text-align:center;

label{
color:red
font-weight:900;
font-size:15pt;
color: #636360;
font-family: "Poppins", sans-serif;
}

`;


const RelatedContent = styled.div`
margin-top:10px;
width: 100%;
height: 200px;
padding: 5px;
display: flex;
flex-wrap:wrap;
justify-content:center;
overflow-y:scroll;
overflow-x:hidden;


::-webkit-scrollbar {
display: none;
}


#im{
border-radius:5px;
width: 180px;
height: 120px;
clip-path: ellipse(78% 100% at 32.64% 0%);
object-fit:cover;
}

@media(max-width:768px){
padding: 0px;
}


`;


const MiniContainer = styled.div`
width: 180px;
height: 170px;
background: #fff;
border-radius:10px;
margin: 10px;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

#im{
border-radius:5px;
width: 180px;
height: 120px;
clip-path: ellipse(78% 100% at 32.64% 0%);
object-fit:cover;
}

#up{
text-align:left;
padding: 5px;
font-size:9pt;
font-weight:600;

}


#down{
text-align:left;
padding-bottom: 10px;
padding-left:3px;
padding-right:3px;
font-size:9pt;
color: #000;
}

@media(max-width:768px){
width: 90%;
display: flex;
height: 120px;
border-radius: none;

#im{
width:150px;
height:120px;
clip-path:none;
border-radius:10px 0px 0px 10px;
min-width:150px;
max-width:150px;
}

}

`;


const mapStateToProps = (state) => {
    return{
        user: state.userState.user,
    }
}

const mapDispatchToProps = dispatch =>({})

export default connect(mapStateToProps,mapDispatchToProps)(WriteUp);
