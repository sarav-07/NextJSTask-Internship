async function getData() {
   const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  ).then((res) => res.json());

  return response
}

export default async function getContent() {
    const data= await getData()
    return data
}
