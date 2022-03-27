import styled  from "styled-components";
import {RiShoppingBag2Fill, RiNavigationLine, RiMenu3Line} from 'react-icons/ri'
import { connect } from "react-redux";
import { useState } from "react";






const Ad = (props) => {

    const history = "";

    const cartView =()=> {
        history("/cart")
    }

  

    return(
        <>
          <Container>
                  
          </Container>
        </>
    )
}



const Container = styled.div`
height: 0vh;
width: 100%;
margin:auto;
top:0;
left: 0;
position:  fixed;
z-index: 0;
`;


const mapStateToProps = (state) => {
    return{
        user:state.userState.user,
    };
};

const mapDispatchToProps = dispatch => ({});


export default connect(mapStateToProps,mapDispatchToProps)(Ad);