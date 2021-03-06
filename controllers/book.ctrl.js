const Book = require('../models/book.model');
const Review = require('../models/review.model');

class BookCtrl {
    get(req, res) {

        Book.find()
            .sort('-lastUpdated')
            .limit(10)
            .exec()
            .then(function (books) {
                // res.locals.books = books;
                res.render("books", { books: books });
            })
            .catch(function () {
                res.render("books");
            });


    }

    save(req, res) {
        res.render("new-book"); //hbs--jade
    }

    saveBook(req, res) {
        req.body.inStock = req.body.inStock ? true : false;
        var book = new Book(req.body);

        book.save()
            .then(function (bk) {
                res.redirect('/books');
            })
            .catch(function (err) {
                res.render("error");
            });
    }

    getById(req, res) {
        let id = req.params.id;

        Book.findById(id).exec()
            .then(function (book) {

                Review.find({ bookId: id })
                    .exec()
                    .then(function (reviews) {

                        var jsonBook = book.toJSON();

                        jsonBook.reviews = reviews;
                        res.locals.book = jsonBook;
                        res.render("book-detail");
                    })
                    .catch(function () {
                        console.log(err);
                        res.render("error");
                    });



            })
            .catch(function (err) {
                console.log(err);
                res.render("error");
            });
    }

    delete(req, res) {

        const id = req.params.id;

        Book.findByIdAndRemove(id)
            .then(function () {
                res.redirect("/books");
            })
            .catch(function (err) {
                res.render("error", { error: err });
            });
    }
}

module.exports = new BookCtrl();

// var bookCtrl = new BookCtrl();
// module.exports = bookCtrl;