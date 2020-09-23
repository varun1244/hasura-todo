FROM hasura/graphql-engine:latest.cli-migrations-v2
COPY ./metadata /hasura-metadata
COPY ./migrations /hasura-migrations

CMD ["graphql-engine", "serve"]
