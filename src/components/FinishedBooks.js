const FinishedBooks = ({ finishedBook }) => {

    
  return (
    <div>
      {finishedBook && finishedBook.map((item) => {
        return <p>{item.bookTitle}</p>;
      })}
    </div>
  );
};

export default FinishedBooks;
