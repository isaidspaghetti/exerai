import React from 'react';

const MovementCard = ({
  name, thumbnail, description, exerId,
}) => (
  <div
    key={exerId}
    className="movement-card"
  >
      <img
        className="object-cover w-full h-96 rounded-t-lg ml-4 my-4 md:h-auto md:w-48 md:rounded-lg"
        src={thumbnail}
        alt="Img coming soon"
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{name}</h5>
        <p className="mb-3 font-normal whitespace-pre-line text-neutral-500 dark:text-neutral-500">
          {description}
        </p>
        <p className="mb-3 font-light text-xs text-neutral-500">
          exerId:
          {exerId}
        </p>
      </div>
  </div>
);

export { MovementCard };
