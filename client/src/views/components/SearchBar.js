import React, { useState, useEffect } from "react";

export default function SearchBar({ data, field, onQuery }) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (text === "") return onQuery(data);
    let queried = data.filter((datum) => {
      console.log(datum[field], text, datum[field].search(text));

      return datum[field].toLowerCase().search(text.toLowerCase()) != -1;
    });
    onQuery(queried);
  }, [text]);
  return (
    <div>
      <input
        style={{
          width: "100%",
          padding: "0.5rem 1rem",
        }}
        placeholder="Search"
        type="text"
        value={text}
        onInput={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
}
