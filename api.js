export async function getVans(vanId, searchParams) {
  const url = vanId
    ? `/api/vans/${vanId}`
    : searchParams
    ? `/api/vans?type=${searchParams}`
    : `/api/vans`;
  const res = await fetch(url);
  if (!res.ok) {
    console.log(res);
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}
