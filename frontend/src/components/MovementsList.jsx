import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from 'react-dotenv';
import { Loading } from './Loading';
import 'react-toastify/dist/ReactToastify.css';
import { MovementCard } from './MovementCard';

const MovementsList = ({ searchResults }) => {
  const [movements, setMovements] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('MovementsList called');
  const fetchMovements = async () => {
    console.log('fetch movements');
    try {
      setIsLoading(true);
      const response = await axios.get(`${env.BASE_BE_URL}/movements`);
      setMovements(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  useEffect(
    () => {
      fetchMovements();
    },
    [],
  );

  // useEffect(() => {
  //   console.log('movement list use effect');
  //   if (!searchResults) {
  //     fetchMovements();
  //   } else { setMovements(searchResults); }
  // }, [searchResults]);

  const renderCards = (items) => {
    console.log('rendercards called', items);
    return (items.map((item) => (
      <MovementCard
        name={item.name}
        thumbnail={item.thumbnailUrl}
        description={item.actionDescription}
        exerId={item.id}
      />
    )));
  };

  return (
    <div className="mx-8">
      {isLoading && <Loading />}
      {movements && renderCards(movements) }
    </div>
  );
};

export { MovementsList };
