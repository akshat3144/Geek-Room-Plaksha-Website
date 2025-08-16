import formidable from "formidable";
import { Buffer } from "buffer";
import fs from "fs";
import dbConnect from "@/lib/mongodb";
import Application from "@/models/application";

export const config = {
  api: {
    bodyParser: false
  }
};

const processFile = async (file) => {
  // The file is actually coming as an array in some cases - handle both cases
  const fileToProcess = Array.isArray(file) ? file[0] : file;

  // Double-check the file object
  if (!fileToProcess || !fileToProcess.filepath) {
    console.error("Invalid file object or missing filepath:", fileToProcess);
    return null;
  }

  try {
    // Read the file as a buffer
    const fileBuffer = Buffer.from(
      await fs.promises.readFile(fileToProcess.filepath)
    );

    // Determine the mime type based on the file extension
    const fileName = fileToProcess.originalFilename || "";
    const extension = fileName.split(".").pop().toLowerCase();

    let mimeType = "application/octet-stream"; // default mime type
    if (extension === "pdf") {
      mimeType = "application/pdf";
    } else if (["doc", "docx"].includes(extension)) {
      mimeType = "application/msword";
    } else if (["txt", "rtf"].includes(extension)) {
      mimeType = "text/plain";
    }

    // Convert the file to base64 for MongoDB storage
    const base64File = fileBuffer.toString("base64");

    // Create a data URI that can be used to display the file
    const dataUri = `data:${mimeType};base64,${base64File}`;

    console.log(
      "File processed successfully, size:",
      fileBuffer.length,
      "bytes"
    );
    return dataUri;
  } catch (error) {
    console.error("Error processing file:", error);
    return null;
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const form = formidable({ multiples: true }); // Enable multiples to handle arrays better

    return new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Form parsing error:", err);
          res.status(500).json({ error: "Error parsing form" });
          return resolve();
        }

        try {
          // Get field values, handling arrays properly
          const name = Array.isArray(fields.name)
            ? fields.name[0]
            : fields.name;
          const email = Array.isArray(fields.email)
            ? fields.email[0]
            : fields.email;
          const whyJoin = Array.isArray(fields.whyJoin)
            ? fields.whyJoin[0]
            : fields.whyJoin;

          console.log("Processing fields:", { name, email, whyJoin });

          // Validate required fields
          if (!name || !email || !whyJoin) {
            res.status(400).json({ error: "Missing required fields" });
            return resolve();
          }

          // Process application data
          const applicationData = {
            name,
            email,
            whyJoin
          };

          // Handle resume upload if provided
          if (files.resume) {
            const fileToProcess = Array.isArray(files.resume)
              ? files.resume[0]
              : files.resume;
            console.log(
              "Resume file received:",
              fileToProcess.originalFilename
            );

            const dataUri = await processFile(files.resume);
            if (dataUri) {
              console.log(
                "Resume processed successfully and ready for storage"
              );
              applicationData.resumeUrl = dataUri;
              applicationData.resumeFileName = fileToProcess.originalFilename;
              applicationData.resumeFileType =
                fileToProcess.mimetype ||
                (fileToProcess.originalFilename.endsWith(".pdf")
                  ? "application/pdf"
                  : fileToProcess.originalFilename.endsWith(".doc")
                  ? "application/msword"
                  : fileToProcess.originalFilename.endsWith(".docx")
                  ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  : "application/octet-stream");
            } else {
              console.error("Failed to process resume file");
            }
          } else {
            console.log("No resume file uploaded");
          }

          // Save to database
          const application = new Application(applicationData);
          await application.save();

          res.status(201).json({
            success: true,
            message: "Application submitted successfully!"
          });
          resolve();
        } catch (error) {
          console.error("Error processing application:", error);
          res.status(500).json({ error: "Error processing application" });
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
