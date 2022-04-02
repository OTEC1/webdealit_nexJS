import  styled  from 'styled-components'
import Header from './Header'
import Ad from './Ad'
import { useParams } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import { useEffect , useState } from 'react'
import Explore  from './Explore'
import TwoTone from './TwoTone'
import {formation} from '../actions'
import { useRouter } from 'next/router'
import Footer from './Footer'





 const Explorecontent = (props) => {
   
    const  router = useRouter(); 
    let base  = router.query;
    let frame = base.frame;
    let useremail = base.useremail;
    let caller = base.caller;
    let views = base.views;
    let doc_id_b = base.doc_id_b;      
    const [doc_id_bs, setdoc_id_bs] = useState('');
    const [doc_id_a, setdoc_id_a] = useState('');
    const [title, settitle] = useState('');
    const [exifData, setexifData] = useState('');
    const [media, setMedia]= useState('');
    const [writeup , setwriteup] = useState('');
    const [likes, setlikes] = useState('');
    const [date_time, setdate_time]= useState('');
    const [cloud, setcloud] = useState('');
    const [viewer, setviewer] = useState(0);

    useEffect(()=>{
      window.scrollTo(0,0);   
      if(caller == "p")
            axios.post(process.env.NEXT_PUBLIC_GET_POST_LINK,{User:{useremail:useremail},UserPost:{doc_id_b:doc_id_b}})
                  .then(res => {
                     setdoc_id_bs(res.data.message.UserPost.doc_id_b)
                     setdoc_id_a(res.data.message.UserPost.doc_id_a)
                     settitle(res.data.message.UserPost.title);
                     setexifData(res.data.message.UserPost.exifData)
                     setMedia(res.data.message.UserPost.video ? res.data.message.UserPost.video : res.data.message.UserPost.image)
                     setwriteup(res.data.message.UserPost.writeup);
                     setlikes(res.data.message.UserPost.likes);
                     setdate_time(res.data.message.UserPost.date_time);
                     setviewer(res.data.message.UserPost.views)
                     setcloud(res.data.message.UserPost.cloudinaryPub);
                  })
                  .catch(err => {
                     console.log(err);
                  })
         
    },[])
    return (
       <>
       <Header/>
       <TwoTone/>
        <Container>
            <Navs/>
            <>
             <Explore frame={formation(frame ? frame.toLowerCase() : "")} 
                              useremail={useremail}
                              doc_id_a={doc_id_a}
                              doc_id_b={doc_id_bs}
                              title={title}
                              exifData={exifData}
                              media={media}
                              writeup={writeup}
                              likes={likes}
                              date_time={date_time} 
                              cloud={cloud}
                              views={viewer}/> 
                </>    
            <Footer/>
        </Container>
        </>
     
    )
 }



 const Container = styled.div`
 position: relative;
 background:#f5f5f5;
 
 `;

const Navs = styled.div`
height:10vh;
width:80%;
margin:auto;
margin-top:170px;



@media(max-width:968px){
width: 100%;
margin: none;
overflow: hidden;
}

`;


 export default Explorecontent;


