import styled from "styled-components";


const TwoTone = (props) =>{
    return(
            <Container>
                
            </Container>
    )
}

const Container = styled.div`
position: fixed;
margin-top:-75px;
width: 100%;
height: 70vh;
background-image: linear-gradient(to top right,#1f505f, #07091C);
clip-path: ellipse(75% 100% at 50% 0%);


@media(max-width:768px){
height: 70vh;  
clip-path: ellipse(90% 70% at 50% 0%);
}
`;

export default TwoTone;