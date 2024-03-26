import React from 'react';
import RecmondationsItem from "./RecomendationsItem/RecmondationsItem";
import "../Recomendations/Recomendations.css"
function Recomendations({items}) {
    return (
        <div className={"recomendations-container d-none d-lg-block mt-3"}>
            {items && items.map(item => (
                <RecmondationsItem id={item.id} title={item.title} image={item.image}/>
            ))}
        </div>

    );
}

export default Recomendations;