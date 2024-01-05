// Perform all your imports
const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client();
  if (
    !process.env.APPWRITE_FUNCTION_PROJECT_ID ||
    !process.env.APPWRITE_API_KEY ||
    !process.env.DATABASE_ID ||
    !process.env.DATABASE_COLLECTION
  ) {
    console.warn(
      "Environment variables are not set. Function cannot use Appwrite SDK.",
    );
  } else {
    client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);
  }

  const database = new sdk.Databases(client);
  try {
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

    return res.json({
      profile: "Profile created successfully",
    });
  } catch (error) {
    return res.json({ error: "Internal Server Error" });
  }
};
