import styled from "styled-components"
import Loader from "react-loader-spinner"


const Load =  (props) => {


    return(
        <Container>
            <div>
                <Loader
                    type="Oval"
                    color="#fff"
                    height={100}
                    width={100}
                />
            </div>
       
        </Container>
       
    )
}



const Container = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content:center;
align-items:center;
text-align:center;

`;


export default Load