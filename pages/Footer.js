import styled  from "styled-components";
import { RiAccountCircleLine, RiCopyrightLine,RiSafeFill, RiFacebookBoxLine, RiInstagramLine, RiMessage2Line, RiTeamLine, RiTwitterLine, } from 'react-icons/ri';
import { useRouter } from "next/router";

const Footer = (props) => {


    const history = useRouter();

    const nav = (data,index1,index2) => {
        history.push(`/${data}?index1=`+index1+"&index2="+index2);
    }

    return(
        <Footers>
            <LEFT> 
            <table>
                <tr>
                    <td onClick={(e) => nav("Connect",0,0)}>
                     Contact us &nbsp; <RiMessage2Line/>
                    </td>
                </tr>

                <tr>
                    <td>
                     <a  href={process.env.REACT_APP_FACE_PAGE_LINK}>Like our Page on</a>  &nbsp;<RiFacebookBoxLine/> 
                    </td>
                </tr>


                <tr>
                    <td>
                      <a href="https://www.instagram.com/webfly_/?hl=en">Follow us on </a>  &nbsp;<RiInstagramLine/> 
                    </td>
                </tr>


                <tr>
                    <td>
                      Connect  on &nbsp; <RiTwitterLine/> 
                    </td>
                </tr>

            </table>
        </LEFT>

        <MIDDLE> 
           <table>
                <tr>
                    <td onClick={(e) => nav("About",0,0)}>
                     About us &nbsp; <RiAccountCircleLine/>
                    </td>
                </tr>

                <tr>
                    <td>
                    webfly policy  &nbsp;<RiCopyrightLine/> 
                    </td>
                </tr>

                <tr>
                    <td onClick={(e) => nav("Connect",0,0)}>
                     Connect  &nbsp;<RiTeamLine/> 
                    </td>
                </tr>

                <tr>
                    <td  onClick={(e) => nav("About",1200,1200)}>
                     Disclaimer  &nbsp;<RiSafeFill/> 
                    </td>
                </tr>

            </table>
        </MIDDLE>


        
        <RIGHT> 
            <table>
                <tr>
                    <td>
                    </td>
                </tr>
            </table>
        </RIGHT>

</Footers>
    )
}





const Footers = styled.div`
position: relative;
height: auto;
width: 100%;
background-image: linear-gradient(to top right,#1f505f, #07091C);
bottom: 0;
display: flex;
flex-wrap:wrap;
table{
padding-top:50px;
padding-bottom:50px;
}

`;





const LEFT = styled.div`
width: 35%;
height: 100%;


tr td{
margin: 10px;
font-weight:500;
font-family: "Poppins", sans-serif;
color: #f5f5f5;
display: flex;
justify-content:left;
align-items:center;
text-align:left;
a{
text-decoration:none;
font-family: "Poppins", sans-serif;
color: #f5f5f5;
}
}
@media(max-width:968px){
border-top:1px solid #fff;
margin-top:35px;
width: 90%;
}
`;


const MIDDLE = styled.div`
width: 30%;
height: 100%;



tr td{
margin: 10px;
font-weight:500;
font-family: "Poppins", sans-serif;
color: #f5f5f5;
display: flex;
justify-content:left;
align-items:center;
text-align:left;
}

@media(max-width:968px){
margin-top:35px;
width: 90%;
border-top:1px solid #fff;
}
`;


const RIGHT = styled.div`
width: 35%;
height: 100%;
@media(max-width:968px){
width: 100%;
}
`;

export default Footer;