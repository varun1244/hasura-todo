module.exports = {
  SIGNUP_MUTATION: `
    mutation ($name: String!, $username: String!, $password: String!) {
      insert_users_one(object: {
        name: $name,
        username: $username,
        password: $password
      }) {
        id
      }
    }
  `,
  LOGIN_MUTATION: `
    query user($username: String!){
      users(where: {username: {_eq: $username}}) {
        password
        username
        name
        id
      }
    }
  `
}
