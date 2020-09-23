# hasura-todo
A simple todo app using

* [Hasura]	 - [Graphql] engine
* [Nodejs]   - BE app for custom actions
* [Postgres] - Database

## Local Installation
1. Requires [Docker] to be setup in the local machine
2. Add a `.env` file in the root directory `hasura-todo/` with the contents similar to the one provided in `.env.example` but set the values accordingly of the variables

3. Run the following command to run the services locally
```
$ docker-compose up
```
4. The [Graphql] server will be running on `localhost:8081`
5. The [Nodejs] backend server will be running on `localhost:3000`

_note: Please change the configurations in docker-compose.yml file accordingly if you wish to use different ports_

## Additional info

  - The setup is completely over [Docker] with each of the components having it's dedicated [Dockerfile] to build and deploy the service on the cloud.
  - Using [JWT] as the auth scheme to validate requests from end users.

## Testing the application

  The image sets up the application with all the required metadata and migrations applied to the DB which might cause an initial delay (~20s).

  All the CRUD api's are secured by [JWT] in the `Authorization` header of the request in the `Bearer <token>` format.

  To generate a `token`, one of the following api's can be used without any additional headers:

  ```
    # Login with an existing account
    mutation {
      login (username: "", password: "") {
        id,
        token
      }
    }
  ```

  ```
    # Create a new account
    mutation {
      signup (name: "", username: "", password: "") {
        id,
        token
      }
    }
  ```

## Caveats
  - The asymmmetric keys for [JWT] is not static and rotates on every deployment, _no current strategy to sync the keys across multiple services_
  - No auth scheme for public apis (i.e Login/Signup mutations)
  - No UI to see all the apis in action (TBD)


[Hasura]: https://hasura.io/docs/1.0/graphql/core/index.html
[Nodejs]: https://expressjs.com/
[Graphql]: https://graphql.org/
[Postgres]: https://www.postgresql.org/
[Docker]: https://www.docker.com/
[JWT]: https://www.oauth.com/oauth2-servers/access-tokens/self-encoded-access-tokens/
