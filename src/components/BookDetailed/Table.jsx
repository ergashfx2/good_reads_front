import React from 'react';

function Table({book}) {
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return date.toLocaleDateString('en-US', options);
    }

    return (
        <div>
            <table className="table">
                <tbody>
                <tr>
                    <th scope="row">Published</th>
                    <td>{formatDate(book.created_time)}</td>
                </tr>
                <tr>
                    <th scope="row">Author</th>
                    <td>{book.name}</td>
                </tr>
                <tr>
                    <th scope="row">Related tags</th>
                    <td>{book.tags.map((tag, index) => (<button key={index} className={"btn mx-1 btn-secondary"}>{tag}</button>))}</td>
                </tr>
                <tr>
                    <th scope="row">Category</th>
                    <td>{book.category}</td>
                </tr>
                <tr>
                    <th scope="row">Language</th>
                    <td>English</td>
                </tr>
                </tbody>
            </table>

        </div>
    );
}

export default Table;