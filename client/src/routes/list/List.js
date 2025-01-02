import React from 'react';
import './list.scss';
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import Map from '../../components/map/Map';
import { useLoaderData } from 'react-router-dom';

const List = () => {
    const data = useLoaderData();
    console.log(data);

    return (

        <div className='listPage'>

            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    <div className="card-wrapper">
                        {data?.map(item => (
                            <Card key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mapContainer">
                <Map items={data} />
            </div>
        </div>
    );
};

export default List;