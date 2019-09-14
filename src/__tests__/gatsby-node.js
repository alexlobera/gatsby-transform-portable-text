const { GraphQLInt, GraphQLString } = require("gatsby/graphql");
import {
  createResolvers as pluginCreateResolvers,
  setFieldsOnGraphQLNodeType
} from "../gatsby-node";
import expect from "expect";

const blockContent = [
  {
    _type: "block",
    children: [
      {
        text:
          "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum end."
      }
    ]
  }
];

describe("createResolvers", () => {
  it("should extend an array of types and implement the readingTimeInMinutes resolver", () => {
    const createResolvers = jest.fn();

    pluginCreateResolvers(
      { createResolvers, actions: {} },
      {
        extendTypes: [
          { typeName: `SanityPost`, contentFieldName: "body" },
          { typeName: `RandomType`, contentFieldName: "content" }
        ]
      }
    );
    const argumentsFirstCall = createResolvers.mock.calls[0][0];
    expect(argumentsFirstCall.SanityPost).not.toBeFalsy();
    expect(argumentsFirstCall.SanityPost.readingTimeInMinutes).not.toBeFalsy();
    expect(argumentsFirstCall.RandomType).not.toBeFalsy();
    expect(argumentsFirstCall.RandomType.readingTimeInMinutes).not.toBeFalsy();

    const readingTimeInMinutes = argumentsFirstCall.SanityPost.readingTimeInMinutes.resolve(
      {
        body: blockContent
      },
      { wordsPerMinute: 10 }
    );

    expect(readingTimeInMinutes).toBe(5);
  });

  it("should extend an array of types and implement the excerpt resolver", () => {
    const createResolvers = jest.fn();

    pluginCreateResolvers(
      { createResolvers, actions: {} },
      {
        extendTypes: [
          { typeName: `SanityPost`, contentFieldName: "body" },
          { typeName: `RandomType`, contentFieldName: "content" }
        ]
      }
    );
    const argumentsFirstCall = createResolvers.mock.calls[0][0];
    expect(argumentsFirstCall.SanityPost).not.toBeFalsy();
    expect(argumentsFirstCall.SanityPost.excerpt).not.toBeFalsy();
    expect(argumentsFirstCall.RandomType).not.toBeFalsy();
    expect(argumentsFirstCall.RandomType.excerpt).not.toBeFalsy();

    const excerpt = argumentsFirstCall.SanityPost.excerpt.resolve(
      {
        body: blockContent
      },
      { limit: 25 }
    );

    expect(excerpt).toBe("lorem ipsum lorem ipsum...");
  });

  it("should extend a given type and add an excerpt and readingTimeInMinutes fields of type string", () => {
    const extendedType = setFieldsOnGraphQLNodeType(
      {
        type: { name: "SanityPost" }
      },
      { extendTypes: [{ typeName: `SanityPost`, contentFieldName: "body" }] }
    );

    expect(extendedType.readingTimeInMinutes.type).toEqual(GraphQLString);
    expect(extendedType.readingTimeInMinutes.args.wordsPerMinute.type).toEqual(
      GraphQLInt
    );

    expect(extendedType.excerpt.type).toEqual(GraphQLString);
    expect(extendedType.excerpt.args.limit.type).toEqual(GraphQLInt);
  });
});
