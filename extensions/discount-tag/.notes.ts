const discountMutation = `
mutation createDiscount {
  discountCodeAppCreate(
    codeAppDiscount: {functionHandle: "discount-tag", code: "10%_DISCOUNT", title: "10% DISCOUNT", startsAt: "2025-12-01"}
  ) {
    codeAppDiscount {
      discountId
    }
    userErrors {
      message
    }
  }
}`

const functionConfigQuery = `
query function {
  shopifyFunctions(first: 10) {
    edges {
      node {
        id
        title
      }
    }
  }
}`