import React from 'react';
import {
  FaPencilAlt, FaTrash,
} from 'react-icons/fa';
import { ModalTypes } from '../constants/constants';

const CardIcon = ({ icon, text = 'tooltip 💡', action }) => (
    <button type="button" className="button-icon mt-auto group right-14 left-0" onClick={() => action()}>
      {icon}
      <span className="sidebar-tooltip scale-0 group-hover:scale-100 origin-top -left-10 bottom-10 ">
        {text}
      </span>
    </button>
);

const MovementCard = ({
  name, thumbnail, description, exerId, triggerModal, movementId,
}) => (
  <div
    key={exerId}
    className="movement-card"
  >
    {/* TODO: itemized fetch for movement images */}
      <img
        className="object-cover w-full h-96 rounded-t-lg ml-4 my-4 md:h-auto md:w-48 md:rounded-lg"
        src={thumbnail}
        // TODO: add img loading spinner
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
      <div className="ml-auto mt-auto mr-4 flex flex-col">
        <CardIcon
          icon={<FaPencilAlt size="18" />}
          text="Edit movement 💡"
          action={() => { triggerModal(ModalTypes.UPDATE, movementId); }}
        />
        <CardIcon
          icon={<FaTrash size="18" />}
          text="Delete movement 💡"
          action={() => { triggerModal(ModalTypes.DESTROY, movementId); }}
        />
      </div>
  </div>
);

export { MovementCard };
