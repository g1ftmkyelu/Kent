const { sendMail } = require("../../helpers/Emailer");
const axios = require("axios");
const stripe = require("stripe")(process.env.PRIVATE_STRIPE_KEY);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const serviceAccount = require("./server-services-50a49-firebase-adminsdk-p1vyi-746c01c04d.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.getResources = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const {
      returnFields,
      page = 1,
      limit = 10,
      sortBy,
      order,
      filter,
    } = req.query;

    let filterQuery = {};
    let selectFields = "";
    let sortOrder = 1; // Default sort order is ascending

    // Construct filter query based on the filter object
    if (filter) {
      for (const [key, value] of Object.entries(filter)) {
        filterQuery[key] = value;
      }
    }

    if (returnFields) {
      selectFields = returnFields.split(",").join(" ");
    }

    // Ensure the _id field is excluded
    if (selectFields && !selectFields.includes("_id")) {
      selectFields += " -_id";
    }

    // Check if order is specified and set the sort order accordingly
    if (order && order.toLowerCase() === "desc") {
      sortOrder = -1;
    }

    const totalCount = await resourceModel.countDocuments(filterQuery);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let dbQuery = resourceModel.find(filterQuery);

    if (selectFields) {
      dbQuery = dbQuery.select(selectFields);
    }

    // Apply sorting if sortBy field is provided
    if (sortBy) {
      dbQuery = dbQuery.sort({ [sortBy]: sortOrder });
    } else {
      // Default sorting
      dbQuery = dbQuery.sort({ updatedAt: -1 });
    }

    dbQuery = dbQuery.skip(startIndex).limit(limit);

    const resources = await dbQuery.lean();

    // Map the "_id" field to "id" in the response
    const modifiedResources = resources.map((resource) => {
      resource.id = resource._id;
      delete resource._id;
      return resource;
    });

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasLastPage = page > 1;

    const pagination = {
      currentPage: page,
      totalPages,
      totalCount,
      limit,
      hasNextPage,
      hasLastPage,
    };

    return res.status(200).json({ pagination, data: modifiedResources });
  } catch (error) {
    console.error("Error fetching resources:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching resources" });
  }
};

exports.getMyResourceById = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { field, id } = req.query;
    let filterQuery = {};

    // If the field is "_id", search directly by the id
    if (field === "_id") {
      // Check if the id is a valid ObjectId
      const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
      if (isValidObjectId) {
        filterQuery._id = new mongoose.Types.ObjectId(id);
      } else {
        // If it's not a valid ObjectId, return an error
        return res.status(400).json({ error: "Invalid resource ID" });
      }
    } else {
      // Otherwise, search by the specified field
      if (mongoose.Types.ObjectId.isValid(id)) {
        filterQuery[field] = new mongoose.Types.ObjectId(id);
      } else {
        filterQuery[field] = id;
      }
    }

    let dbQuery = resourceModel.find(filterQuery);
    dbQuery = dbQuery.sort({ updatedAt: -1 });
    const resources = await dbQuery.lean();

    const modifiedResources = resources.map((resource) => {
      resource.id = resource._id;
      delete resource._id;
      return resource;
    });

    return res.status(200).json({ data: modifiedResources });
  } catch (error) {
    console.error("Error fetching resource by ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching resource by ID" });
  }
};

exports.createResources = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    // Check if the request body is an array for bulk inserts
    if (Array.isArray(req.body)) {
      // Insert multiple documents in bulk
      const insertedResources = await resourceModel.insertMany(req.body);
      res.status(201).json(insertedResources);
    } else {
      // Insert a single document
      const newResource = new resourceModel(req.body);
      const createdResource = await newResource.save();
      res.status(201).json(createdResource);
    }
  } catch (error) {
    console.error("Error creating resources:", error);
    res.status(400).json({ error: "Invalid request data" });
  }
};

exports.updateResources = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { id } = req.params;
    const { body } = req;

    // Check if the request body is an array for bulk updates
    if (Array.isArray(body)) {
      // Bulk updates
      const updatedResources = await Promise.all(
        body.map(async (update) => {
          const updatedResource = await resourceModel.findByIdAndUpdate(
            update._id,
            update,
            { new: true }
          );
          return updatedResource;
        })
      );

      res.status(200).json(updatedResources);
    } else {
      // Single update
      const updatedResource = await resourceModel.findByIdAndUpdate(id, body, {
        new: true,
      });

      if (!updatedResource) {
        return res.status(404).json({ error: "Resource not found" });
      }

      res.status(200).json(updatedResource);
    }
  } catch (error) {
    console.error("Error updating resources:", error);
    res.status(400).json({ error: "Invalid request data" });
  }
};

exports.getResourceById = async (req, res) => {
  // Extract the resource model from the request
  const resourceModel = req.resourceModel;

  try {
    // Destructuring query parameters from the request
    const { field, id } = req.query;

    let filterQuery = {}; // Initialize an empty filter query

    // Construct the query
    filterQuery[field] = mongoose.Types.ObjectId(id);

    // Create the initial query to the database
    let dbQuery = resourceModel.find(filterQuery);

    // Sort by updatedAt in descending order
    dbQuery = dbQuery.sort({ updatedAt: -1 });

    // Execute the database query and convert the result to plain JavaScript objects
    const resources = await dbQuery.lean();

    // Map the "_id" field to "id" in the response
    const modifiedResources = resources.map((resource) => {
      resource.id = resource._id;
      delete resource._id;
      return resource;
    });

    // Send the response
    return res.status(200).json({ data: modifiedResources });
  } catch (error) {
    // Handle errors
    console.error("Error fetching resource by ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching resource by ID" });
  }
};

// DELETE /resources/:id
exports.deleteResource = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { id } = req.params;
    const deletedResource = await resourceModel.findByIdAndDelete(id);

    if (!deletedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    res.status(204).end(); // 204 No Content for successful deletion
  } catch (error) {
    console.log("Error deleting resource:", error);
    res.status(400).json({ error: "Invalid request data" });
  }
};

// DELETE /resources
// Request body: [id1, id2, id3, ...]
exports.deleteResources = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    // Check if the request body contains IDs for bulk deletion
    if (Array.isArray(req.body)) {
      // Bulk deletion
      const deletedResources = await resourceModel.deleteMany({
        _id: { $in: req.body },
      });

      if (deletedResources.deletedCount === 0) {
        return res.status(404).json({ error: "Resources not found" });
      }

      res.status(200).json(deletedResources);
    } else {
      return res.status(400).json({
        error: "Invalid request data. Specify valid IDs in the request body.",
      });
    }
  } catch (error) {
    console.log("Error deleting resources:", error);
    res.status(400).json({ error: "Invalid request data" });
  }
};

exports.getResourceById = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { id } = req.params;
    const resource = await resourceModel.findById(id).lean();

    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    return res.status(200).json(resource);
  } catch (error) {
    console.error("Error fetching resource by ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching resource" });
  }
};

exports.searchResources = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    // Example: Filtering resources based on 'category' field
    const { category } = req.query;
    const query = category ? { category } : {};

    const resources = await resourceModel.find(query).lean();

    return res.status(200).json(resources);
  } catch (error) {
    console.error("Error searching resources:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching resources" });
  }
};

exports.sortResources = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    // Example: Sorting resources by 'createdAt' field in ascending order
    const resources = await resourceModel.find().sort({ createdAt: 1 }).lean();

    return res.status(200).json(resources);
  } catch (error) {
    console.error("Error sorting resources:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sorting resources" });
  }
};

exports.getResourceCount = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const parsedFields = req.query;

    const aggregationPipeline = [];

    // Check if there are no parsed fields
    if (Object.keys(parsedFields).length === 0) {
      // If no parsed fields, return total count of documents
      const totalCount = await resourceModel.countDocuments();
      return res.status(200).json({ count: totalCount });
    }

    // Iterate through the parsed fields and construct match stages for each field
    Object.entries(parsedFields).forEach(([key, value]) => {
      if (key !== "page" && key !== "limit") {
        // Exclude pagination parameters, add match stage for each parsed field
        const matchStage = { $match: { [key]: value } };
        aggregationPipeline.push(matchStage);
      }
    });

    // Add group stage to count documents
    aggregationPipeline.push({
      $group: {
        _id: null,
        count: { $sum: 1 }, // Counting documents
      },
    });

    const countResult = await resourceModel.aggregate(aggregationPipeline);

    // Return the count
    if (countResult.length > 0) {
      return res.status(200).json({ count: countResult[0].count });
    } else {
      return res.status(200).json({ count: 0 }); // If no matching documents found
    }
  } catch (error) {
    console.error("Error counting by parsed fields:", error);
    res
      .status(500)
      .json({ error: "An error occurred while counting by parsed fields" });
  }
};

// Partial update of resource fields
exports.updateResourceFields = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { id } = req.params;
    const { body } = req;

    // Check if the request body contains fields to update
    if (!Object.keys(body).length) {
      return res.status(400).json({ error: "No fields to update provided" });
    }

    const updatedResource = await resourceModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    return res.status(200).json(updatedResource);
  } catch (error) {
    console.error("Error updating resource fields:", error);
    res.status(400).json({ error: "Invalid request data" });
  }
};

exports.updatepassword = async (req, res) => {
  const resourceModel = req.resourceModel;
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await resourceModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if current password matches
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid current password" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.calculateField = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { fieldName, method, qFeild, qValue } = req.query;

    let fieldValues;

    if (!fieldName || !method) {
      return res
        .status(400)
        .json({ error: "Please provide fieldName and method" });
    }

    if (qFeild && qValue) {
      fieldValues = await resourceModel
        .find({ [qFeild]: qValue })
        .select(fieldName)
        .lean();
    } else {
      fieldValues = await resourceModel.find().select(fieldName).lean();
    }

    if (!fieldValues || fieldValues.length === 0) {
      return res.status(404).json({ error: "No resources found" });
    }

    let result;
    switch (method.toLowerCase()) {
      case "sum":
        result = fieldValues.reduce((acc, obj) => acc + obj[fieldName], 0);
        break;
      case "average":
        const sum = fieldValues.reduce((acc, obj) => acc + obj[fieldName], 0);
        result = sum / fieldValues.length;
        break;
      case "product":
        result = fieldValues.reduce((acc, obj) => acc * obj[fieldName], 1);
        break;
      case "max":
        result = Math.max(...fieldValues.map((obj) => obj[fieldName]));
        break;
      case "min":
        result = Math.min(...fieldValues.map((obj) => obj[fieldName]));
        break;
      case "count":
        result = fieldValues.length;
        break;
      case "median":
        const sortedValues = fieldValues
          .map((obj) => obj[fieldName])
          .sort((a, b) => a - b);
        const mid = Math.floor(sortedValues.length / 2);
        result =
          sortedValues.length % 2 !== 0
            ? sortedValues[mid]
            : (sortedValues[mid - 1] + sortedValues[mid]) / 2;
        break;
      case "mode":
        const valueMap = {};
        fieldValues.forEach((obj) => {
          const val = obj[fieldName];
          valueMap[val] = (valueMap[val] || 0) + 1;
        });
        const modes = [];
        let maxCount = 0;
        for (const val in valueMap) {
          if (valueMap[val] > maxCount) {
            modes.length = 0;
            modes.push(val);
            maxCount = valueMap[val];
          } else if (valueMap[val] === maxCount) {
            modes.push(val);
          }
        }
        result =
          modes.length === Object.keys(valueMap).length ? "No mode" : modes;
        break;
      default:
        return res.status(400).json({ error: "Invalid method provided" });
    }

    return res.status(200).json({ result });
  } catch (error) {
    console.error("Error calculating field:", error);
    res
      .status(500)
      .json({ error: "An error occurred while calculating field" });
  }
};

exports.getFieldOccurrences = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { fieldName } = req.query;

    if (!fieldName) {
      return res.status(400).json({ error: "Please provide fieldName" });
    }

    const fieldValues = await resourceModel.find().select(fieldName).lean();

    if (!fieldValues || fieldValues.length === 0) {
      return res.status(404).json({ error: "No resources found" });
    }

    const valueMap = {};
    fieldValues.forEach((obj) => {
      const val = obj[fieldName];
      valueMap[val] = (valueMap[val] || 0) + 1;
    });

    return res.status(200).json({ occurrences: valueMap });
  } catch (error) {
    console.error("Error finding field occurrences:", error);
    res
      .status(500)
      .json({ error: "An error occurred while finding field occurrences" });
  }
};

exports.filterByTimeRange = async (req, res) => {
  const resourceModel = req.resourceModel;

  try {
    const { startTime, endTime } = req.query;

    if (!startTime || !endTime) {
      return res
        .status(400)
        .json({ error: "Please provide startTime and endTime" });
    }

    const filteredResources = await resourceModel
      .find({
        createdAt: { $gte: new Date(startTime), $lte: new Date(endTime) },
      })
      .lean();

    if (!filteredResources || filteredResources.length === 0) {
      return res
        .status(404)
        .json({ error: "No resources found within the specified time range" });
    }

    return res
      .status(200)
      .json({ count: filteredResources.length, data: filteredResources });
  } catch (error) {
    console.error("Error filtering by time range:", error);
    res
      .status(500)
      .json({ error: "An error occurred while filtering by time range" });
  }
};

exports.forecast = async (req, res) => {
  try {
    const location = req.query.location;
    const key = process.env.WAPI_KEY;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${key}&contentType=json`,
      headers: {},
    };

    const response = await axios.request(config);
    const forecastData = response.data;

    res.status(200).json(forecastData);
  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      res.status(500).json({ error: "No response from the server" });
    } else {
      res.status(500).json({ error: "An error occurred" });
    }
  }
};

exports.pay = async (req, res) => {
  try {
    const service = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "mwk",
            product_data: {
              name: service.name,
              images: [service.image],
            },
            unit_amount: service.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://akuka.vercel.app`,
      cancel_url: `https://akuka.vercel.app`,
    });

    return res.status(200).json({ checkout_url: session.url });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error occurred", error: e.message });
  }
};

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      JSON.stringify(req.body),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      await handleCheckoutSessionCompleted(session);
      break;
    // ... handle other events
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

const handleCheckoutSessionCompleted = async (session) => {
  const customer = await stripe.customers.retrieve(session.customer);
  const paymentIntent = await stripe.paymentIntents.retrieve(
    session.payment_intent
  );
  const invoice = await stripe.invoices.retrieve(paymentIntent.invoice);

  // Access invoice and payment details
  console.log("Customer Email:", customer.email);
  console.log("Invoice Amount:", paymentIntent.amount / 100);
  console.log("Invoice Currency:", invoice.currency);
  console.log("Invoice PDF:", invoice.hosted_invoice_url);

  // You can store these details in your database or perform any other required operations
};

exports.login = async (req, res) => {
  const resourceModel = req.resourceModel;
  try {
    const { email, password } = req.body;
    console.log(req.body);
    // Find the user in the database by their fullname or email
    const user = await resourceModel.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const accessToken = jwt.sign(user.email, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({
        message: "Login successful",
        accessToken: accessToken,
        user: user,
      });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

exports.register = async (req, res) => {
  const resourceModel = req.resourceModel;
  try {
    if (Array.isArray(req.body)) {
      // Bulk registration for an array of users
      const hashedUsers = [];
      for (const user of req.body) {
        if (!user.password) {
          return res
            .status(400)
            .json({ error: "Password is required for all users" });
        }
        // Generate a salt and hash the user's password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        // Create a new user in the database with the hashed password
        const newUser = await resourceModel.create({
          ...user,
          password: hashedPassword,
        });
        hashedUsers.push(newUser);
      }
      res.status(201).json({
        message: "Users registered successfully",
        users: hashedUsers,
      });
    } else {
      // Single user registration
      const { password } = req.body;
      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await resourceModel.create({
        ...req.body,
        password: hashedPassword,
      });
      res.status(201).json({ message: "User registered successfully", user });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user(s)" });
  }
};

exports.getProfile = async (req, res) => {
  const resourceModel = req.resourceModel;
  const fullname = req.user;
  try {
    const User = await resourceModel.findOne({ fullname: fullname });
    return res.status(200).json(User);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.sendEmail = async (req, res) => {
  try {
    const { Logo, subject, recipientEmail, message } = req.body;

    if (!subject || !recipientEmail || !message) {
      return res
        .status(400)
        .json({
          error:
            "Please provide subject, recipientEmail, and message in the request body",
        });
    }

    await sendMail(Logo, subject, recipientEmail, message);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "An error occurred while sending email" });
  }
};



exports.addFCMToken = async (req, res) => {
  const Model = req.resourceModel;
  try {
    const { userId, token } = req.body;
    const user = await Model.findByIdAndUpdate(
      userId,
      { $addToSet: { fcmTokens: token } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "FCM token added successfully", user });
  } catch (error) {
    console.error("Error adding FCM token:", error);
    res.status(500).json({ error: "An error occurred while adding FCM token" });
  }
};

exports.removeFCMToken = async (req, res) => {
  const Model = req.resourceModel;
  try {
    const { userId, token } = req.body;
    const user = await Model.findByIdAndUpdate(
      userId,
      { $pull: { fcmTokens: token } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "FCM token removed successfully", user });
  } catch (error) {
    console.error("Error removing FCM token:", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing FCM token" });
  }
};

exports.getUserFCMTokens = async (req, res) => {
  const Model = req.resourceModel;
  try {
    const { userId } = req.params;
    const user = await Model.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res
      .status(200)
      .json({ message: "FCM tokens retrieved successfully", user });
  } catch (error) {
    console.error("Error retrieving FCM tokens:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving FCM tokens" });
  }
};

exports.sendPushNotification =async (req, res) => {
  const { title, body, icon, tokens } = req.body;

  if (!Array.isArray(tokens) || tokens.length === 0) {
    return res.status(400).json({ error: "Invalid or empty tokens array" });
  }

  const message = {
    notification: {
      title: title,
      body: body,
    },
    webpush: {
      notification: {
        icon: icon,
      },
    },
  };

  const sendPromises = tokens.map(token => 
    admin.messaging().send({ ...message, token })
      .catch(error => {
        console.error(`Failed to send message to token ${token}:`, error);
        return { error: error.code, errorMessage: error.message, token };
      })
  );

  try {
    const results = await Promise.all(sendPromises);

    const successCount = results.filter(result => !result.error).length;
    const failureCount = results.filter(result => result.error).length;
    const failedResults = results.filter(result => result.error);

    console.log(`Successfully sent ${successCount} messages, failed to send ${failureCount} messages.`);
    console.log('Failed results:', JSON.stringify(failedResults, null, 2));

    res.status(200).json({
      message: "Notifications processed",
      successCount,
      failureCount,
      failedResults
    });
  } catch (error) {
    console.log("Error sending messages:", error);
    res.status(500).json({
      error: "An error occurred while sending notifications",
      message: error.message,
    });
  }
};
exports.sendWebPushNotification = async (req, res) => {
  // This registration token comes from the client FCM SDKs.

  const { title, body, icon, registrationToken } = req.body;

  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: registrationToken,
    webpush: {
      notification: {
        icon: icon,
      },
    },
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);

      res.status(200).json({ message: "Notification sent successfully" });
    })
    .catch((error) => {
      console.log("Error sending message:", error);

      res
        .status(500)
        .json({
          error: "An error occurred while sending notification",
          message: error.message,
        });
    });
};

exports.socialLogin = async (req, res) => {
  const resourceModel = req.resourceModel;
  try {
    const { idToken } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, picture } = decodedToken;

    // Check if the user already exists
    let user = await resourceModel.findOne({ email });

    if (!user) {
      // If the user doesn't exist, create a new one
      user = await resourceModel.create({
        email,
        fullname: name,
        undefined: picture, // Profile picture
        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10), // Generate a random password
        // Set other required fields with default values
      });
    }

    const accessToken = jwt.sign(user.email, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({
      message: "Social login successful",
      accessToken: accessToken,
      user: user,
    });
  } catch (error) {
    console.error("Error during social login:", error);
    res.status(500).json({ error: "An error occurred during social login" });
  }
};