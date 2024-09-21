import React from 'react';
import { listData } from './../../lib/dummy';
import './list.scss';
import Filter from '../../components/filter/Filter';

const List = () => {

    const data = listData;



    return (

        <div className='listPage'>
            <div className="listContainer">
                <Filter />
            </div>
            <div className="mapContainer">
                <h3>Map</h3>
            </div>
        </div>
    );
};

export default List;