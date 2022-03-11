import { FaPlus, FaPencilAlt, FaMinus, FaWalking } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const SideBar = () => {
  return (
    <div className="flex sticky top-0 left-0 h-screen w-16 flex-col 
                bg-primary-500 text-neutral shadow-lg">
       <SideBarIcon 
        icon={<FaWalking size="28" />} 
        text='View all movements 💡'  
        url='/'
      />
      <SideBarIcon 
        icon={<FaPencilAlt size="28" />} 
        text='Edit a movement 💡' 
        url='/edit'
      />
      <SideBarIcon 
        icon={<FaPlus size="28" />} 
        text='Add a movement 💡'  
        url='/add'
      />
      <SideBarIcon 
        icon={<FaMinus size="28" />} 
        text='Delete a movement 💡'
        url='remove'
      /> 
    </div>
  )
};

const SideBarIcon = ({ icon, text = 'tooltip 💡' , url}) => (
  <div className="sidebar-icon group">
    <Link to={url}>
      {icon}
    </Link>
    <span className="sidebar-tooltip scale-0 group-hover:scale-100"> 
    {/* used group-hover for show/hide tooltip  here instead of in @apply because it doesn't work yet with tailwind */}
      {text}
    </span>
  </div>
);

export default SideBar
