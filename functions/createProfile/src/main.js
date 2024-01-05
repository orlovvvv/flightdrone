const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use
  const account = new sdk.Account(client);
  try {
    if (req.method === "POST") {
      const userId = req.body.$id; // Assuming the user ID is in the request body

      // Call the createProfile function to create a profile entry
      const profile = await createProfile(userId);

      log("Profile created:", profile);

      return res.json({
        message: "Profile created successfully",
      });
    } else {
      return res.send("Hello, World!");
    }
  } catch (error) {
    console.error("Error handling user registration:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

async function createProfile(userId) {
  try {
    const profileData = {
      user_id: userId,
      // Add other profile properties as needed
    };

    // Create a new profile document in the 'Profile' collection
    const profile = await sdk.createDocument(
      process.env.DATABASE_ID,
      process.env.DATABASE_COLLECTION,
      profileData,
    );

    return profile;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
}
