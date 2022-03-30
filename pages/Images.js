import React from 'react'
import styled from 'styled-components'
import {CloudinaryContext, Image, Transformation} from 'cloudinary-react'
import  {MobileView, BrowserView}  from 'react-device-detect';

const Images = (props) => {

  return (
    <Container>

     <MobileView>
        <CloudinaryContext cloudName="otecdealings">
            <div>
            <Image alt={props.title}  publicId={props.cloud} width="100%"  height="100%">
                <Transformation  angle={props.exifData} />
            </Image>
            </div>
        </CloudinaryContext> 
    </MobileView>

    
    <BrowserView>
        <CloudinaryContext cloudName="otecdealings">
            <Image alt={props.title}  publicId={props.cloud} width="100%"  height="100%"/>
        </CloudinaryContext> 
    </BrowserView>


    </Container>
  )
}


const Container = styled.div`
img{
height: 400px;
width: 600px;
object-fit:cover;
}
`;


export default Images