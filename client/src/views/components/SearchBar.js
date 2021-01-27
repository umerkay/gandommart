import React, { useState, useEffect } from "react";

export default function SearchBar({ data, field, fields, onQuery }) {
  const [text, setText] = useState("");
  const [searchField, setField] = useState(field || fields[0]);
  useEffect(() => {
    if (text === "") return onQuery(data);
    let queried = data.filter((datum) => {
      console.log(datum[searchField], text, datum[searchField]?.search(text));

      return datum[searchField]?.toLowerCase().search(text.toLowerCase()) != -1;
    });
    onQuery(queried);
  }, [text]);
  return (
    <div>
      <select onInput={(e) => setField(e.target.value)}>
        {fields?.map((_field) => (
          <option value={_field}>{_field}</option>
        ))}
      </select>
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
