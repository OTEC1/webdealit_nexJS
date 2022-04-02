import { useEffect } from "react";
import {useRouter} from 'next/router'

const Error = () => {
    const history = useRouter()
    useEffect(() => {
        history.push(window.location.href); 
    },[])

    return (  
        <div>

        </div>
    );
}
 
export default Error;