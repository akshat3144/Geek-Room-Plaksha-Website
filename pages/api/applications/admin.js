import dbConnect from "@/lib/mongodb";
import Application from "@/models/application";

export default async function handler(req, res) {
  await dbConnect();

  // Basic security check - in a real app use a proper auth system
  const isAdmin = req.headers.authorization === process.env.ADMIN_API_KEY;

  try {
    // GET - Fetch all applications
    if (req.method === "GET") {
      const applications = await Application.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ applications });
    }

    // PUT - Update application status
    else if (req.method === "PUT") {
      const { id, status } = req.body;

      if (
        !id ||
        !status ||
        !["pending", "approved", "rejected"].includes(status)
      ) {
        return res.status(400).json({ error: "Invalid request parameters" });
      }

      const application = await Application.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }

      return res.status(200).json({ application });
    }

    // DELETE - Delete an application
    else if (req.method === "DELETE") {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Application ID is required" });
      }

      const application = await Application.findByIdAndDelete(id);

      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }

      return res
        .status(200)
        .json({ message: "Application deleted successfully" });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
