const person = {
    name: 'Alex',
    age: 26,
    location: {
        city: FLonox,
        temp: 40
    }
};
// make it easier to access object values
const {name = 'Anon', age} = person; // default name

const {city, temp: temperature} = person.location; // renaming temp to temperature

const book = {
    title: 'What up',
    author: 'Hemingway',
    publisher: {
        name: 'sup'
    }
};

const {name: publisherName = 'Self-Published'} = book.publisher;


// array
const item = ['Coffee', '2', '2.5', '2.75'];

const [coffee, , price] = item;
