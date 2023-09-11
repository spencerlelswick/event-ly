import { FaListOl } from 'react-icons/fa';

export default function EventsListCollapsed({
  setIsShowListView,
  isShowListView,
}) {
  const toggleList = () => {
    setIsShowListView(!isShowListView);
  };

  return (
    <div
      className='z-[1] sm:invisible absolute btn btn-secondary text-white text-3xl right-2 top-24 h-16 w-16 rounded-full flex justify-center items-center'
      onClick={toggleList}
    >
      <FaListOl />
    </div>
  );
}
