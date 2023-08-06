export async function fetch(url, method, body) {
  const options = {
    method,
  };

  if (method !== "GET" && method !== "HEAD") {
    options.body = JSON.stringify(body);
  }

  options.headers = {
    "Content-Type": "application/json",
  };
  return await fetch(url, options).then((z) => z.json());
}
