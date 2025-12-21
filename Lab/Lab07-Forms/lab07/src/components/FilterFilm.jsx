import { NavItem, NavLink } from "react-bootstrap";

function FilterFilm(props) {

    const { items, selected, setFilter } = props;

    //convertire l'oggeto in un array per usarlo nel map
     const filter = Object.entries(items);
    return (

        <ul className="nav nav-pills flex-column gap-2 mb-auto">
            {filter.map(([filterName, { label }]) => {
                return (
                    <NavItem key={filterName}>
                        <NavLink
                            href={"#"+filterName}
                            onClick={() => setFilter(filterName)}
                            className={filterName === selected ? "" : "link-dark"} 
                            active={filterName === selected}
                        >
                            {label}
                        </NavLink>
                        
                        </NavItem>


                );

            })}

        </ul>


    );
}
export default FilterFilm;