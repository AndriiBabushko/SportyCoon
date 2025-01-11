/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** FitnessLevel custom scalar type, allowed values are NEWBIE, BEGINNER, INTERMEDIATE, ADVANCED */
  FitnessLevelScalar: { input: any; output: any };
  /** Gender custom scalar type, allowed values are MALE, FEMALE, OTHER */
  GenderScalar: { input: any; output: any };
  /** Height unit custom scalar type, allowed values are CM and IN */
  HeightUnitScalar: { input: any; output: any };
  /** Weight unit custom scalar type, allowed values are KG and LBS */
  WeightUnitScalar: { input: any; output: any };
};

export type Avatar = {
  __typename?: "Avatar";
  created_at: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  public_id: Scalars["String"]["output"];
  updated_at: Scalars["DateTime"]["output"];
  url: Scalars["String"]["output"];
  user_id: Scalars["String"]["output"];
};

/** User fitness level */
export enum Fitness_Level {
  Advanced = "ADVANCED",
  Beginner = "BEGINNER",
  Intermediate = "INTERMEDIATE",
  Newbie = "NEWBIE",
}

/** User gender */
export enum Gender {
  Female = "FEMALE",
  Male = "MALE",
  Other = "OTHER",
}

/** Possible goals for training */
export enum Goal {
  BuildMuscle = "BUILD_MUSCLE",
  BuildStrength = "BUILD_STRENGTH",
  ImproveHealth = "IMPROVE_HEALTH",
  LearnTechniques = "LEARN_TECHNIQUES",
  LoseWeight = "LOSE_WEIGHT",
}

export type GoalWeight = {
  __typename?: "GoalWeight";
  unit: Weight_Unit;
  value: Scalars["Float"]["output"];
};

export type GoalWeightInput = {
  unit: Scalars["WeightUnitScalar"]["input"];
  value: Scalars["Float"]["input"];
};

/** Height unit custom scalar type, allowed values are CM and IN */
export enum Height_Unit {
  Cm = "CM",
  In = "IN",
}

export type Height = {
  __typename?: "Height";
  unit: Height_Unit;
  value: Scalars["Float"]["output"];
};

export type HeightInput = {
  unit: Scalars["HeightUnitScalar"]["input"];
  value: Scalars["Float"]["input"];
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  access_token: Scalars["String"]["output"];
  refresh_token: Scalars["String"]["output"];
  user: User;
};

export type LoginUserInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  login: LoginResponse;
  refreshToken: RefreshTokenResponse;
  register: RegisterResponse;
};

export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};

export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenInput;
};

export type MutationRegisterArgs = {
  registerUserInput: RegisterUserInput;
};

export type Performance = {
  __typename?: "Performance";
  id: Scalars["String"]["output"];
  max_dips: Scalars["Float"]["output"];
  max_pull_ups: Scalars["Float"]["output"];
  max_push_ups: Scalars["Float"]["output"];
  max_squats: Scalars["Float"]["output"];
  user_id: Scalars["String"]["output"];
};

export type PerformanceInput = {
  max_dips: Scalars["Float"]["input"];
  max_pull_ups: Scalars["Float"]["input"];
  max_push_ups: Scalars["Float"]["input"];
  max_squats: Scalars["Float"]["input"];
};

export type Query = {
  __typename?: "Query";
  me: User;
  sayHello: Scalars["String"]["output"];
};

export type RefreshTokenInput = {
  refresh_token: Scalars["String"]["input"];
};

export type RefreshTokenResponse = {
  __typename?: "RefreshTokenResponse";
  access_token: Scalars["String"]["output"];
  refresh_token: Scalars["String"]["output"];
  user: User;
};

export type RegisterResponse = {
  __typename?: "RegisterResponse";
  access_token: Scalars["String"]["output"];
  refresh_token: Scalars["String"]["output"];
  user: User;
};

export type RegisterUserInput = {
  email: Scalars["String"]["input"];
  fitness_level: Scalars["FitnessLevelScalar"]["input"];
  full_name: Scalars["String"]["input"];
  gender: Scalars["GenderScalar"]["input"];
  goal_weight: GoalWeightInput;
  goals: Array<Goal>;
  height: HeightInput;
  password: Scalars["String"]["input"];
  performance: PerformanceInput;
  username: Scalars["String"]["input"];
  weight: WeightInput;
};

export type User = {
  __typename?: "User";
  avatar?: Maybe<Avatar>;
  created_at: Scalars["DateTime"]["output"];
  email?: Maybe<Scalars["String"]["output"]>;
  fitness_level?: Maybe<Fitness_Level>;
  full_name?: Maybe<Scalars["String"]["output"]>;
  gender?: Maybe<Gender>;
  goal_weight?: Maybe<GoalWeight>;
  goals?: Maybe<Array<Maybe<Goal>>>;
  google_id?: Maybe<Scalars["String"]["output"]>;
  height?: Maybe<Height>;
  id: Scalars["String"]["output"];
  performance?: Maybe<Performance>;
  role: Scalars["String"]["output"];
  spotify_id?: Maybe<Scalars["String"]["output"]>;
  updated_at: Scalars["DateTime"]["output"];
  username?: Maybe<Scalars["String"]["output"]>;
  weight?: Maybe<Weight>;
};

/** Weight unit custom scalar type, allowed values are KG and LBS */
export enum Weight_Unit {
  Kg = "KG",
  Lbs = "LBS",
}

export type Weight = {
  __typename?: "Weight";
  unit: Weight_Unit;
  value: Scalars["Float"]["output"];
};

export type WeightInput = {
  unit: Scalars["WeightUnitScalar"]["input"];
  value: Scalars["Float"]["input"];
};

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginResponse";
    access_token: string;
    refresh_token: string;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    id: string;
    email?: string | null;
    username?: string | null;
  };
};

export type Me_Dashboard_LayoutQueryVariables = Exact<{ [key: string]: never }>;

export type Me_Dashboard_LayoutQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    username?: string | null;
    full_name?: string | null;
  };
};

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;

export type RefreshTokenMutation = {
  __typename?: "Mutation";
  refreshToken: {
    __typename?: "RefreshTokenResponse";
    access_token: string;
    refresh_token: string;
  };
};

export type RegisterMutationVariables = Exact<{
  input: RegisterUserInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "RegisterResponse";
    access_token: string;
    refresh_token: string;
  };
};

export type SayHelloQueryVariables = Exact<{ [key: string]: never }>;

export type SayHelloQuery = { __typename?: "Query"; sayHello: string };

export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "LoginUserInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "loginUserInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "access_token" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "refresh_token" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ME" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const Me_Dashboard_LayoutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ME_DASHBOARD_LAYOUT" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "full_name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  Me_Dashboard_LayoutQuery,
  Me_Dashboard_LayoutQueryVariables
>;
export const RefreshTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RefreshToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "RefreshTokenInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "refreshToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "refreshTokenInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "access_token" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "refresh_token" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const RegisterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Register" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "RegisterUserInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "register" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "registerUserInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "access_token" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "refresh_token" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const SayHelloDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "sayHello" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "sayHello" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SayHelloQuery, SayHelloQueryVariables>;
