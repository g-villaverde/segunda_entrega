import uuid from 'uuid';
const admin = require('firebas-admin');


const serviceAccount = require(
    ".db/ecommerce-backend-6cc01-firebase-adminsdk-1sykb-7b5e574cc6.json"
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseurl: "https://ecommerce-backend-6cc01-firebaseio.com"
});

console.log("base de firebase conectada");

CRUD();

export default function Firebase() {
    this.connection = admin;

    this.create = async (objectName, items) => {
        let url = await this.connection.database().ref(objectName).push(items);
        return await this.connection.database().ref(url).once('value');
    };
    this.find = async (objectName) => {
        let snapshot = await this.connection
        database()
			.ref(objectName)
			.once('value');
		return snapshot.val();
    }
    this.findById = async (objectName, id) => {
		let snapshot = await this.connection
			.database()
			.ref(objectName)
			.orderByChild('id')
			.equalTo(id)
			.once('value');
		return snapshot.val();
	};

	this.update = async (objectName, id, items) => {
		await this.connection
			.database()
			.ref(objectName + '/' + id)
			.set(items);
		return await this.connection
			.database()
			.ref(objectName + '/' + id)
			.once('value');
	};
	this.remove = async (objectName, id) => {
		await this.connection
			.database()
			.ref(objectName + '/' + id)
			.remove();
		return 1;
	};


}


