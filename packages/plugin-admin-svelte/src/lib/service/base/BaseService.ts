import { API_URL } from "$lib/config";
import { store } from "$lib/globalStore/store";
import { get } from "svelte/store";

export type SortParams = {
  field: string;
  order: "ASC" | "DESC";
};

export type IParams = {
  filters?: string[];
  sort?: SortParams;
  page?: number;
  perPage?: number;
  fields?: string[];
};

export type IList<T> = {
  data: T[];
  total: number;
  perPage: number;
  page: number;
};

export class BaseService<T> {
  path = "";
  constructor(path: string) {
    this.path = path;
  }

  async fetch<T>(
    pathname: string,
    method: string = "GET",
    body: any = undefined
  ): Promise<T> {
    let res = fetch(API_URL + this.path + pathname, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bareer ${get(store).user.accessToken}`
      },
      method: method,
      body: body? JSON.stringify(body) : undefined,
    }).then((res) => res.json());

    if(res?.statusText === 'OK'){
      return res
    }else{
      res = fetch(API_URL + "/users/refresh", {
        headers: {
          method: 'GET',
          "Content-type": "application/json",
        }
      }).then((d) =>d.json())

      if(res?.statusText !== 'OK'){
        store.update( value =>{
          let newValue = value
          newValue.user.accessToken = res.data.accessToken
          return newValue
        })
        this.fetch(pathname, method, body)
      }
      return res
    }
  }

  async insert(body: any): Promise<T> {
    return this.fetch<T>("/", "POST", body);
  }

  async remove(id: string | number) {
    return this.fetch<any>("/" + id, "DELETE");
  }

  async update(id: string | number, data: any) {
    return this.fetch<any>("/" + id, "PUT", data);
  }

  async query(params: IParams): Promise<IList<T>> {
    let query = "?";
    if (params.filters?.length) {
      query += "filters=" + JSON.stringify(params.filters) + "&";
    }
    if (params.fields?.length) {
      query += "fields=" + JSON.stringify(params.fields) + "&";
    }
    if (params.sort) {
      query +=
        "sort=" +
        (params.sort.order === "ASC" ? "" : "-") +
        params.sort.field +
        "&";
    }
    if (params.page) {
      query += "page=" + params.page + "&";
    }
    if (params.perPage) {
      query += "perPage=" + params.perPage + "&";
    }

    query = query.substring(0, query.length - 1);

    return this.fetch<IList<T>>('/query', 'POST');
  }
}
