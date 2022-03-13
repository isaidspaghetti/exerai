import React from 'react';
import {
  FaPlus, FaPencilAlt, FaMinus, FaWalking,
} from 'react-icons/fa';

const SideBar = ({ showAll, toggleModal }) => (
    <div className="flex sticky top-0 left-0 h-screen w-16 flex-col
                bg-primary-500 text-neutral shadow-lg"
    >
       <SideBarIcon
         icon={<FaWalking size="28" />}
         text="View all movements 💡"
         action={() => { console.log('clicked'); showAll(); }}
       />
      {/* <SideBarIcon
        icon={<FaPencilAlt size="28" />}
        text="Edit a movement 💡"
        url="/edit"
      /> */}
      <SideBarIcon
        icon={<FaPencilAlt size="28" />}
        text="Add a movement 💡"
        action={() => { toggleModal(); }}
      />
      {/* <SideBarIcon
        icon={<FaMinus size="28" />}
        text="Delete a movement 💡"
        url="remove"
      /> */}
    </div>
);

const SideBarIcon = ({ icon, text = 'tooltip 💡', action }) => (
  <button type="button" className="sidebar-icon group" onClick={() => action()}>
    {icon}
    <span className="sidebar-tooltip scale-0 group-hover:scale-100">
    {/* used group-hover for show/hide tooltip  here instead of in @apply because it doesn't work yet with tailwind */}
      {text}
    </span>
  </button>
);

export { SideBar };
