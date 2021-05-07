# MyReads Project

To get started:

* install all project dependencies with `npm install`
* start the development server with `npm start`
* also `npm run build` to create a production mode

## What You're Getting
```bash
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│   yarn.lock
│
├───public
│       favicon.ico # provided by Udacity's stater kit
│       index.html # provided by Udacity's stater kit
│
└───src
    │   App.css # provided by Udacity's stater kit
    │   App.js # The main component
    │   App.test.js
    │   BooksAPI.js # provided by Udacity
    │   index.css # provided by Udacity's stater kit
    │   index.js
    │
    ├───components
    │   │   Home.js # home component contains user's shelvs and the selected books
    │   │   Search.js # Search Page with an input to search for books and grid to display the results
    │   │
    │   └───shelvs
    │           CurrentlyReading.js # first shelf in the home page with the books's shelf marked as "currentlyReading"
    │           Read.js # third shelf in the home page with the books's shelf marked as "read"
    │           WantToRead.js # second shelf in the home page with the books's shelf marked as "wantToRead"
    │
    └───icons
            add.svg # provided by Udacity's stater kit
            arrow-back.svg # provided by Udacity's stater kit
            arrow-drop-down.svg # provided by Udacity's stater kit
```


### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
> _that made a problem with the none selected books because every book has a shelf trying to deselect a book -update the shelf in the api to "none"- erases it from the API and you have to change token to restore it I thought this was a problem with the API but the logic works in my code

* Returns a Promise which resolves to a JSON object containing the response data of the POST request

