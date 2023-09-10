import { Categories, initFilter } from '../utilities/category';


export default function EventsListFilter({ eventFilter, setEventFilter }) {
    function handleChange(e) {
        const updatedData = { ...eventFilter };
        if(e.target.type === "date"){
            updatedData[e.target.name] = e.target.value
        }else{
            updatedData[e.target.name] = e.target.checked
        }
        setEventFilter(updatedData);
    }
    
    function handleClear(e) {
        e.preventDefault()
        const init = initFilter()
        const old = {...eventFilter}
        let data={}
        if(e.target.id === "clearAll"){
            data = {...init}
        }
        if(e.target.id === "clearCat"){
            data = {...init, minDate: old.minDate, maxDate: old.maxDate}
        }
        if(e.target.id === "clearDate"){
            data = {...old, minDate: init.minDate, maxDate: init.maxDate}
        }
        setEventFilter(data)
    }

    const filterCats = () => {
        const filterOpts = [];
        Categories.forEach((c, idx) => {
            filterOpts.push(
                <label
                    key={idx}
                    htmlFor={c}
                    className={`h-auto btn btn-square ${eventFilter[c] === true ? 'btn-primary text-white' : ''
                        }`}
                >
                    <p className='text-xs'>{c}</p>
                    <div className='h-5 w-20 overflow-hidden'>
                        <img
                            src={`/assets/${idx + 1}.svg`}
                            className='relative object-fill'
                        />
                    </div>
                    <input
                        type='checkbox'
                        value={idx + 1}
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
        <div className='flex justify-between m-2'>

            <form >
                <h2>Filter by categories</h2>
                <button id="clearCat" onClick={handleClear} className='btn btn-primary btn-xs btn-outline'>
                    clear categories
                </button>
                <div>
                    {filterCats(eventFilter)}
                </div>
            </form>

            <form >
                <h2>Filter by dates</h2>
                <button id="clearDate" onClick={handleClear} className='btn btn-primary btn-xs btn-outline'>
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
                        min={new Date().toISOString().slice(0, -14)}
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

            </form>

            <form>
                <button id="clearAll" onClick={handleClear} className='btn btn-primary btn-xs btn-outline'>
                        clear all
                </button>
            </form>

        </div>
    )
};

