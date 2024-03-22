import "./Home.css"
import Feeds from "../../components/Feeds/Feeds";
import Recomendations from "../../components/Recomendations/Recomendations";
import Collection from "../../components/Collection/Collection";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetBooksFeed} from "../../utils/utils";

function Home(props) {
    const location = useLocation();
    const {state} = location;
    const [feeds, setFeeds] = useState()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const GetFeed = async () => {
            const data = await GetBooksFeed()
            setFeeds(data.feeds)
            console.log(data)
            setLoading(false)
        }

        GetFeed()
    }, []);

    return (
        <div className="row">
            <div className="col">
                <Recomendations books={feeds}/>
            </div>
            <div className="col-6">
                {state && state.success_message && (
                    <div className="alert alert-success">{state.success_message}</div>
                )}
                {loading ? (
                    <div className="loading-indicator">Loading feeds...</div>
                ) : (
                    <Feeds books={feeds}/>
                )}
            </div>
            <div className="col">
                <Collection categories={props.categories}/>
            </div>
        </div>
    )
        ;
}

export default Home;