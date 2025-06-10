import React, { Suspense } from 'react';
import './list.scss';
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import Map from '../../components/map/Map';
import { Await, useLoaderData } from 'react-router-dom';
import FilterPopup from '../../components/filterPopup/FilterPopup';
import { MapPin } from 'lucide-react';

const List = () => {

    const data = useLoaderData();
    // console.log(data);

    return (
        <div className='listPage'>

            <div className="upperPart">
                <div className="cityLocation">
                    <span>
                        <MapPin color="#09aa57" size={19} style={{ marginTop: "3px" }} />
                    </span>
                    <span>Dhaka</span>
                </div>
                <div className="sort">
                    <select title="Sort by" name="sort_by" id="sort_by">
                        <option value="">Sort by</option>
                        <option value="new_to_old" selected="">Latest Post First</option>
                        <option value="old_to_new">Oldest Post First</option>
                        <option value="bigger_to_samller">Biggest Size First</option>
                        <option value="smaller_to_bigger">Smallest Size First</option>
                        <option value="high_to_low">Highest Price First</option>
                        <option value="low_to_high">Lowest Price First</option>
                    </select>
                </div>
            </div>



            <div className='listPageWrapper'>

                <div className="mapContainer">
                    {/* MAP CODE START */}
                    {/* <Map items={data} /> */}

                    {/* <Suspense fallback={<p>Loading...</p>}>
                    <Await
                        resolve={data?.postResponse}
                        errorElement={<p>Error loading posts!</p>}
                    >
                        {(postResponse) => <Map items={postResponse?.data} />}
                    </Await>
                </Suspense> */}
                    {/* MAP CODE END */}

                    <Filter />



                </div>

                <div className="listContainer">
                    <div className="wrapper">
                        {/* <Filter /> */}

                        {/* <FilterPopup /> */}

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


            </div>
        </div>
    );
};

export default List;