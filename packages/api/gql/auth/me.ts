import { gql } from "../__generated__";

export const ME = gql(/* GraphQL */ `
  query ME {
    me {
      id
      email
      username
    }
  }
`);

export const ME_DASHBOARD_LAYOUT = gql(/* GraphQL */ `
  query ME_DASHBOARD_LAYOUT {
    me {
      username
      full_name
    }
  }
`);
