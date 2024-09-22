const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post("/bfhl", (req, res) => {
  console.log("Request Body:", req.body);
  const { data, file_b64 } = req.body;

  if (!data || !Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid input" });
  }

  // Filter numbers and alphabets
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));

  // Filter lowercase letters and find the highest lowercase letter
  const lowercaseAlphabets = alphabets.filter((item) => /^[a-z]$/.test(item));
  const highestLowercaseAlphabet =
    lowercaseAlphabets.sort((a, b) => a.localeCompare(b)).pop() || null;

  // File handling
  let fileValid = false;
  let fileMimeType = null;
  let fileSizeKB = null;

  if (file_b64) {
    try {
      // Decode the base64-encoded file
      const buffer = Buffer.from(file_b64, "base64");
      fileSizeKB = (buffer.length / 1024).toFixed(2); // Convert to KB
      fileMimeType = "application/octet-stream"; // You can improve this with actual MIME type detection
      fileValid = true;
    } catch (error) {
      fileValid = false;
    }
  }

  // Send response
  res.json({
    is_success: true,
    user_id: "Sahajdeep_Singh_11022003", // Format full_name_ddmmyyyy
    email: "ss4684@srmist.edu.in",
    roll_number: "RA2111003011651",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB,
  });
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
