import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = e => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="search_form"
          id="search_form"
          onChange={e => setName(e.target.value)}
          title="search form"
          placeholder=""
        ></input>
        <button className="primary" type="submit" title="search button">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
