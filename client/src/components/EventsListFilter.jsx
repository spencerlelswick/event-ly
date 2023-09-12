import { Categories, initFilter } from '../utilities/category';
import { datePickerToday } from '../utilities/dates';

export default function EventsListFilter({ eventFilter, setEventFilter }) {
  function handleChange(e) {
    const updatedData = { ...eventFilter };
    if (e.target.type === 'date') {
      updatedData[e.target.name] = e.target.value;
    } else {
      updatedData[e.target.name] = e.target.checked;
    }
    setEventFilter(updatedData);
  }

  function handleClear(e) {
    e.preventDefault();
    const init = initFilter();
    const old = { ...eventFilter };
    let data = {};
    if (e.target.id === 'clearCat') {
      data = { ...init, minDate: old.minDate, maxDate: old.maxDate };
    }
    if (e.target.id === 'clearDate') {
      data = { ...old, minDate: init.minDate, maxDate: init.maxDate };
    }
    setEventFilter(data);
  }

  const filterCats = () => {
    const filterOpts = [];
    Categories.forEach((c, idx) => {
      filterOpts.push(
        <label
          key={idx}
          htmlFor={c}
          className={`h-auto btn btn-square w-16 ${
            eventFilter[c] === true
              ? 'btn-primary text-white border-0'
              : 'hover:grayscale-0 btn-secondary border-0 grayscale  '
          }`}
        >
          <div className='h-12 w-20 overflow-hidden relative'>
            <p className='text-[11px] absolute top-[2px] left-[3px] z-10 text-white'>
              {c}
            </p>
            <img
              src={`/assets/${idx + 1}.svg`}
              draggable={false}
              className='absolute top-0  hover:transform hover:scale-105 transition ease-linear'
            />
          </div>

          <input
            type='checkbox'
            checked={eventFilter[c]}
            onChange={handleChange}
            name={c}
            id={c}
            className={`hidden`}
          />
        </label>
      );
    });
    return filterOpts;
  };

  return (
    <div className='flex flex-col mt-16 sm:mt-2 mx-2'>
      <form>
        <div
          style={{ visibility: 'unset' }}
          className='sm:visible collapse bg-base-200'
        >
          <input type='checkbox' />
          <div className='collapse-title text-xl font-medium'>
            Filter by category
          </div>

          <div className='collapse-content'>
            <button
              id='clearCat'
              onClick={handleClear}
              className='btn btn-error btn-outline btn-xs mb-2'
            >
              clear
            </button>
            <div className='flex flex-wrap gap-2 justify-start  items-center'>
              {filterCats(eventFilter)}
            </div>
          </div>
        </div>
      </form>

      <form>
        <div
          style={{ visibility: 'unset' }}
          className='collapse bg-base-200 my-2'
        >
          <input type='checkbox' />
          <div className='collapse-title text-xl font-medium'>
            Filter by date
          </div>
          <div className='collapse-content'>
            <button
              id='clearDate'
              onClick={handleClear}
              className='btn btn-error btn-outline btn-xs'
            >
              clear dates
            </button>
            <div className='form-control w-full max-w-xs'>
              <label className='label' htmlFor='date'>
                <span className='label-text'>From:</span>
              </label>
              <input
                className='primary label-text input input-bordered w-full max-w-xs input-primary'
                type='date'
                value={eventFilter.minDate}
                onChange={handleChange}
                id='date'
                required
                name='minDate'
                min={datePickerToday()}
                max={eventFilter.maxDate}
              />
            </div>

            <div className='form-control w-full max-w-xs'>
              <label className='label' htmlFor='date'>
                <span className='label-text'>To:</span>
              </label>
              <input
                className='primary label-text input input-bordered w-full max-w-xs input-primary'
                type='date'
                value={eventFilter.maxDate}
                onChange={handleChange}
                id='date'
                required
                name='maxDate'
                min={eventFilter.minDate}
              />
            </div>
          </div>
        </div>
      </form>

      <div className='flex flex-wrap gap-2 justify-center'></div>
    </div>
  );
}
