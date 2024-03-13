import express from "express";
import config from "./config/config.js";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { productModel } from "./dao/mongo/models/product.model.js";
import { messageModel } from "./dao/mongo/models/message.model.js";
import { viewsRouter } from "./routes/views.routes.js";
import sessionRouter from "./routes/session.routes.js";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";


const PORT = +config.port;
const app = express();
const httpServer = app.listen(PORT, () => {
  console.log(`Esperando entrada en puerto: ${PORT}`);
});

const io = new Server(httpServer);

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());
app.use(cookieParser());

const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
});

app.engine("handlebars", hbs.engine);
app.set("views", "src/views");
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/session", sessionRouter);

mongoose.connect(
  config.connectMongo
);

io.on("connection", async (socket) => {
  let products = await productModel.find();

  socket.emit("products", { products });

  socket.on("createProduct", async (producto) => {
    await productModel.create(producto);
    products = await productModel.find();
    socket.emit("products", { products });
  });

  socket.on("deleteProduct", async (id) => {
    await productModel.deleteOne({ _id: id });
    products = await productModel.find();
    socket.emit("products", { products });
  });

  let messages = await messageModel.find();

  socket.emit("chat", { messages });

  socket.on("newMessage", async (message) => {
    await messageModel.create(message);
    messages = await messageModel.find();
    io.emit("chat", { messages });
  });
});
