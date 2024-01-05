const sdk = require("node-appwrite");
// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // Why not try the Appwrite SDK?
  //
  const client = new sdk.Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  // You can log messages to the console
  log("Hello, Logs!");

  // If something goes wrong, log an error
  error("Hello, Errors!");

  // The `req` object contains the request data
  if (req.method === "POST") {
    // Send a response with the res object helpers
    // `res.send()` dispatches a string back to the client
    const userId = req.body.$id;
    const database = new sdk.Databases(client);

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
};
