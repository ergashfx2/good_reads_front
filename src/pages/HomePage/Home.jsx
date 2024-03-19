import "./Home.css"
import Feeds from "../../components/Feeds/Feeds";
import Recomendations from "../../components/Recomendations/Recomendations";
import Collection from "../../components/Collection/Collection";
import {useLocation} from "react-router-dom";
import feeds from "../../components/Feeds/Feeds";
function Home(props) {
  const location = useLocation();
    const { state } = location;

    return (
        <div className={"row"}>
            <div className={"col"}>
                <Recomendations books={props.feeds}/>
            </div>
            <div className={"col-6"}>
                            {state && state.success_message && <div className={"alert alert-success"}>{state.success_message}</div>}
                            <Feeds books={props.feeds}/>
            </div>
            <div className={"col"}>
                            <Collection categories = {props.categories} />
            </div>
        </div>

    )
        ;
}

export default Home;