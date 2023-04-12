<script lang="ts">
  import { getContext, onDestroy, onMount, setContext } from "svelte";
  import type { FormContext } from "./Form.types";

  export let name: string | undefined = undefined;
  export let value: Record<string, any> = {};

  let validationErrors: Record<string, string> = {};

  let fields: any = {};

  const context: FormContext = getContext("FORM");

  const register: FormContext["register"] = (name: string, ctx: any) => {
    fields[name] = ctx;
  };

  const unregister: FormContext["unregister"] = (name: string) => {
    delete fields[name];
  };

  setContext("FORM", { ...context, register, unregister });

  async function validate(throwError: boolean = false) {
    try {
      validationErrors = {};
      let keys = Object.keys(fields);
      if (keys.length === 0) {
        return {};
      }
      for (let key of keys) {
        try {
          const result = await fields[key].validate(throwError);
          if (result !== null) {
            value[key] = result;
          }
        } catch (err: any) {
          validationErrors[key] = err.message;

          if (throwError) throw err;
        }
      }
      return value;
    } catch (err: any) {
      //
      if (throwError) throw err;
    }
  }

  function reset() {
    for (let key of Object.keys(fields)) {
      fields[key].reset();
    }
  }

  function set(val: Record<string, any> = {}) {
    console.log("set: ", val, fields);
    for (let key of Object.keys(val)) {
      if (fields[key] && typeof val[key] !== "undefined") {
        fields[key].set(val[key]);
      }
    }
  }

  const ctx = {
    fields,
    validate,
    reset,
    set,
  };

  onMount(() => {
    if (name) {
      context.register(name, ctx);
    }
    for (let key of Object.keys(fields)) {
      if (typeof value[key] !== "undefined") {
        fields[key].set(value[key]);
      }
    }
  });
  onDestroy(() => {
    if (name) {
      context.unregister(name);
    }
  });
</script>

<!-- use FormField -->
<slot />
