import React from 'react';
import Loading from './Loading';

const ContentContainer = ({ isLoading, movements})=> {
  console.log("container", movements)
  if (!isLoading) {
    return (
      <div>
        <h1>Movements</h1>
      </div>
    )
  };

  return(
    <Loading />
  )
}

export default ContentContainer;