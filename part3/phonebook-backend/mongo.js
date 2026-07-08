import mongoose from "mongoose";

if (process.argv.length < 3) {
	console.log("please provide password and/or the person and number to add");
	process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://bereketmuluken0_db_user:${password}@cluster0.hdwyimo.mongodb.net/phonebook`;
mongoose.set("strictQuery", false);

const schema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", schema);

async function main() {
	try {
		await mongoose.connect(url, { family: 4 });
		if (process.argv.length === 5) {
			const name = process.argv[3];
			const phone = process.argv[4];

			const person = new Person({
				name: name,
				number: phone,
			});

			await person.save().then((result) => {
				console.log(`Added ${name} number ${phone} to phonebook.`);
			});

		} else {
			await Person.find({}).then((result) => {
        console.log("Phonebook: ")
				result.forEach((res) => console.log(res.name, res.number));
			});
			
		}
    await mongoose.connection.close();
	} catch (err) {
		console.log(`Error: ${err.message}`);
	}
}

main()