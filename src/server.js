const Hapi = require('@hapi/hapi');
const books = require('./books');

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
    });

    // Routes
    server.route([
        {
            method: 'POST',
            path: '/books',
            handler: books.addBook,
        },
        {
            method: 'GET',
            path: '/books',
            handler: books.getBooks,
        },
        {
            method: 'GET',
            path: '/books/{id}',
            handler: books.getBookById,
        },
        {
            method: 'PUT',
            path: '/books/{id}',
            handler: books.updateBook,
        },
        {
            method: 'DELETE',
            path: '/books/{id}',
            handler: books.deleteBook,
        },
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();