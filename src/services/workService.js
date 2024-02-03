export const fetchWork = async (workId) => {
  const res = await fetch(`https://openlibrary.org/works/${workId}.json`);
  const data = await res.json();
  return data;
};
