# containers

## cannot:

- use react-apollo `graphql` hoc for queries

- alter props for children unless they render presentational components only

## can:

- use react lifecycle hooks

- render containers, data containers, and presentational components

- use react-redux `connect` hoc

- use react-apollo `graphql` hoc for **mutations**

- use recompose `withHandlers` hoc for children event handlers that must be aware of `core`


# data containers

## cannot:

- use react-redux `connect` hoc

- use react-apollo `graphql` hoc for mutations

## can:

- use react lifecycle hooks

- render presentational components

- use react-apollo `graphql` hoc for **queries**

- use recompose `withHandlers` hoc for children event handlers which deal with query data, and optionally call parent container's corresponding event handler

- dispatch actions from lifecycle hooks
