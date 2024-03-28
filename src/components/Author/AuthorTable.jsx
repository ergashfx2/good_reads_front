import React from "react";
import { Calendar, Envelope, GeoAltFill } from "react-bootstrap-icons";

function AuthorTable({ date, address, email }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <div>
      <table className={"table mt-4"}>
        <tbody>
          <tr>
            <th>
              <Calendar className={"pb-1"} size={30} /> Joined date :
            </th>
            <td className={"text-start"}> {formatDate(date)}</td>
          </tr>
          <tr>
            <th>
              <Envelope className={"pb-1"} size={30} /> Contact :
            </th>
            <td className={"text-start"}>{email}</td>
          </tr>
          <tr>
            <th>
              <GeoAltFill className={"pb-1"} size={30} />
              Address :
            </th>
            <td className={"text-start"}>{address}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AuthorTable;
