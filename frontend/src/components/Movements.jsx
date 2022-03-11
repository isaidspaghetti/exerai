/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from 'react-dotenv';
import Loading from './Loading';
import 'react-toastify/dist/ReactToastify.css';

function Movements() {
  const [movements, setMovements] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovements = async () => {
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

  useEffect(() => {
    fetchMovements();
  }, []);

  return (
    <div>
      {isLoading ? <Loading /> : null}
      {movements && movements.map((movement) => (
        <React.Fragment key={movement.id}>
          <div className="flex flex-col m-8 items-center bg-secondary-600 rounded-lg border
                          shadow-md md:flex-row md:max-w-full hover:bg-secondary-500 border-secondary-400
                          dark:border-secondary-400 dark:bg-secondary-500 dark:hover:bg-secondary-400"
          >
            <img
              className="object-cover w-full h-96 rounded-t-lg ml-4 md:h-auto md:w-48 md:rounded-lg"
              src={movement.thumbnailUrl}
              alt="Img coming soon"
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{movement.name}</h5>
              <p className="mb-3 font-normal whitespace-pre-line text-neutral-500 dark:text-neutral-500">
                {movement.actionDescription}
              </p>
              <p className="mb-3 font-light text-xs text-neutral-500">
                exerId:
                {movement.id}
              </p>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export { Movements };
