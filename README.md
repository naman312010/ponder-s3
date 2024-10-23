# Ponder-S3

This example shows how to create a GraphQL API for an ERC721 token using Ponder while possibly fetching data from Amazon S3 as part of indexing operations

## Sample queries

### Get all tokens currently owned by an account

```graphql
{
  account(id: "0x2B8E4729672613D69e5006a97dD56A455389FB2b") {
    id
    tokens {
      id
    }
  }
}
```

