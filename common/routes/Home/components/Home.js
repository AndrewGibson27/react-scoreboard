import React from 'react';

import data from '../data';

const Home = (props) => (
  <div>
    <h2>About</h2>
    <p>
      This is an example react application (master-detail feed) with isomorphic rendering, async react-router routes, async redux reducers, async data fetching, and code-splitting.
    </p>
    <h2>Motivation</h2>
    <p>
      The file size of isomorphic React apps can quickly get out of hand. Many isomorphic starter kits look awesome to begin with but yield a several megabyte javascript
      file for the client to download. This project aims to demonstrate some possible solutions.
    </p>
    <h2>Under the Hood</h2>
    <ul>
      {data.map((item, i) => (
        <li key={i}>
          <h3><a href={item.link} target='_blank'>{item.resource}</a></h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default Home;
