import { useNavigate } from "react-router-dom";

import s from "./NotFound.module.css";
import { ReactComponent as Logo } from "../../assets/404.svg";

const NotFound = () => {
    const navigator = useNavigate();

    return (
        <div className={ s.container }>
            <div className={ s.section }>
                <div className={ s.logo }><Logo /></div>
                <h1>404 - PAGE NOT FOUND</h1>
                <p>The page for you looking for migth have been removed
                    had its name changed or is temporerily unavaible.</p>
                <button onClick={ () => navigator('/') } className={ s.homeBtn }>GO TO HOMEPAGE</button>
            </div>
        </div>  
    )
}

export default NotFound;