import { FaPlus, FaPencilAlt, FaMinus, FaWalking } from 'react-icons/fa';

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col 
                bg-primary-500 text-neutral shadow-lg">
       <SideBarIcon 
        icon={<FaWalking size="28" />} 
        text='View all movements 💡'  
      />
      <SideBarIcon 
        icon={<FaPencilAlt size="28" />} 
        text='Edit a movement 💡'  
      />
      <SideBarIcon 
        icon={<FaPlus size="28" />} 
        text='Add a movement 💡'  
      />
      <SideBarIcon 
        icon={<FaMinus size="28" />} 
        text='Delete a movement 💡'  
      /> 
    </div>
  )
};

const SideBarIcon = ({ icon, text = 'tooltip 💡' }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip scale-0 group-hover:scale-100"> 
    {/* used group-hover for show/hide tooltip  here instead of in @apply because it doesn't work yet with tailwind */}
      {text}
    </span>
  </div>
);

export default SideBar
