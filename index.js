const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post("/bfhl", (req, res) => {
  console.log("Request Body:", req.body);
  const { data } = req.body;
  if (!data || !Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid input" });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
  const highestAlphabet = alphabets.sort((a, b) => a.localeCompare(b)).pop();

  res.json({
    is_success: true,
    user_id: "Sahajdeep_Singh_11022003",
    email: "ss4684@srmist.edu.in",
    roll_number: "RA2111003011651",
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet,
  });
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server port : ${port}`);
});
