import React, { Suspense } from 'react';
import './list.scss';
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import Map from '../../components/map/Map';
import { Await, useLoaderData } from 'react-router-dom';

const List = () => {

    const data = useLoaderData();
    // console.log(data);

    return (
        <div className='listPage'>

            <div className="listContainer">
                <div className="wrapper">
                    <Filter />

                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data?.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                        >
                            {(postResponse) =>
                                postResponse?.data.map((post) => (
                                    <Card key={post.id} item={post} />
                                ))
                            }
                        </Await>
                    </Suspense>


                    {/* <div className="card-wrapper">
                        {data?.map(item => (
                            <Card key={item.id} item={item} />
                        ))}
                    </div> */}



                </div>
            </div>

            <div className="mapContainer">
                {/* <Map items={data} /> */}

                <Suspense fallback={<p>Loading...</p>}>
                    <Await
                        resolve={data?.postResponse}
                        errorElement={<p>Error loading posts!</p>}
                    >
                        {(postResponse) => <Map items={postResponse?.data} />}
                    </Await>
                </Suspense>

            </div>
        </div>
    );
};

export default List;