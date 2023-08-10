import { Link, useLoaderData } from "react-router-dom";
import { getVans } from "../../api";

export async function loader() {
  const vans = await getVans();
  return { vans };
}

export default function Vans() {
  const { vans } = useLoaderData();
  console.log(vans);
  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
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
