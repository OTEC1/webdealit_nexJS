import axios from 'axios'
import Header from '../Header'
import { useState,useEffect } from "react";
import styled from 'styled-components'
import { connect } from "react-redux";
import WriteUp from '../WriteUps';
import {updatePostlikes,format,app} from '../../actions'
import { RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';
import {CloudinaryContext, Image, Transformation} from 'cloudinary-react'
import  {MobileView, BrowserView}  from 'react-device-detect';
import Images from '../Images';
import Footer from '../Footer';
import ReactPlayer from 'react-player'
import Head from 'next/head'
import Meta from '../Heads';



export const getStaticPaths =  async() => {
    var options = {
        method: 'GET',
        url: process.env.NEXT_PUBLIC_GET_ALL_POST,
      };
    const  res = await axios.request(options);
    const data = await res.data; 
    const paths = data.message.map(v => {
        return { params: {key : v.UserPost.title.replace(/ /g,'+')} }
    });
    console.log(paths,"READ PATH");
    return {
        paths,
        fallback: false
    }
}



export const getStaticProps = async(context) => {
    const titles = context.params.key;
    var options = {
        method: 'POST',
        url: process.env.GET_POST_BY_TITLE,
        data: {UserPost:{title: titles}}
      };
     
    const  res = await axios.request(options);
    const data = await res.data; 
    
    return {
        props: {article: data.message}
    }
}





const Explore = ({article}) => {
const [react, setReact] = useState(false);
const [update, setUpdate] = useState(false);




const reset =  (email, docA, docB) =>  {
    if(react){
        setReact(false);  setUpdate(false);
    }else{
        setReact(true); updatePostlikes(1,1,0,email,docA,docB); setUpdate(true);
    }
} 

return(
    <>
     <Header/>
       {article[0] != undefined ?
       <>
        <Meta title={`Search result ${article[0].UserPost.title}`}
                  desc={article[0].UserPost.writeup.substring(0,100)}
                  web_url={`https://webfly.click`}  href={"/favicon.ico"} />
         <Container>
           <Content>
           {article[0].UserPost.image ? (
                             <div className='frame'>  
                                <div>  
                                    <div  id='soap'>
                                        <table>
                                            <tr>
                                                <td   onClick={() => reset(article[0].UserPost.useremail,article[0].UserPost.doc_id_a, article[0].UserPost.doc_id_b)}>
                                                 {!react ?  <RiThumbUpLine  id='thumb'/> :  <RiThumbUpFill color='#4180FF'  id='thumb'/>}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                <span>{update ?  parseInt(format(article[0].UserPost.likes))+1 : format(article[0].UserPost.likes)}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                      <Images title={article[0].UserPost.title} cloud={article[0].UserPost.cloudinaryPub} />

                                     <WriteUp title={article[0].UserPost.title}  date_time={article[0].UserPost.date_time}  writeup={article[0].UserPost.writeup}   views={article[0].UserPost.views}  doc_id_b={article[0].UserPost.doc_id_b} media={article[0].UserPost.image}  frame={article[0].UserPost.frame}   doc_id_a={article[0].UserPost.doc_id_a} User={article[0].User.useremail}/>
                                 </div>
                             </div>  
            ):article[0].UserPost.video ? (
                                 <div className='frame'> 
                                  <div>

                                     <div  id='soap'>
                                         <table>
                                             <tr>
                                                 <td   onClick={() => reset(article[0].UserPost.useremail, article[0].UserPost.doc_id_a, article[0].UserPost.doc_id_b)}>
                                                     {!react ?  <RiThumbUpLine  id='thumb'/> :  <RiThumbUpFill color='#4180FF'  id='thumb'/>}
                                                 </td>
                                             </tr>

                                             <tr>
                                                 <td>
                                                 <span>{update ?  parseInt(article[0].UserPost.likes)+1 : format(article[0].UserPost.likes)}</span>
                                                 </td>
                                             </tr>
                                         </table>
                                     </div>

                                         <ReactPlayer  alt={article[0].UserPost.title}   width="100%"  height="400px"  controls url={process.env.REACT_APP_APP_S3_VIDEO_BUCKET+article[0].UserPost.video}  autoPlay />
                                        {article[0] !== undefined ?
                                         <WriteUp title={article[0].UserPost.title}  date_time={article[0].UserPost.date_time}  writeup={article[0].UserPost.writeup}  views={article[0].UserPost.views}  doc_id_b={article[0].UserPost.doc_id_b}  media={article[0].UserPost.video}  frame={article[0].UserPost.frame}  doc_id_a={article[0].UserPost.doc_id_a} User={article[0].User.useremail}/>
                                            : ""}
                                         </div>
                                 </div>
            ):aritle[0].UserPost.youtubeLink ? (
                                 <div className='frame'>  
                                   <div>
                                     <div  id='soap'>
                                         <table>
                                             <tr>
                                                 <td   onClick={() => reset(article[0].UserPost.useremail,article[0].UserPost.doc_id_a, article[0].UserPost.doc_id_b)}>
                                                     {!react ?  <RiThumbUpLine  id='thumb'/> :  <RiThumbUpFill color='#4180FF'  id='thumb'/>}
                                                 </td>
                                             </tr>

                                             <tr>
                                                 <td>
                                                 <span>{update ?  parseInt(format(article[0].UserPost.likes))+1 : format(article[0].UserPost.likes)}</span>
                                                 </td>
                                             </tr>
                                         </table>
                                      </div>

                                     <ReactPlayer  alt={article[0].UserPost.title}   width="100%"  height="400px" controls url={article[0].UserPost.youtubeLink}  autoPlay/>
                                     <WriteUp title={article[0].UserPost.title}  date_time={article[0].UserPost.date_time}  writeup={article[0].UserPost.writeup}    views={article[0].UserPost.views}   doc_id_b={article[0].UserPost.doc_id_b}  media={article[0].UserPost.youtubeLink} frame={article[0].UserPost.frame} doc_id_a={article[0].UserPost.doc_id_a} User={article[0].User.useremail} />
                                   </div>
                                 </div>
                ):(<p></p>)
            }
          </Content> 
     </Container>
     </>
       : ""}
     <Footer/>
  </>
 
 )


 
}


const Container = styled.div`
width: 100%;
margin-bottom:100px;
background:#f5f5f5;
`;



const Content = styled.div`
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
width:80%;
margin:auto;
margin-top:150px;
padding-bottom:100px;


img{
height: 400px;
width: 600px;
object-fit:cover;
}

.frame{
width: 60%;
height: auto;
margin-bottom:10px;
position: relative;
}



#soap{
position: absolute;
height: 70px;
width: 70px;
border-radius:50%;
background: #fff;
display: flex;
right:0;
margin-right:-40px;
margin-top:-35px;
text-align:left;
justify-content:center;
align-items:center;
}

#thumb{
font-size:25pt;
cursor: pointer;
}



span{
display: flex;
text-align:center;
justify-content:center;
align-items:center;
}




@media(max-width:968px){
width: 100%;

.frame{
width: 100%;
margin: none;
}

img{
height: 300px;
width: 100%;
}


#soap{
height: 70px;
width: 70px;
margin-right:5px;
margin-top:-35px;
}
#thumb{
font-size:19pt;
}



span{
font-size:10pt;
}
}
`;






const  mapStateToProps = (state)  => {
 return {
     fbuser: state.fbState.fbuser,
     user:state.userState.user,
 };
};

const mapDistpachToProps = (dispatch) => ({

});


export default  connect(mapStateToProps,mapDistpachToProps)(Explore);