import React, { Suspense } from "react";
import "./list.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import { MapPin } from "lucide-react";

const List = () => {
  const data = useLoaderData();
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city") || "";

  return (
    <div className="listPage">
      <div className="upperPart">
        {/* City Location */}
        <div className="cityLocation">
          <span>
            <MapPin color="#09aa57" size={19} style={{ marginTop: "3px" }} />
          </span>

          <span>{city || "Search Location"}</span>
        </div>
        {/* Sort */}
        <div className="sort">
          <select title="Sort by" name="sort_by" id="sort_by">
            <option value="">Sort by</option>
            <option value="new_to_old" selected="">
              Latest Post First
            </option>
            <option value="old_to_new">Oldest Post First</option>
            <option value="bigger_to_samller">Biggest Size First</option>
            <option value="smaller_to_bigger">Smallest Size First</option>
            <option value="high_to_low">Highest Price First</option>
            <option value="low_to_high">Lowest Price First</option>
          </select>
        </div>
      </div>

      <div className="listPageWrapper">
        <div className="mapContainer">
          <Filter />
        </div>

        <div className="listContainer">
          <div className="wrapper">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
