import { MongoClient, ServerApiVersion } from'mongodb';
import {uri as dbUri, databaseName as dbName} from './config.js'
import pkg from 'yup'

const { AnyObject, AnyObjectSchema, AnySchema, ArraySchema,  Asserts, BooleanSchema, CastOptions, CreateErrorOptions, DateSchema, DefaultFromShape, Defined, Flags, ISchema, InferType, LocaleObject, MakePartial, Maybe, Message, MixedOptions, MixedSchema,  MixedTypeGuard, NotNull, NumberSchema, ObjectSchema, ObjectShape, Optionals, Schema, SchemaDescription, SchemaFieldDescription, SchemaInnerTypeDescription, SchemaLazyDescription, SchemaObjectDescription, SchemaRefDescription, SetFlag, StringSchema, TestConfig, TestContext, TestFunction, TestOptions, Thunk, ToggleDefault, TupleSchema, TypeFromShape, UnsetFlag, ValidateOptions, ValidationError, addMethod,  array, bool,  boolean, date,  defaultLocale, getIn, isSchema,  lazy,  mixed,  number,  object, reach,  ref, setLocale,  string, tuple } = pkg;
class Model {
    uri = dbUri
    databaseName = dbName
    client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true , serverApi: ServerApiVersion.v1});
    collectionName;
    validator;
    schema;
    database;
    collection;

    constructor(uri, databaseName){
        console.log("model init")
        this.uri = uri
        this.databaseName = databaseName
    }

  
    setSchema(schema){
        this.schema = object(schema())
    }

    validate(data) {
        // Validate the data against the schema
        console.log('data: ', data)
        this.schema.validate(data)
            .then(validData => {
                console.log("valid data: ", validData); // { name: 'John Doe', email: 'johndoe@example.com', age: 30, password: 'password123' }
            })
            .catch(err => {
                console.log('error: ', err); // ['Password must be at least 8 characters']
                throw new Error(err.errors)
            });
    }
    
    setCollection(collectionName){
        this.collectionName = collectionName
        this.collection = this.database.collection(this.collectionName)
    }
    getCollection(collectionName){
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
    async createCollection(collectionName, validator){
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
          const collection = await this.database.collection(collectionName , validator == undefined? undefined : options);
          this.collection = collection
          return collection;
    }

    async initializeDatabase(databaseName) {
        try {
          // Connect to the MongoDB instance
          
          console.log("Connecting to the MongoDB database...");
          await this.client.connect();
          console.log("Connected.");

          // Get the reference to the database
          this.database = await this.client.db(databaseName)

        } catch(error) {
          console.error(error);
        }
      }
}


/**
 * @type {import('.').modelFactory}
 */
export default function (config){
    return {
        name: 'Model',
        /**
         * @param {import('.').ModelContext} ctx */
        init(ctx){            
              /**
               * @param {import('.').Model} model */
            ctx.addModel = async (model)=>{
                let uri = dbUri
                let databaseName =dbName
                if(config?.uri != undefined) uri = config.uri
                if(config?.databaseName != undefined) databaseName = config.databaseName
                let newModel = new Model(uri, databaseName)
                await newModel.initializeDatabase(databaseName)
                newModel.setSchema(model.schema)
                await newModel.createCollection(model.collectionName)
                ctx.models={}
                ctx.models[model.name] = newModel
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
//    const totos = ctx.models.Todo.get({/**query */})
// }

