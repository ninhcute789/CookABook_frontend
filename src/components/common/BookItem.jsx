

const BookItem = () => {
    
  const { book, setBook } = useState(
    {
        title: "",
        

    }
  );
    return (
        <>
            <div className="book-item">
                <div className="book-item__img">
                    <img src="" alt="book" />
                </div>
                <div className="book-item__info">
                    <h3 className="book-item__title">Title</h3>
                    <p className="book-item__author">Author</p>
                    <p className="book-item__price">Price</p>
                </div>
            </div >
        </>
    )
}

export default BookItem;