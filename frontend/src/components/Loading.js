import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return(
    <div className='flex flex-col items-center justify-center w-full h-screen opacity-90 fill-tiffany-500'>
      <FaSpinner className='loading-spinner' size="100"/>
      <span className="my-10 text-tiffany-600">Loading...</span>
    </div>
  )
}

export default Loading;
