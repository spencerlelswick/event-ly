import { Categories, initFilter } from '../utilities/category';


export default function EventsListFilter({ eventFilter, setEventFilter }) {

    const handleChange = (e) => {
        const updatedData = { ...eventFilter };
        updatedData[e.target.name] = e.target.checked;
        setEventFilter(updatedData);
    };

    function handleClear(e){
        e.preventDefault()
        setEventFilter(initFilter())
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
                <h2>Filter by category</h2>
                <button onClick={handleClear} className='btn btn-primary btn-xs btn-outline'>
                    clear filters
                </button>
                <div>
                    {filterCats(eventFilter)}
                </div>
            </form>
        </div>
    )

};

