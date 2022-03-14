import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loading } from './Loading';
import { MovementCard } from './MovementCard';

const ContentContainer = ({ searchResults, triggerModal }) => {
  const [movements, setMovements] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('contentcontainer called');
  const fetchMovements = async () => {
    console.log('fetch movements');
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.BASE_BE_URL}/movements`);
      setMovements(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    if (searchResults) {
      setMovements(searchResults);
    } else { fetchMovements(); }
  }, [searchResults]);

  const renderCards = (items) => {
    console.log('rendercards called', items);

    return (items.map((item) => (
      <MovementCard
        name={item.name}
        thumbnail={item.thumbnailUrl}
        description={item.actionDescription}
        exerId={item.exerId}
        movementId={item.id}
        triggerModal={(type, id) => triggerModal(type, id)}
      />
    )));
  };

  return (
    <div>
      {isLoading && <Loading />}
      {/* if search results exist, render those */}
      {searchResults ? renderCards(searchResults) : movements && renderCards(movements) }
    </div>
  );
};

export { ContentContainer };
