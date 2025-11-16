import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  return res.json({
    message: "Contact form received",
    data: { name, email, subject, message }
  });
});

export default router;
