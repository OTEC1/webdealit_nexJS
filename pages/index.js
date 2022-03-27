import { useState ,useRef, useEffect} from 'react';
import Link from 'next/link'
import Header from './Header'
import styled from 'styled-components'
import TwoTone from './TwoTone'
import Bottom from './Bottom';
import Load from './Load';
import Ad from './Ad'
import Top from './Top';
import Marquee from 'react-fast-marquee';
import {RiAmazonLine, RiBitCoinLine, RiCoinLine, RiPlug2Line, RiStore2Line} from 'react-icons/ri'
import {BiCreditCard} from 'react-icons/bi'
import {FaSyncAlt} from 'react-icons/fa'
import  Head from 'next/head';



export const getStaticProps  = async() =>{
  const  res  =  await fetch(process.env.NEXT_PUBLIC_GET_ALL_POST);
  const data =   await res.json();
  const  res2  =  await fetch(process.env.NEXT_PUBLIC_GET_HOMEPAGETOP_LIST);
  const data2 =   await res2.json(); 
  return {
    props: {list_got: data.message, navs:data2.message}
  };
} 


const  Home = ({list_got,navs}) =>{
  
  
    const [L1, setL1] = useState([]);
    const [L2, setL2] = useState([]);
    const [L3, setL3] = useState([]);

    function format(list){
      let size = list.length/2;
      setL1(list.slice(0,size));
      setL2(list.slice(size,list.length));
    }

            
    useEffect(() => {
     format(list_got);
     setL3(navs)
    },[])

    
    return(
             <>
               <Head>
                    <title>webfly.click</title>
                    <meta name="description" content={`webflyblog produces content on healthy life tips, crypto market news also downlaod action & romantic movies and trending music.`} />
                    <meta property="og:title" content={`webfly.click`} />
                    <meta property="og:description" content={`webflyblog produces content on healthy life tips, crypto market news also downlaod action & romantic movies and trending music.`} />
                    <meta property="og:url" content={`https://webfly.click`} />
                    <meta property="og:type" content="website" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
             <Header/>
              <TwoTone/>  
               <Container>
                <TopHouseContainer>
                    <div id="Online">
                        <span>Online Marchant </span>&nbsp; <BiCreditCard id="icon" /> 
                    </div>
                    <AdRunner>
                        <Marquee speed={100} gradient={false}>
                          {L3.map((v,i) => 
                          <Link href={`/ETH?e=${v}"`}>
                            <Contains >
                            <FaSyncAlt/> &nbsp; {v} 
                            </Contains>
                          </Link>
                          )} 
                        </Marquee> 
                  </AdRunner>
              </TopHouseContainer>  
                 <Contain>
                  {L1.length > 0 ? (
                    <Top  post={L1}/>
                      ):
                      (
                        <div  id="loader">
                        <Load/>
                        </div>
                    )}
                 </Contain>
                 <Ad/>  
                </Container> 
                {L2.length > 0 ? ( 
                <Bottom data={L2}/>            
                ):<p></p>
               }
       </>  
  )
 }



const Container = styled.div`
position: relative;
width: 100%;
height:100vh;

::-webkit-scrollbar {
display: none;
}
#loader{
margin-right: auto;
margin-left:auto;
height: 200px;
margin-top:10%;
width: 200px;
text-align:center;
}
@media(max-width:968px){
#loader{
margin-top:50%;
height: auto;
} 
}
@media(max-width:968px){
overflow-y: scroll;
}
`;

const TopHouseContainer = styled.div`
width: 83%;
display: flex;
margin-right:auto;
margin-left:auto;
margin-top:141px;
height: 50px;

#Online{
display: flex;
justify-content:center;
align-items:center;
text-align:center;
font-size:10pt;
font-weight:700;
color: #f5f5f5;
font-family: "Poppins", sans-serif;
}

#icon{
font-size:20pt;
}
@media(max-width:968px){
width: 100%;
height: 40px;
span{
display: none;
}
#Online{
margin-left:-2px;
}
#icon{
font-size:40pt;
}
}
`;


const AdRunner = styled.div`
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
width: 80%;
margin-left:auto;
display: flex;
`;


const Contain = styled.div`
width: 85%;
margin:auto;
margin-top:10px;

@media(max-width:968px){
width: 100%;
}
`;




const Contains = styled.div`
font-size:1em;
display: flex;
justify-content:center;
align-items:center;
text-align:center;
background: #f5f5f5;
border-radius:5px;
padding: 5px;
margin:10px;
font-family: "Poppins", sans-serif;
cursor: pointer;
`;


  export  default Home;
