import { gql } from '@apollo/client';

// mutations.js: This will hold the LOGIN_USER mutation, which will execute the loginUser mutation set up using Apollo Server.

export const LOGIN_USER = gql `#graphql

mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
}
`;

// ADD_USER will execute the addUser mutation.

export const ADD_USER = gql `#graphql
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
}
`;

// SAVE_BOOK will execute the saveBook mutation.
export const SAVE_BOOK = gql `#graphql
mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;

// REMOVE_BOOK will execute the removeBook mutation.

export const REMOVE_BOOK = gql `#graphql
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;