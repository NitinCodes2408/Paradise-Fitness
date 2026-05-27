const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Test Route */
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

/* Contact Form Route */
app.post("/contact", (req, res) => {
    const { name, phone, email, message } = req.body;

    console.log("New Enquiry:");
    console.log(name, phone, email, message);

    res.json({
        success: true,
        message: "Enquiry received successfully"
    });
});

/* Start Server */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});