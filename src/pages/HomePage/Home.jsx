import React, {useContext} from 'react';
import "./Home.css"
import Feeds from "../../components/Feeds/Feeds";
import Recomendations from "../../components/Recomendations/Recomendations";
import Collection from "../../components/Collection/Collection";
import {useLocation} from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
function Home(props) {
  const location = useLocation();
    const { state } = location;
    const { auth, logout } = useContext(AuthContext);

    return (
        <div className={"row"}>
            <div className={"col"}>
                <Recomendations books={props.books}/>
            </div>
            <div className={"col-6"}>
                <div>{auth ? (
                    <div>
                    <button className={"btn btn-primary"} onClick={logout}>Log out</button>
                    </div>
                ): null}</div>
                            {state && state.success_message && <div className={"alert alert-success"}>{state.success_message}</div>}
                            <Feeds books={props.books}/>
            </div>
            <div className={"col"}>
                            <Collection categories = {props.categories} />
            </div>
        </div>

    )
        ;
}

export default Home;