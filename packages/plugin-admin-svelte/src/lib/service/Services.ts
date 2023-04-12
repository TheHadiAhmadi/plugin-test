import { BaseService } from "./base/BaseService";
import { store } from "$lib/globalStore/store";
import type { userType } from "$lib/types/userType";


type User = {
  name: string;
  email: string;
  age?: number;
  id: number;
};

class UserServiceClass extends BaseService<User> {
  constructor() {
    super("/user");
  }

  async signIn(user: userType){
    try {
        const res = await this.fetch('/signin', 'POST', user)
        console.log("user signed in:",res)
        if(res?.statusText == 'OK' ){
          store.update(oldValue => {
            let newValue = oldValue
            newValue.user = res.data
            return newValue
          })
        }
        return res
    } catch (error) {
        console.log(error.message)
    }
  }

  async signUp(user: userType){
    try {
      console.log('signing up: ', user)
        const res =await UserService.insert(user)
        return res
    } catch (error) {
        console.log(error.message)
    }
  }
}

export const UserService = new UserServiceClass();

export type Product = {
  name: string;
  sku: string;
  count: number;
  id: number;
};

class ProductServiceClass extends BaseService<Product> {
  constructor() {
    super("/products");
  }
}

export const ProductService = new ProductServiceClass();

export type Todo = {
  title?: string;
  description?: string;
  done?: boolean;
};
class TodoServiceClass extends BaseService<Todo> {
  constructor() {
    super("/todos");
  }

  done(id: number) {
    super.fetch("/" + id, "PUT", { done: true });
  }
}

export const TodoService = new TodoServiceClass();
