import "./CustomerMaxPriceFilter.css";

interface CustomerMaxPriceFilterProps{
    onSaveFilterValue:any;
    selected:any;
};

function CustomerMaxPriceFilter(props:CustomerMaxPriceFilterProps): JSX.Element {

    const selectedOptionHandler = (event:any)=>{
        props.onSaveFilterValue(event.target.value);
    };

    return (
        <div className="CustomerMaxPriceFilter">
             <span>Filter by Max Price</span> 
			 <div >
           
              <select className='FilterControl' value={props.selected} onChange={selectedOptionHandler}>
                  <option>ALL</option>
                  <option value={10}>10$</option>
                  <option value={35}>35$</option>
                  <option value={40}>40$</option>
                  <option value={50}>50$</option>
                  <option value={60}>60$</option>
                  <option value={80}>80$</option>
                  <option value={100}>100$</option>
                  <option value={200}>200$</option>
                  <option value={500}>500$</option>
               </select>
          </div>
        </div>
    );
};

export default CustomerMaxPriceFilter;