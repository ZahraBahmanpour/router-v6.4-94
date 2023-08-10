export async function getVans(vanId) {
  const url = vanId ? `/api/vans/${vanId}` : `/api/vans`;
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}
