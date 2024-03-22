import "./Home.css"
import Feeds from "../../components/Feeds/Feeds";
import Recomendations from "../../components/Recomendations/Recomendations";
import Collection from "../../components/Collection/Collection";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {GetBooksFeed} from "../../utils/utils";
import BrowsePage from "../BrowsePage/BrowsePage";

function Home(props) {
    const location = useLocation();
    const {state} = location;
    const [feeds, setFeeds] = useState()
    const [loading, setLoading] = useState(true);
    const [category,setCategory] = useState()
    useEffect(() => {
        const GetFeed = async () => {
            const data = await GetBooksFeed()
            setFeeds(data.feeds)
            console.log(data)
            setLoading(false)
        }

        GetFeed()
    }, []);
    const handleFilter = async (category) => {
        alert(category)
    }

    if(category){
        handleFilter(category)
    }

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
                    <div className={'row'}>
                        <div className="col">
                            <Recomendations books={feeds}/>
                        </div>
                        <div className="col-6">
                            {state && state.success_message && (
                                <div className="alert alert-success">{state.success_message}</div>
                            )}
                            <Feeds books={feeds}/>
                        </div>
                        <div className="col">
                            <Collection setCategory={setCategory} categories={props.categories}/>
                        </div>
                        <BrowsePage books={feeds}/>
                    </div>

                )}
            </div>

        </div>
    )
        ;
}

export default Home;