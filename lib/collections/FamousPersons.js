import { Mongo } from "meteor/mongo";

const FamousPersons = new Mongo.Collection("famous_persons");

export default FamousPersons;
