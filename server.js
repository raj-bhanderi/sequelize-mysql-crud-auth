const express = require("express");
const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");
const app = express();
// const { expressMiddleware } = require('@apollo/server/express4');
// const createApolloGraphqlServer = require('./graphql');
require("dotenv").config();

// async function init() {

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.json({ status: 200, message: "hello" });
});

// app.use(
//     "/graphql",
//     expressMiddleware(await createApolloGraphqlServer())
//   );

app.listen(3000, () => console.log("connect running..."));
// }

// init()
