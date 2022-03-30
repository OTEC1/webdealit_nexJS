import {useEffect} from 'react'
import styled from 'styled-components'
import {useRouter} from 'next/router'

const Error = () => {
    const history = useRouter();
    useEffect(() => {
        history.push(window.location.href);
    },[])
    return (  
        <Container>

        </Container>
    );
}


const Container = styled.div`


`;
 
export default Error;