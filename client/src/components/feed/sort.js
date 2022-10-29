import React, {useState} from "react";
import './sort.css';
import {Link} from 'react-router-dom';
import {Users} from "../data";

function Sort({post}) {


    return (
        <div className="all">
        <div>
            <div className="create">
             <Link to="/write">
                <button className="createText"> + </button>
             </Link>
            </div>
        </div>
        <div className="Sort">
                 <label>Sort By</label>
            <div>
                <button className="sortText">Most Like</button>
                <button className="sortText">Most Recent</button>
            </div>
        </div>
        </div>
    );

}

export default Sort;
