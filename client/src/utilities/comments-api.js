const BASE_URL = import.meta.env.VITE_BASE_URL

export async function create(id, data) {

    const URL = `${BASE_URL}/events/${id}/comments`;
  
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    const res = await fetch(URL, config);
  
    console.log("update response", res);
  
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Invalid Request");
    }
  }