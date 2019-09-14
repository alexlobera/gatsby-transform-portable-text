## Description

This plugin extends one or more Gatsby GraphQL types and adds the following fields:

- `excerpt`: it returns the excerpt of a given [text field](#text-field) in a given type.
- `readingTimeInMinutes`: it returns the reading time in minutes of given a [text field](#text-field) in a given type.

### Text field

This plugin only works with text fields that implement the [Portable Text](https://github.com/portabletext/portabletext) specification.

Example of a Portable Text definition:

```
{
  "style": "h1",
  "_type": "block",
  "children": [
    {
      "_type": "span",
      "text": "This is a heading"
    }
  ]
}
```

### Demo

This [blog](https://reactgraphql.academy/blog/) uses the [excerpt](https://github.com/reactgraphqlacademy/reactgraphqlacademy/blob/master/src/components/blog/PostCard.js#L40) and [readingTimeInMinutes](https://github.com/reactgraphqlacademy/reactgraphqlacademy/blob/master/src/templates/blog-post-sanity.js#L166).

### Dependencies

This plugin does not depend on other plugins, but it comes in handy with plugins that implement Portable Text such as [gatsby-source-sanity](https://github.com/sanity-io/gatsby-source-sanity).

## How to install

`npm i gatsby-transform-portable-text --save`

```js
// in your gatsby-config.js
module.exports = {
  // ...
  plugins: [
    // ...
    {
      resolve: `gatsby-transform-portable-text`,
      options: {
        extendTypes: [{ typeName: `SanityPost`, contentFieldName: "body" }]
      }
    }
  ]
  // ...
};
```

## Available options

| Options     | Type                                                    | Default | Description                                                                                                                                                        |
| ----------- | ------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| extendTypes | array of { typeName: string, contentFieldName: string } |         | **[required]** `typeName` is the name of the type in the schema to be extended. `contentFieldName` is the field in the extended type that implements Portable Text |

## When do I use this plugin?

Useful to display the excerpt or the reading time in minutes of a type that returns Portable Text such as a blog post implemented using Sanity.io.

## Examples of usage

```GraphQL
query Example {
  sanityPost(id: { eq: $id }) {
      readingTimeInMinutes
      excerpt
  }
}
```

## How to contribute

Thanks for your interest in contributing to this plugin! Pull Requests welcome for any level of improvement, from a small typo to a new section, help us make the project better.

### How to run the tests

`yarn test`

### Pull Requests

To submit a pull request, follow these steps

1. Fork and clone this repo
2. Create a branch for your changes
3. Install dependencies with `yarn`
4. Make changes locally
5. Make sure tests pass, otherwise update the tests
6. Commit your changes
7. Push your branch to origin
8. Open a pull request in this repository with a clear title and description and link to any relevant issues
9. Wait for a maintainer to review your PR
