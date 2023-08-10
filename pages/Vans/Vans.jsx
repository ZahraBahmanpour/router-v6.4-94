import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

export async function loader({ request }) {
  const url = new URL(request.url);
  const vans = await getVans(undefined, url.searchParams.get("type"));
  return { vans };
}

export default function Vans() {
  const { vans } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  function handleFilterChange(value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete("type");
      } else {
        prevParams.set("type", value);
      }
      return prevParams;
    });
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => handleFilterChange("simple")}
          className={`van-type simple 
                        ${typeFilter === "simple" ? "selected" : ""}`}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("luxury")}
          className={`van-type luxury 
                        ${typeFilter === "luxury" ? "selected" : ""}`}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("rugged")}
          className={`van-type rugged 
                        ${typeFilter === "rugged" ? "selected" : ""}`}
        >
          Rugged
        </button>

        {typeFilter ? (
          <button
            onClick={() => handleFilterChange(null)}
            className="van-type clear-filters"
          >
            Clear filter
          </button>
        ) : null}
      </div>
      <div className="van-list">
        {vans.map((van) => {
          return (
            <div key={van.id} className="van-tile">
              <Link to={van.id}>
                <img src={van.imageUrl} />
                <div className="van-info">
                  <h3>{van.name}</h3>
                  <p>
                    ${van.price}
                    <span>/day</span>
                  </p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
