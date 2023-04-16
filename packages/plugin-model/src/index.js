
import { MongoClient, ServerApiVersion } from'mongodb';
import {uri as dbUri, databaseName as dbName} from './config'
import { AnyObject, AnyObjectSchema, AnySchema, ArraySchema,  Asserts, BooleanSchema, CastOptions, CreateErrorOptions, DateSchema, DefaultFromShape, Defined, Flags, ISchema, InferType, LocaleObject, MakePartial, Maybe, Message, MixedOptions, MixedSchema,  MixedTypeGuard, NotNull, NumberSchema, ObjectSchema, ObjectShape, Optionals, Schema, SchemaDescription, SchemaFieldDescription, SchemaInnerTypeDescription, SchemaLazyDescription, SchemaObjectDescription, SchemaRefDescription, SetFlag, StringSchema, TestConfig, TestContext, TestFunction, TestOptions, Thunk, ToggleDefault, TupleSchema, TypeFromShape, UnsetFlag, ValidateOptions, ValidationError, addMethod,  array, bool,  boolean, date,  defaultLocale, getIn, isSchema,  lazy,  mixed,  number,  object, reach,  ref, setLocale,  string, tuple } from 'yup';
class Model {
    uri = dbUri
    databaseName = dbName
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true , serverApi: ServerApiVersion.v1});
    collectionName;
    validator;
    schema;
    database;
    collection;

    constructor(uri, databaseName){
        this.uri = uri
        this.databaseName = databaseName
        this.initializeDatabase(this.databaseName)
    }
    constructor(collectionName){
        this.collectionName = collectionName
        this.initializeDatabase(this.databaseName)
        this.setCollection(this.collectionName)
        return this.collection
    }
    setSchema(shcema){
        this.schema = object(schema)
    }

    validate(data) {
        // Validate the data against the schema
        this.schema.validate(data)
            .then(validData => {
                console.log(validData); // { name: 'John Doe', email: 'johndoe@example.com', age: 30, password: 'password123' }
            })
            .catch(err => {
                console.log(err.errors); // ['Password must be at least 8 characters']
                throw new Error(err.errors)
            });
    }
    
    setCollection(collectionName){
        this.collectionName = collectionName
        this.collection = this.database.collection(this.collectionName)
    }
    collection(collectionName){
        this.collectionName = collectionName
        this.collection = this.database.collection(this.collectionName)
        return this.collection
    }

    async insert(document) {
        try {
          //validate
          this.validate(document)
          // Insert the document into the collection
          const result = await this.collection.insertOne(document);
          console.log(`${result.insertedCount} document(s) has been created`);
          return result;
        } catch(error) {
          console.error(error);
        }
      }
    
    async get(query) {
      try {
        // Find documents that match the specified query
        const result = await this.collection.find(query).toArray();
        console.log(`${result.length} document(s) has been found`);
        return result;
      } catch(error) {
        console.error(error);
      }
    }
    
    async update(update, filter ) {
      try {
        //validate
        this.validate(document)
        // Update documents that match the specified filter
        const result = await this.collection.updateMany(filter, update);
        console.log(`${result.modifiedCount} document(s) has been updated`);
        return result;
      } catch(error) {
        console.error(error);
      }
    }
    
    async remove(filter) {
      try {
        // Delete documents that match the specified filter
        const result = await this.collection.deleteMany(filter);
        console.log(`${result.deletedCount} document(s) has been deleted`);
        return result;
      } catch(error) {
        console.error(error);
      }
    }
    
    // Migrations
    async migrateData(collection, migrationInfo) {
      // implement the migration logic here
    }
    createCollection(collectionName, validator){
        // Define the validation schema for the collection
        this.validator=validator
        // this.validator = {
        //     $jsonSchema: {
        //       bsonType: "object",
        //       required: ["name", "age"],
        //       properties: {
        //         name: {
        //           bsonType: "string",
        //           description: "must be a string and is required"
        //         },
        //         age: {
        //           bsonType: "int",
        //           description: "must be an integer and is required"
        //         },
        //         email: {
        //           bsonType: "string",
        //           pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
        //           description: "must be a valid email address"
        //         }
        //       }
        //     }
        //   };
      
          // Create the collection with the specified schema and options
          const options = { validator };
          const collection = this.database.collection(collectionName, (validator == undefined)? undefined : options);
          this.collection = collection
          return collection;
    }

    async initializeDatabase(databaseName) {
        try {
          // Connect to the MongoDB instance
          await client.connect();
          console.log("Connected to the MongoDB database");

          // Get the reference to the database
          this.database = client.db(databaseName)
        } catch(error) {
          console.error(error);
        }
      }
}



export default (config)=>{
    return {
        name: 'Model',
        init(ctx){
            /** 
             * @model 
             *{ name: string,
             * collectionName: string,
             * schema: {} }
             * 
            */
            ctx.addModel = (model)=>{
                let uri = dbUri
                let databaseName =dbName
                if(config?.uri != undefined) uri = config.uri
                if(config?.databaseName != undefined) databaseName = config.databaseName
                let name = model.name
                let newModel = new Model(uri, databaseName)
                newModel.schema = model.schema
                newModel.createCollection(model.collectionName)
                ctx.models.name = newModel
            }
        }
    }
}


//adds model and schema
// const AddTodo=(ctx)=>{
//     ctx.addModel({
//         name: 'Todo',
//         collectionName: todo,
//         schema: {
//             title: string().required(),
//             prop2: string(),
//         }
//     })
// }
// const getTodo = (ctx)=>{
//     const totos = ctx.models.Todo.get({/**query */})
// }

