import { Categories, initFilter } from '../utilities/category';
import { useState } from 'react';



export default function EventsListFilter({ eventFilter, setEventFilter }) {

    const [dateFilter, setDateFilter] = useState({
        minDate: eventFilter.minDate,
        maxDate: eventFilter.maxDate
    })

    function handleDateChange(e){
        const newDates={...dateFilter}
        newDates[e.target.name]=e.target.value
        setDateFilter(newDates)
        console.log(newDates)
    }

    function handleDateSubmit(e){
        e.preventDefault()
        const data = {
            ...eventFilter,
            ...dateFilter
        }
        setEventFilter(data)
    }

    function handleDateClear(e){
        e.preventDefault()
        const init = initFilter()
        const initDate={
            minDate: init.minDate,
            maxDate: init.maxDate
        }
        setDateFilter(initDate)
        const data = {...eventFilter, ...initDate}
        setEventFilter(data)
    }

    function handleChange(e) {
        const updatedData = { ...eventFilter };
        updatedData[e.target.name] = e.target.checked;
        setEventFilter(updatedData);
    }

    function handleClear(e) {
        e.preventDefault()
        const init = initFilter()
        setEventFilter(init)
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
            <form onChange={handleChange}>
                <h2>Filter by categories</h2>
                <button onClick={handleClear} className='btn btn-primary btn-xs btn-outline'>
                    clear categories
                </button>
                <div>
                    {filterCats(eventFilter)}
                </div>
            </form>

            <form onChange={handleDateChange} onSubmit={handleDateSubmit}>
                <h2>Filter by dates</h2>
                <button onClick={handleDateClear} className='btn btn-primary btn-xs btn-outline'>
                    clear dates
                </button>
                <div className='form-control w-full max-w-xs'>
                    <label className='label' htmlFor='date'>
                        <span className='label-text'>From:</span>
                    </label>
                    <input
                        className='primary label-text input input-bordered w-full max-w-xs input-primary'
                        type='date'
                        value={dateFilter.minDate}
                        onChange={handleDateChange}
                        id='date'
                        required
                        name='minDate'
                        min={new Date().toISOString().slice(0, -14)}
                        max={dateFilter.maxDate}
                    />
                </div>

                <div className='form-control w-full max-w-xs'>
                    <label className='label' htmlFor='date'>
                        <span className='label-text'>To:</span>
                    </label>
                    <input
                        className='primary label-text input input-bordered w-full max-w-xs input-primary'
                        type='date'
                        value={dateFilter.maxDate}
                        onChange={handleDateChange}
                        id='date'
                        required
                        name='maxDate'
                        min={dateFilter.minDate}
                    />
                </div>

                <button className="btn btn-primary btn-sm">
                    Filter Date
                </button >

            </form>
        </div>
    )

};

