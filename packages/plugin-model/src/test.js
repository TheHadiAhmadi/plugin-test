import model from './index.js'
console.log('started')
let x = {}
model({}).init(x)




const AddTodo=async(ctx)=>{

    await ctx.addModel({
        name: 'Todo',
        collectionName: "todo",
        schema: () => ({
            title: string().required(),
            prop2: string()
        })
    })

}
const insertTodo = async(ctx)=>{
   const totos = await ctx.models.Todo.insert({title: 'a',prop2: "somethinng"})
}
const getTodo = async(ctx)=>{
   const todos = await ctx.models.Todo.get({title: 'a'})
   console.log('todos: ', todos)
}

await AddTodo(x)
// await insertTodo(x)
await getTodo(x)


