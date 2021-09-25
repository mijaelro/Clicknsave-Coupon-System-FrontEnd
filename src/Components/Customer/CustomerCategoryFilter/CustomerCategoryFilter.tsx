import "./CustomerCategoryFilter.css";

interface CustomerCategoryFilterProps{
    onSaveFilterValue:any;
    selected:any;
};

function CustomerCategoryFilter(props:CustomerCategoryFilterProps): JSX.Element {

    const selectedOptionHandler = (event:any)=>{
        props.onSaveFilterValue(event.target.value);
    };

    return (
        <div className="CustomerCategoryFilter">
             <span>Filter by Category</span> 
			 <div>
           
              <select className='FilterControl' value={props.selected} onChange={selectedOptionHandler}>
                  <option>ALL</option>
                  <option value='FOOD'>FOOD</option>
                  <option value='ELECTRONICS'>ELECTRONICS</option>
                  <option value='RESTAURANT'>RESTAURANT</option>
                  <option value='VACATION'>VACATION</option>
                  <option value='LIFE_STYLE'>LIFE_STYLE</option>
               </select>
          </div>
        </div>
    );
};

export default CustomerCategoryFilter;