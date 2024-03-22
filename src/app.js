import express from "express";
import config from "./config/config.js";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { viewsRouter } from "./routes/views.routes.js";
import sessionRouter from "./routes/session.routes.js";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import {
  createProductService,
  deleteOneProductService,
  findProductsService,
} from "./dao/mongo/services/products.service.js";
import {
  createMessageService,
  findMessagesService,
} from "./dao/mongo/services/message.service.js";
import { addLogger } from "./utils/logger.js";

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

app.use(addLogger)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/session", sessionRouter);

mongoose.connect(config.connectMongo);

io.on("connection", async (socket) => {
  let products = await findProductsService();

  socket.emit("products", { products });

  socket.on("createProduct", async (producto) => {
    await createProductService(producto);
    products = await findProductsService();
    socket.emit("products", { products });
  });

  socket.on("deleteProduct", async (id) => {
    await deleteOneProductService({ _id: id });
    products = await findProductsService();
    socket.emit("products", { products });
  });

  let messages = await findMessagesService();

  socket.emit("chat", { messages });

  socket.on("newMessage", async (message) => {
    await createMessageService(message);
    messages = await findMessagesService();
    io.emit("chat", { messages });
  });
});
