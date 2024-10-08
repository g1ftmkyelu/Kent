exports.e_commerce_management_system = [
  {
    name: "shops",
    path: "shops",
    schema: [
      {
        name: "image",
        type: "image",
      },
      {
        name: "shopName",
        type: "text",
      },
      {
        name: "owner",
        type: "ref",
        resource: "users",
        field: "fullname",
      },
      {
        name: "description",
        type: "richtext",
      },
    ],
  },
  {
    name: "products",
    path: "products",
    schema: [
      {
        name: "images",
        type: "image array",
      },
      {
        name: "productName",
        type: "text",
      },
      {
        name: "shop",
        type: "ref",
        resource: "shops",
        field: "shopName",
      },
      {
        name: "category",
        type: "ref",
        resource: "categories",
        field: "categoryName",
      },
      {
        name: "description",
        type: "richtext",
      },
      {
        name: "price",
        type: "number",
      },
      {
        name: "materials",
        type: "tags",
        tagsInputType: "refs",
        resource: "materials",
        field: "materialName",
      },
      {
        name: "tags",
        type: "tags",
        resource: "tags",
        tagsInputType: "refs",
        field: "tagName",
      },
    ],
  },
  {
    name: "categories",
    path: "categories",
    schema: [
      {
        name: "icon",
        type: "icon"},
      {
        name: "image",
        type: "image",
      },
      {
        name: "categoryName",
        type: "text",
      },
      {
        name: "description",
        type: "richtext",
      },
    ],
  },
  {
    name: "reviews",
    path: "reviews",
    schema: [
      {
        name: "product",
        type: "ref",
        resource: "products",
        field: "productName",
      },
      {
        name: "user",
        type: "ref",
        resource: "users",
        field: "fullname",
      },
      {
        name: "rating",
        type: "number",
      },
      {
        name: "comment",
        type: "richtext",
      },
    ],
  },
  {
    name: "materials",
    path: "materials",
    schema: [
      {
        name: "materialName",
        type: "text",
      },
      {
        name: "description",
        type: "richtext",
      },
    ],
  },
  {
    name: "orders",
    path: "orders",
    schema: [
      {
        name: "orderNumber",
        type: "text",
      },
      {
        name: "user",
        type: "ref",
        resource: "users",
        field: "fullname",
      },
      {
        name: "product",
        type: "ref",
        resource: "products",
        field: "productName",
      },
      {
        name: "quantity",
        type: "number",
      },
      {
        name: "orderDate",
        type: "date",
      },
      {
        name: "status",
        type: "select",
        options: [
          { label: "Pending", value: "pending" },
          { label: "Processing", value: "processing" },
          { label: "Shipped", value: "shipped" },
          { label: "Delivered", value: "delivered" },
          { label: "Cancelled", value: "cancelled" },
        ],
      },
    ],
  },
  {
    name: "tags",
    path: "tags",
    schema: [
      {
        name: "icon",
        type: "icon"},
      {
        name: "tagName",
        type: "text",
      },
    ],
  },
  {
    name: "shoppingSessions",
    path: "shopping-sessions",
    schema: [
      {
        name: "sessionId",
        type: "text",
      },
      {
        name: "user",
        type: "ref",
        resource: "users",
        field: "fullname",
      },
      {
        name: "startDate",
        type: "date",
      },
      {
        name: "endDate",
        type: "date",
      },
      {
        name: "orders", 
        type: "tags",
        tagsInputType: "refs",
        resource: "orders",
        field: "orderNumber",
      }
    ],
  },
  {
    name: "payments",
    path: "payments",
    schema: [
      {
        name: "paymentId",
        type: "text",
      },
      {
        name: "order",
        type: "ref",
        resource: "orders",
        field: "orderNumber",
      },
      {
        name: "amount",
        type: "number",
      },
      {
        name: "paymentMethod",
        type: "ref",
        resource: "paymentMethods",
        field: "methodName",
      },
      {
        name: "paymentDate",
        type: "date",
      },
      {
        name: "status",
        type: "select",
        options: [
          { label: "Pending", value: "pending" },
          { label: "Completed", value: "completed" },
          { label: "Failed", value: "failed" },
          { label: "Refunded", value: "refunded" },
        ],
      },
    ],
  },
  {
    name: "paymentMethods",
    path: "payment-methods",
    schema: [
      {
        name: "methodName",
        type: "text",
      },
      {
        name: "description",
        type: "richtext",
      },
    ],
  },
];