import "../Collection/Collections.css"
import CollectionItem from "./CollectionItem/CollectionItem";
function Collection({categories,setCategory}) {

    return (
        <div className={"d-none d-lg-block card mt-3 "}>
            <div>
                {categories.map((category, index) => (
                    <CollectionItem setCategory={setCategory} key={index} category={category}/>
                ))}
            </div>
        </div>
    );
}


export default Collection;