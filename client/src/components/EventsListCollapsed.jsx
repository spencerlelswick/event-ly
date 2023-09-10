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
      className='z-[1] sm:invisible absolute btn btn-secondary text-white text-4xl right-10 top-28 h-20 w-20 rounded-full flex justify-center items-center'
      onClick={toggleList}
    >
      <FaListOl />
    </div>
  );
}
