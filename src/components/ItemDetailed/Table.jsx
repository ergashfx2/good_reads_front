import React from "react";

function Table({ item }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Published</th>
            <td>{formatDate(item.created_time)}</td>
          </tr>
          <tr>
            <th scope="row">Published By</th>
            <td>{item.author_name}</td>
          </tr>
          <tr>
            <th scope="row">Related tags</th>
            <td>
              {item.tags.map((tag, index) => (
                <button key={index} className={"btn mx-1 btn-secondary"}>
                  {tag}
                </button>
              ))}
            </td>
          </tr>
          <tr>
            <th scope="row">Category</th>
            <td>{item.category}</td>
          </tr>
          {item.custom_field && item.custom_field.length > 0
            ? Object.entries(JSON.parse(item.custom_field)).map(
                ([key, value], index) => (
                  <tr key={index}>
                    <th scope="row">{key}</th>
                    <td>{value}</td>
                  </tr>
                )
              )
            : null}

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
