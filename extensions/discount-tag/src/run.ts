import type {
  RunInput,
  FunctionRunResult
} from "../generated/api";
import {
  DiscountApplicationStrategy,
} from "../generated/api";

const EMPTY_DISCOUNT: FunctionRunResult = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

const MINIMUM_CART_ITEMS = 3;
const DISCOUNT_PERCENTAGE = 10;

export function run(input: RunInput): FunctionRunResult {
  console.log("Lines ===>", input.cart.lines);

  const totalDiscountTagItems = input.cart.lines.reduce((count, line) => {
    if (line.merchandise.__typename === "ProductVariant" && line.merchandise.product.hasDiscountTag) {
      return count + line.quantity;
    }
    return count;
  }, 0);

  if (totalDiscountTagItems >= MINIMUM_CART_ITEMS) {
    return {
      discountApplicationStrategy: DiscountApplicationStrategy.First,
      discounts: [
        {
          message: `A ${DISCOUNT_PERCENTAGE}% discount has been applied for purchasing ${MINIMUM_CART_ITEMS} or more items with discount tags.`,
          value: {
            percentage: {
              value: DISCOUNT_PERCENTAGE
            }
          },
          targets: [
            {
              orderSubtotal: {
                excludedVariantIds: []
              }
            }
          ]
        }
      ]
    }
  } else {
    return EMPTY_DISCOUNT;
  }

};

