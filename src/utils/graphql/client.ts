import ApolloClient from 'apollo-boost';

export const apolloClient = new ApolloClient({
    uri: 'https://graphql2.aasaanjobs.net/',
    headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlfaWQiOiIzMjA5IiwibmFtZSI6IkFiaWQgU2F5eWVkIiwiaWQiOiJmNTEyNGYyZi1jYmQwLTQxM2UtOTBmNC1kYWZjYWQ4YWVmOTQiLCJ1c2VyX3R5cGUiOiJQQSJ9.hd0oF8Z3gfoY7N4osNmwzqu4dVzRtYHdaPElCt82DR8',
    },
});

export default apolloClient;
