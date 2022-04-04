import React from 'react'
import styled from 'styled-components'
import { BiDisc, BiTime, BiUser } from 'react-icons/bi'
import {RiAlbumLine, RiContactsBook2Line, RiDownload2Line, RiDownloadCloudLine, RiHeadphoneLine, RiMenu2Line, RiPlayLine, RiPlayList2Line, RiShareLine, RiSortDesc, RiSpeaker2Line, RiUpload2Line} from 'react-icons/ri'


const  Sidebar = ()  => {
  return (
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

    </Container>
  )
}



const Container = styled.div`
width:20%;
height:100vh;
@media(max-width:968px){
display: none;
}
`;

const SideNav = styled.div`
width:90%;
height: 100vh;
background:#f2f5fc;
margin-top:137px;
padding-left:18px;

@media(max-width:968px){
display: none;
}
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



const SubContainer = styled.div`
margin-top:15px;
color: #b8b9be; 
font-size:10pt;
`;



export default Sidebar