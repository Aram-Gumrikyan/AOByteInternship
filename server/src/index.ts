import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import controllers from "./controllers";

dotenv.config({ path: __dirname + '\\.env' });
const app: Application = express();

app.use(cors({
	origin: "http://localhost:3000",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

controllers.forEach(controller => {
	app.use("/", controller.router);
});

const DB_URL: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.k4hnt.mongodb.net/aobyte?retryWrites=true&w=majority`;

async function start() {
	try {
		await mongoose.connect(DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		app.listen(process.env.PORT, (): void => {
			console.log(`app is running on ${process.env.PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();