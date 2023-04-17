import { Db, Collection } from 'mongodb';
import { Plugin } from '@undefined/core';

declare class Model {
    uri: string;
    databaseName: string;
    client: MongoClient;
    collectionName: string;
    validator: object;
    schema: object;
    database: Db;
    collection: Collection;

    constructor(uri: string, databaseName: string);

    setSchema(schema: object): void;

    validate(data: object): Promise<void>;

    setCollection(collectionName: string): void;

    getCollection(collectionName: string): Collection;

    insert(document: object): Promise<object>;

    get(query: object): Promise<Array<object>>;

    update(update: object, filter: object): Promise<object>;

    remove(filter: object): Promise<object>;

    migrateData(collection: Collection, migrationInfo: object): Promise<void>;

    createCollection(collectionName: string, validator: object): Collection;

    initializeDatabase(databaseName: string): Promise<void>;
}

declare interface ModelConfiguration {
    uri?: string;
    databaseName?: string;
}

interface ModelContext{
    addModel(model: { name: string, collectionName: string, schema: object })
}
type modelFactory= (config: ModelConfiguration)=> Plugin<ModelContext>

export { Model, ModelContext, modelFactory };