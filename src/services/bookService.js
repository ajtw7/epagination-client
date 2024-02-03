export const fetchBook = async (bookId) => {
  const res = await fetch(
    `https://openlibrary.org/api/books?bibkeys=OLID:${bookId}&jscmd=data&format=json`
  );
  const data = await res.json();
  return Object.values(data)[0];
};
