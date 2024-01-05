// Perform all your imports
const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client();
  //   if (
  //   !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
  //   !req.variables['APPWRITE_FUNCTION_API_KEY']
  // ) {
  //   console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
  // } else {
  //   client
  //     .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
  //     .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
  //     .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
  //     .setSelfSigned(true);
  // }

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const database = new sdk.Databases(client);

  if (req.method === "POST") {
    // Send a response with the res object helpers
    // `res.send()` dispatches a string back to the client

    try {
      if (req.method === "POST") {
        const userId = req.body.$id; // Assuming the user ID is in the request body

        const profileData = {
          userId: userId,
          // Add other profile properties as needed
        };

        // Call the createProfile function to create a profile entry
        const profile = await database.createDocument(
          process.env.DATABASE_ID,
          process.env.DATABASE_COLLECTION,
          profileData,
        );

        log("Profile created:", profile);

        return res.json({
          message: "Profile created successfully",
        });
      } else {
        return res.send("Hello, World!");
      }
    } catch (error) {
      log("Error handling user registration:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  res.json({
    areDevelopersAwesome: true,
  });
};
