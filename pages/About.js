import { useEffect } from 'react';
import { RiMusicFill,RiAppsFill, RiBitCoinLine, RiSafe2Fill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'


const About = (props) => {
    const {index1,index2} = useParams();
    useEffect(() => {
        window.scrollTo(index1,index2);
    },[])
    return (
        <Container>

            <div>
                <table>
                    <tr>
                        <td>
                          <h5 id='div1'>
                            <RiMusicFill size={25}/>
                             &nbsp;&nbsp; Webflyblog helps it viewer stay current on relevant entertainment 
                            news We are also into music promotion offer
                          </h5>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <h5 id='div2'>
                            <RiAppsFill size={25}/>
                             &nbsp;&nbsp;
                               Webfly business also extends to
                                 mobile  app development
                                 and website design
                            </h5>
                        </td>
                    </tr>


                    <tr>
                        <td>
                            <h5 id='div3'>
                                <RiBitCoinLine  size={25}/>
                                &nbsp;&nbsp;
                                    With a strong knowledge in Crypto currencies we offer deep insight 
                                    into blockchain technology while providing our user with get started guide 
                                    into Crypto investments
                            </h5>
                        </td>
                    </tr>



                    <tr>
                        <td>
                            <h5 id='div4'>
                                <RiSafe2Fill  size={25}/>
                                &nbsp;&nbsp;
                                   
                                The information provided by Webfly  on webfly.click
                                is for general informational purposes only. 
                                 All information on the Site is provided in good faith, 
                                 however we make no representation or warranty of any kind, express or implied, 
                                 regarding the accuracy, adequacy, validity, 
                                reliability, availability or completeness of any information on the Site 
                      

                                Pls note Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of
                                the use of the website  or reliance on any information provided on the site.
                                 Your use of the site   and your reliance on any information on the site is solely at your own risk.
                                 Thanks from the team @ webfly.click 
                                
                            </h5>
                        </td>
                    </tr>

                </table>

            </div>

        </Container>

    )
}


const Container = styled.div`
display: flex;
height: ;

div{
border-radius:10px;
padding:10px;
width: 80%;
height: 100vh;
margin-left:auto;
margin-right:auto;


table{
width: 100%;
tr td{

display: flex;
#div1{
width: 45%;
color: #f5f5f5;
font-family: "Poppins", sans-serif;
margin-top:200px;
box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
padding: 15px;
font-size:15pt;
@media(max-width:968px){
width: 100%;
font-size:10pt;
}
}

#div2{
margin-left:auto;
width: 45%;
color: #f5f5f5;
font-family: "Poppins", sans-serif;
margin-top:50px;
box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
padding: 15px;
@media(max-width:968px){
width: 100%;
font-size:9pt;
}
    
}

#div3{
width: 45%;
color: #f5f5f5;
font-family: "Poppins", sans-serif;
margin-top:50px;
box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
padding: 15px; 

@media(max-width:968px){
width: 100%;
font-size:9pt;
}

}

#div4{
margin-left:auto;
margin-right:auto;
margin-top:150px;
width: 45%;
color: #f5f5f5;
font-family: "Poppins", sans-serif;
box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
padding: 30px; 
font-size:12pt;
margin-bottom:100px;

@media(max-width:968px){
width: 100%;
font-size:9pt;
}
}
}
}
}

`;


export default About;