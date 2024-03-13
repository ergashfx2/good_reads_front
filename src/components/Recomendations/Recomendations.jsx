import React from 'react';
import RecmondationsItem from "./RecomendationsItem/RecmondationsItem";
import "../Recomendations/Recomendations.css"
function Recomendations({books}) {
    console.log(books)
    return (
        <div className={"recomendations-container d-none d-lg-block mt-3"}>
            {books && books.map(item => (
                <RecmondationsItem key={item.title} title={item.title} image={item.image}/>
            ))}
        </div>

    );
}

export default Recomendations;