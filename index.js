const express = require("express");
const cors = require("cors");
const connectDb = require("./database/dbConnect");
const userRouter = require("./routes/user.routes");
const teamRouter = require("./routes/team.routes");
const projectRouter = require("./routes/project.routes");
const tagRouter = require("./routes/tag.routes");
const tasksRouter = require("./routes/tasks.routes");

const morgan = require("morgan");

const app = express();

app.use(cors({
  origin:"*",
  optionsSuccessStatus:200,
  credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

connectDb();

app.get("/", (req, res) => {
  res.send(` 
<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>My First Webpage</title>
        </head>

        <body>
            <h1>Welcome to workflow backend</h1>
            <a href="/tasks">tasks</a>
        </body>
    </html>
    `);
});

app.use("/auth", userRouter);
app.use("/team", teamRouter);
app.use("/project", projectRouter);
app.use("/tags", tagRouter);
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
