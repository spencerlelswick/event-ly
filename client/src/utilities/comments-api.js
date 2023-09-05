const BASE_URL = import.meta.env.VITE_BASE_URL

export async function create(eId, data) {

  const URL = `${BASE_URL}/events/${eId}/comments`;

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(URL, config);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

export async function destroy(eId,cId) {
  const URL = `${BASE_URL}/events/${eId}/comments/${cId}`;
  const config = {
    method: "DELETE",
  };
  const res = await fetch(URL, config);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}