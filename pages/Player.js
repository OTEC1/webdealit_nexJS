import React from 'react';
import styled from "styled-components";
import Header from './Header';
import Ad from './Ad'
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';


const Player =  (props) => {

    const {url} = useParams();
    return (
            <Container>
              <Header/>
              <Ad/>
                  <div id='upspace'>

                  </div>
                   <br/><br/><br/>
                    <Play>
                      <div className="player-wrapper">
                          <ReactPlayer
                          url={process.env.REACT_APP_APP_S3_STREAM_VIDEO_BUCKET+url}
                          className="react-player"
                          playing
                          width="100%"
                          height="100%"
                          controls={true}
                          />
                    </div>
                    </Play>
            </Container>
    )
}


const Container = styled.div`
width: 80%;
margin-left:auto;
margin-right:auto;


#upspace{
margin-top:150px;
width: 100%;
height: 100px;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.player-wrapper {
  position: relative;
  padding-top: 56.25%; 
}

.react-player {
  position: absolute;
  top: 0;
  left: 0;
}


@media(max-width:768px){
width: 100%;
}

`;


const Play = styled.div`
width:70%;
height: 100vh;

@media(max-width:768px){
width: 100%;
}
`;



export default Player;