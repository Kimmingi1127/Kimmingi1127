// import http from "http";
import express from "express";
import posRoutes from "../routes/post.route.js";

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("OK!");
// });

// Router
// app.get("/users", (req, res) => res.send("모든 사용자 목록"));
// app.post("/users", (req, res) => res.send("사용자 생성"));
// app.get("/users/:id", (req, res) => 
//   res.send(`ID: ${req.params.id} 사용자 조회`)
// );

app.use("/api/v1/posts", posRoutes);

app.listen(3000, () => {
  console.log("OK server was started!");
});

// const server = http.createServer((rep, res) => {
//   res.setHeader("Content-Type", "text/plain; charset=utf-8");
//   res.end("OK!");
// });

// server.listen(3000, () => {
//   console.log("OK server was started!");
// });
