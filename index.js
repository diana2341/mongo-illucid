const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const ObjectID = require("mongodb").ObjectID;
var mongodb = require("mongodb");

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
	"mongodb+srv://diana2341:LJWw7SWUtmNwavsF@cluster0.xtynd.mongodb.net/?retryWrites=true&w=majority",
	{ useUnifiedTopology: true }
)
	.then((client) => {
		console.log("Connected to Database");
		const db = client.db("illucid");
		const mixesCollection = db.collection("mixes");
		app.post("/mixes", (req, res) => {
			console.log(req, res);
			mixesCollection
				.insertOne(req.body)

				.then((result) => {
					console.log(result);
				})
				.catch((error) => console.error(error));
		});

		//

		app.get("/mixes", (req, res) => {
			console.log(req.query.user_id )
			db.collection("mixes")
				.find()

				.toArray()
				.then((results) => {
					console.log(results);
					res.send(results);
				})
				.catch((error) => console.error(error));
		});

		//
		app.delete("/mixes", (req, res) => {
			console.log(req.body.id, "????");
			mixesCollection
				.deleteOne({ _id: new mongodb.ObjectID(req.body.id.toString()) })
				.then((result) => {
					res.json(`Deleted mix`);
				})
				.catch((error) => console.error(error));
		});
	})
	.catch((error) => console.error(error));

app.listen('https://mongo-illucid.herokuapp.com', function () {
	console.log("listening on 3000");
});

// app.get("/", (req, res) => {
// 	res.sendFile(__dirname + "/index.html");
// });
// app.post("/mixes", (req, res) => {
// 	console.log(req.body);
// });
