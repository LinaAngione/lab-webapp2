import {NavItem, NavLink} from "react-bootstrap";

function FilterFilm(props) {
    return (
        <div className="collapse col-md-3 bg-light d-md-block">
            <div className="py-4">
                <ul className="nav nav-pills flex-column gap-2 mb-auto">
                 <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">All</a></li>
                <li className="nav-item"><a href="#favorites" className="nav-link link-dark">Favorites</a></li>
                <li className="nav-item"><a href="#best" className="nav-link link-dark">Best Rated</a></li>
                <li className="nav-item"><a href="#lastSeen" className="nav-link link-dark">Seen Last Month</a></li>
                <li className="nav-item"><a href="#unseen" className="nav-link link-dark">Unseen</a></li>
   
                </ul>

            </div>
            
        </div>
    );
}
export default FilterFilm;