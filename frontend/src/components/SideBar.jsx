import React from 'react';
import { FaPencilAlt, FaWalking } from 'react-icons/fa';

const SideBar = ({ showAll, triggerModal }) => (
  <div
    className="flex sticky top-0 left-0 h-screen w-16 flex-col
                bg-primary-500 text-neutral shadow-lg"
  >
    <SideBarIcon
      icon={<FaWalking size="28" />}
      text="View all movements 💡"
      action={() => {
        showAll();
      }}
    />
    <SideBarIcon
      icon={<FaPencilAlt size="28" />}
      text="Add a movement 💡"
      action={() => {
        triggerModal();
      }}
    />
  </div>
);

const SideBarIcon = ({ icon, text = 'tooltip 💡', action }) => (
  <button type="button" className="button-icon group" onClick={() => action()}>
    {icon}
    <span className="sidebar-tooltip scale-0 group-hover:scale-100">
      {/* used group-hover for show/hide tooltip  here instead of in @apply because it doesn't work yet with tailwind */}
      {text}
    </span>
  </button>
);

export { SideBar };
