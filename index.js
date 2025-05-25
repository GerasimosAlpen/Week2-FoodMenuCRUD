import express from "express"
import menuRoutes from "./routes/menuRoute.js"

const app = express();
const port = process.env.PORT || 3008;

// gunakan cors

app.use(express.json())

app.get("/", (req, res) => {
  res.send("server on boarding");
})

app.use("/menu", menuRoutes);

app.listen(port, () => {
  console.log(`server lagi jalan di http://localhost:${port}`);
});
