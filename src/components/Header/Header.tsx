import { Link } from "react-router-dom"
import Theme from "./Theme"
import { FiLogOut, FiHome } from "react-icons/fi"
import { CgProfile } from "react-icons/cg";
import { signOut } from "firebase/auth"
import { auth } from "../../firebase/firebase-config"
import "./header.css"
import { useAppSelector } from "../../app/hooks";
import { Mode } from "../../utils/interfaces";

interface NameProp {
    userName?:string;
}

export default function Header({userName}: NameProp){
    const theme:Mode["theme"] = useAppSelector(state => state.theme.value.theme)
    const mode: Mode["mode"] = useAppSelector(state => state.theme.value.isDarkMode)
    

    const logout = async () => {
        try{
            await signOut(auth)
        }catch(err){
            console.error(err)
        }   
    }
    return (
        <header className="header-container">
            <div>
                <h1>Welcome {userName} to OSS</h1>
            </div>

            <nav className="nav-container">
                <div className={`${mode? theme : "light-mode"}`}>

                    <Link to="/home" className="nav-link">
                        <FiHome className="icon"/>
                    </Link>

                    <Link to="/profile" className="nav-link">
                        <CgProfile className="icon" />
                    </Link>

                    <Link to={"/"} className="nav-link" onClick={logout}>
                        <FiLogOut className="icon"/>
                    </Link>

                </div>
                <div className="toggle-theme-div">
                    <Theme />
                </div>
            </nav>
        </header>
    )
}