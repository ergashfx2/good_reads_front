import "./Home.css";
import Feeds from "../../components/Feeds/Feeds";
import Recomendations from "../../components/Recomendations/Recomendations";
import Collection from "../../components/Collection/Collection";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetItemsFeed} from "../../utils/utils";
import Search from "../../components/Search/Search";
import SearchNav from "../../components/Search/Search";

function Home(props) {
    const location = useLocation();
    const {state} = location;
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [newFeeds, setNewFeeds] = useState([])
    const [likes,setLikes] = useState([])
    useEffect(() => {
        setNewFeeds('')
        const getFeed = async () => {
            if (category) {
                const data = await GetItemsFeed(category);
                setNewFeeds(data.feeds)
                setLoading(false);
            } else {
                const data = await GetItemsFeed('none');
                setFeeds(data.feeds);
                setLikes(data.likes)
                setLoading(false);
            }

        };

        getFeed();
    }, [category]);
    return (
        <div>
            <div>
                {loading ? (
                    <div id="loading-test-4" className="full-page-loading">
                        <div className="loading">
                            <div className="spinner-grow loading-icon" role="status"></div>
                            <span className="loading-text"></span>
                        </div>
                    </div>
                ) : (
                    <div>

                        <SearchNav feeds={feeds} setNewFeeds={setNewFeeds}/>
                    <div className={'row'}>
                        <div className="col">
                            <Recomendations items={feeds}/>
                        </div>
                        <div className="col-6">
                            {state && state.success_message && (
                                <div className="alert alert-success">{state.success_message}</div>
                            )}
                            {newFeeds ? (
                                <Feeds items={newFeeds} likes={likes}/>
                            ) : (
                                <Feeds items={feeds} likes={likes}/>
                            )}
                        </div>
                        <div className="col">
                            <Collection setCategory={setCategory} categories={props.categories}/>
                        </div>
                    </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Home;
