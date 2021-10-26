import {classes} from './index.js';
import {configs} from '../../configs/index.js';
const {Sql, MongoDb, Firebase} = classes;
const {mySqlOptions, sqliteOptions, mongoDbConfigs} = configs;

export default function DbConnection(id) {
	this.instance =
		id == 1
			? new Sql(mySqlOptions)
			: id == 2
			? new MongoDb(mongoDbConfigs.localUrl, mongoDbConfigs.options)
			: id == 3
			? new Firebase()
}
