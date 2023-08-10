import { useLoaderData, useNavigate } from "react-router-dom";
import { getVans } from "../../api";

export async function loader({ params }) {
  const van = await getVans(params.vanId);
  return { van };
}

export default function VanDetail() {
  const { van } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="van-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Back to list
      </button>

      <div className="van-detail">
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    </div>
  );
}
