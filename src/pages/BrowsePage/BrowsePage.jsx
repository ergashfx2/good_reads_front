import React, {useEffect, useState} from 'react';
import "./BrowsePage.css"
import Browse from "../../components/Browse/Browse";
import {GetItemsFeed} from "../../utils/utils";

function BrowsePage(props) {
    const [feeds, setFeeds] = useState()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const GetFeed = async () => {
            const data = await GetItemsFeed()
            setFeeds(data.feeds)
            console.log(data)
            setLoading(false)
        }

        GetFeed()
    }, []);
    return (
        <div className={'container'}>
            {loading ? (
                <div id="loading-test-4" className="full-page-loading">
                    <div className="loading">
                        <div className="spinner-grow loading-icon" role="status"></div>
                        <span className="loading-text"></span>
                    </div>
                </div>
            ) : (
                <Browse items={feeds}/>
            )}
        </div>
    );
}

export default BrowsePage;