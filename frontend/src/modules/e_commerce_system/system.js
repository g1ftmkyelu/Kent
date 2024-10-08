import { v4 as uuidv4 } from "uuid";
import { translationKeys } from "@/executables/translation";
import * as Yup from "yup";

export const e_commerce_management_system = [
  {
    name: "shops",
    path: "shops",
    icon: "pi pi-store",
    label: translationKeys.Shops || "Shops",
    resourceGroup: translationKeys.ECommerceSystem || "e-commerce",
    schema: [
      {
        name: "image",
        title: translationKeys.Image || "Image",
        type: "image",
        validation: Yup.string().required("Image is required."),
      },
      {
        name: "shopName",
        title: translationKeys.ShopName || "Shop Name",
        type: "text",
        validation: Yup.string().required("Shop Name is required."),
      },
      {
        name: "owner",
        title: translationKeys.Owner || "Owner",
        type: "me",
        defaultValue:'current_user_id',
      },
      {
        name: "description",
        title: translationKeys.Description || "Description",
        type: "richtext",
        validation: Yup.string().required("Description is required."),
      },
    ],
    isPortal:true,
    portalDefinition: {
      name: "shops",
      url: "/shops",
      type: "default",
      icon: "pi pi-home",
    },
    renderMode: "crud",
    
    pivot:{
      field:"owner",
      value:'current_user_id'
    },
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
    tabs: [
      {
        resource: "products",
        pivot: "shop",
      },
    ],
  },
  {
    name: "products",
    path: "products",
    icon: "pi pi-box",
    label: translationKeys.Products || "Products",
    resourceGroup: translationKeys.ECommerceSystem || "e-commerce",
    schema: [
      {
        name: "images",
        title: translationKeys.Image || "Images",
        type: "image array",
       
      },
      {
        name: "productName",
        title: translationKeys.ProductName || "Product Name",
        type: "text",
        defaultValue: () => `PROD-${uuidv4().split('-')[0]}`, // Generates a custom formatted UUID
        validation: Yup.string().required("Product Name is required."),
      },
      {
        name: "shop",
        title: translationKeys.Shop || "Shop",
        type: "ref",
        resource: "shops",
        field: "shopName",
        validation: Yup.string().required("Shop is required."),
      },
      {
        name: "category",
        title: translationKeys.Category || "Category",
        type: "ref",
        resource: "categories",
        field: "categoryName",
        validation: Yup.string().required("Category is required."),
      },
      {
        name: "price",
        title: translationKeys.Price || "Price",
        type: "number",
        validation: Yup.number()
          .required("Price is required.")
          .positive("Price must be positive."),
      },
      {
        name: "materials",
        title: translationKeys.Materials || "Materials",
        type: "tags",
        tagInputType: "refs",
        resource: "materials",
        field: "materialName",
        validation: Yup.array().of(
          Yup.string().required("Each material must be provided.")
        ),
      },
      {
        name: "tags",
        title: translationKeys.Tags || "Tags",
        type: "tags",
        resource: "tags",
        tagInputType: "refs",
        field: "tagName",
        validation: Yup.array().of(Yup.string()),
      },
      {
        name: "description",
        title: translationKeys.Description || "Description",
        type: "richtext",
        validation: Yup.string().required("Description is required."),
      },
    ],
    renderMode: "crud",
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
    tabs: [
      {
        resource: "reviews",
        pivot: "product",
      },
      {
        resource: "orders",
        pivot: "product",
      },
    ],
  },
  {
    name: "categories",
    path: "categories",
    icon: "pi pi-tag",
    label: translationKeys.Categories || "Categories",
    resourceGroup: translationKeys.ECommerceSystem || "e-commerce",
    schema: [
      {
        name: "image",
        title: translationKeys.Image || "Image",
        type: "image",
        validation: Yup.string().required("Image is required."),
      },
      {
        name: "icon",
        title: translationKeys.Icon || "Icon",
        type: "icon",
        validation: Yup.string().required("Icon is required."),
      },
      {
        name: "categoryName",
        title: translationKeys.CategoryName || "Category Name",
        type: "text",
        validation: Yup.string().required("Category Name is required."),
      },
      {
        name: "description",
        title: translationKeys.Description || "Description",
        type: "richtext",
        validation: Yup.string().required("Description is required."),
      },
    ],
    renderMode: "crud",
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
  },
  {
    name: "reviews",
    path: "reviews",
    icon: "pi pi-star",
    label: translationKeys.Reviews || "Reviews",
    resourceGroup: translationKeys.ECommerceSystem || "e-commerce",
    schema: [
      {
        name: "product",
        title: translationKeys.Product || "Product",
        type: "ref",
        resource: "products",
        field: "productName",
        validation: Yup.string().required("Product is required."),
      },
      {
        name: "user",
        title: translationKeys.User || "User",
        type: "ref",
        resource: "users",
        field: "fullname",
        validation: Yup.string().required("User is required."),
      },
      {
        name: "rating",
        title: translationKeys.Rating || "Rating",
        type: "number",
        validation: Yup.number().required("Rating is required.").min(1).max(5),
      },
      {
        name: "comment",
        title: translationKeys.Comment || "Comment",
        type: "richtext",
        validation: Yup.string().required("Comment is required."),
      },
    ],
    renderMode: "crud",
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
  },
  {
    name: "materials",
    path: "materials",
    icon: "pi pi-box",
    label: translationKeys.Materials || "Materials",
    resourceGroup: translationKeys.ECommerceSystem || "e-commerce",
    schema: [
      {
        name: "materialName",
        title: translationKeys.MaterialName || "Material Name",
        type: "text",
        validation: Yup.string().required("Material Name is required."),
      },
      {
        name: "description",
        title: translationKeys.Description || "Description",
        type: "richtext",
        validation: Yup.string().required("Description is required."),
      },
    ],
    renderMode: "crud",
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
  },
  {
    name: "orders",
    path: "orders",
    icon: "pi pi-shopping-cart",
    label: translationKeys.Orders || "Orders",
    resourceGroup: translationKeys.ECommerceSystem || "e-commerce",
    schema: [
      {
        name: "orderNumber",
        title: translationKeys.OrderNumber || "Order Number",
        type: "text",
        defaultValue: () => `ORD-${uuidv4().split("-")[0]}`,
        validation: Yup.string().required("Order Number is required."),
      },
      {
        name: "user",
        title: translationKeys.User || "User",
        type: "ref",
        resource: "users",
        field: "fullname",
        validation: Yup.string().required("User is required."),
      },
      {
        name: "product",
        title: translationKeys.Product || "Product",
        type: "ref",
        resource: "products",
        field: "productName",
        validation: Yup.string().required("Product is required."),
      },
      {
        name: "quantity",
        title: translationKeys.Quantity || "Quantity",
        type: "number",
        validation: Yup.number()
          .required("Quantity is required.")
          .positive("Quantity must be positive."),
      },
      {
        name: "orderDate",
        title: translationKeys.OrderDate || "Order Date",
        type: "date",
        defaultValue: new Date().toISOString().split("T")[0],
        validation: Yup.date().required("Order Date is required."),
      },
      {
        name: "shop",
        title: translationKeys.Shop || "Shop",
        type: "ref",
        resource: "shops",
        field: "shopName",
        validation: Yup.string().required("Shop is required."),
      },
      {
        name: "status",
        title: translationKeys.Status || "Status",
        type: "select",
        options: [
          { label: "Pending", value: "pending" },
          { label: "Processing", value: "processing" },
          { label: "Shipped", value: "shipped" },
          { label: "Delivered", value: "delivered" },
          { label: "Cancelled", value: "cancelled" },
        ],
        defaultValue: "pending",
        validation: Yup.string().required("Status is required."),
      },
    ],
    renderMode: "crud",
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
    tabs: [
      {
        resource: "payments",
        pivot: "order",
      },
    ],
  },
  {
    name: "tags",
    path: "tags",
    icon: "pi pi-tags",
    label: translationKeys.Tags || "Tags",
    resourceGroup: translationKeys.ECommerceSystem || "e-commerce",
    schema: [
      {
        name: "icon",
        title: translationKeys.Icon || "Icon",
        type: "icon",
      },
      {
        name: "tagName",
        title: translationKeys.TagName || "Tag Name",
        type: "text",
        validation: Yup.string().required("Tag Name is required."),
      },
    ],
    renderMode: "crud",
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
  },
  {
    name: "shoppingSessions",
    path: "shopping-sessions",
    icon: "pi pi-shopping-bag",
    label: translationKeys.ShoppingSessions || "Shopping Sessions",
    resourceGroup: translationKeys.ECommerceSystem || "e-commerce",
    schema: [
      {
        name: "sessionId",
        title: translationKeys.SessionId || "Session ID",
        type: "text",
        defaultValue: () => `SES-${uuidv4().split("-")[0]}`,
        validation: Yup.string().required("Session ID is required."),
      },
      {
        name: "user",
        title: translationKeys.User || "User",
        type: "ref",
        resource: "users",
        field: "fullname",
        validation: Yup.string().required("User is required."),
      },
      {
        name: "startDate",
        title: translationKeys.StartDate || "Start Date",
        type: "date",
        defaultValue: new Date().toISOString().split("T")[0],
        validation: Yup.date().required("Start Date is required."),
      },
      {
        name: "endDate",
        title: translationKeys.EndDate || "End Date",
        type: "date",
        validation: Yup.date().nullable(),
      },
      {
        name: "orders", 
        title: translationKeys.Orders || "Orders",
        type: "tags",
        tagsInputType: "refs",
        resource: "orders",
        field: "orderNumber",
        validation: Yup.string().required("Orders is required."),
      }
    ],
    renderMode: "crud",
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
  },
  {
    name: "payments",
    path: "payments",
    icon: "pi pi-credit-card",
    label: translationKeys.Payments || "Payments",
    resourceGroup: translationKeys.ECommerceSystem || "e-commerce",
    schema: [
      {
        name: "paymentId",
        title: translationKeys.PaymentId || "Payment ID",
        type: "text",
        defaultValue: () => `PAY-${uuidv4().split("-")[0]}`,
        validation: Yup.string().required("Payment ID is required."),
      },
      {
        name: "order",
        title: translationKeys.Order || "Order",
        type: "ref",
        resource: "orders",
        field: "orderNumber",
        validation: Yup.string().required("Order is required."),
      },
      {
        name: "amount",
        title: translationKeys.Amount || "Amount",
        type: "number",
        validation: Yup.number()
          .required("Amount is required.")
          .positive("Amount must be positive."),
      },
      {
        name: "paymentMethod",
        title: translationKeys.PaymentMethod || "Payment Method",
        type: "ref",
        resource: "paymentMethods",
        field: "methodName",
        validation: Yup.string().required("Payment Method is required."),
      },
      {
        name: "paymentDate",
        title: translationKeys.PaymentDate || "Payment Date",
        type: "date",
        defaultValue: new Date().toISOString().split("T")[0],
        validation: Yup.date().required("Payment Date is required."),
      },
      {
        name: "status",
        title: translationKeys.Status || "Status",
        type: "select",
        options: [
          { label: "Pending", value: "pending" },
          { label: "Completed", value: "completed" },
          { label: "Failed", value: "failed" },
          { label: "Refunded", value: "refunded" },
        ],
        defaultValue: "pending",
        validation: Yup.string().required("Status is required."),
      },
    ],
    renderMode: "crud",
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
  },
  {
    name: "paymentMethods",
    path: "payment-methods",
    icon: "pi pi-credit-card",
    label: translationKeys.PaymentMethods || "Payment Methods",
    resourceGroup: translationKeys.ECommerceSystem || "e-commerce",
    schema: [
      {
        name: "icon",
        title: translationKeys.Icon || "Icon",
        type: "icon",
        validation: Yup.string().required("Icon is required."),
      },
      {
        name: "methodName",
        title: translationKeys.MethodName || "Method Name",
        type: "text",
        validation: Yup.string().required("Method Name is required."),
      },
      {
        name: "description",
        title: translationKeys.Description || "Description",
        type: "richtext",
        validation: Yup.string().required("Description is required."),
      },
    ],
    renderMode: "crud",
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
  },
];
