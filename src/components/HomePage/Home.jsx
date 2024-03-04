import React from 'react';
import "./Home.css"
import Feeds from "../Feeds/Feeds";
import Recomendations from "../Recomendations/Recomendations";
import Collection from "../Collection/Collection";
function Home({books}) {
    return (
        <div>
            <Recomendations books={books}/>
            <Feeds books={books}/>
            <Collection/>
        </div>
    )
        ;
}

export default Home;