import React from 'react';
import { listData } from './../../lib/dummy';
import './list.scss';
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';

const List = () => {

    const data = listData;

    // console.log(data);

    return (

        <div className='listPage'>

            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    <div className="card-wrapper">
                        {data.map(item => (
                            <Card key={item.id} item={item} />
                        ))}
                    </div>



                </div>

            </div>





            <div className="mapContainer">
                <h3>Map</h3>
            </div>
        </div>
    );
};

export default List;