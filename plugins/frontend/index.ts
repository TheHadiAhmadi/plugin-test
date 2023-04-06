import fs, {  copyFileSync } from 'fs'
import { rollup } from 'rollup';
import resolve from "@rollup/plugin-node-resolve";
import { compile } from "svelte/compiler";
import alias from "@rollup/plugin-alias";

async function getClientComponent(src, components) {
    const output = await rollup({
        input: '@cms/' + src + '.svelte',
        plugins: [
          alias({
            entries: [{ find: "@src", replacement: "./src" }],
          }),
          // tailwind(),
          {
            name: "resolve_svelte",
            resolveId: (name) => {
              if (!name.startsWith("@cms")) return null;
              return name;
            },
            async load(id) {
              if (!id.startsWith("@cms")) return null;
              id = id.replace("@cms/", "");
              id = id.replace(".svelte", "");
            //   const result = await fetch(id).then((res) => res.text());
            console.log(id)
            const result = fs.readFileSync(components[id], 'utf-8')

            console.log("RESULT: ", result)
              return result;
            },
            async transform(file, id) {
              if (!id.startsWith("@cms") && !id.endsWith(".svelte")) return;
              const compiled = compile(file, {
                generate: "dom",
              });
              const result = compiled.js;
              return result;
            },
          },
          resolve(),
        ],
      });
      const output2 = await output.generate({ name: "test", format: "esm" });
      const code = output2.output[0].code;
      return code
}

export default {
    name: 'frontend',
    description: 'frontend of admin panel',
    init(ctx) {
        let components = {}
        let routes = []
        let root = 'Routes'

        ctx.addRoute('/admin', 'get', async (req, res) => {
            const url = await import.meta.resolve?.('./index.html')
            if(url) {
                let file = fs.readFileSync(url, 'utf-8')
                let scripts = Object.keys(components).map(component => {
                    return `<script type="module" src="/admin/components/${component}.js"></script>`
                }).join('')
                
                scripts += `<script type="module">
                    import Root from "/admin/components/${root}.js"

                    console.log("Root", Root)
                    const app = new Root({
                        target: document.getElementById('app')
                    })
                    console.log("app:", app)
                    export default app
                </script>`
                file = file.replace('{scripts}', scripts)
                return res.send(file)
            }
            res.send('Hi')
        })
        
        ctx.addService({
            getComponents() {
                return components
            },
            Routes() {
                return routes
            }
        })
        

        ctx.addRoute('/admin/components/:name','get', async (req, res) => {
            const name = req.params.name.substring(0, req.params.name.length -3)


            const output = await getClientComponent(name, components)
            
            res.setHeader('content-type', 'text/javascript')
            res.end(output)
        })

        ctx.addCtx('addAdminPage', async (slug, component) => {
            console.log('addAdminPage', slug, component)
            // ctx.addRoute(slug, 'get', (req, res) => {

                // components[slug] = await import.meta.resolve?.(component)
                routes.push({slug, component})
                
            // })
        })

        ctx.addCtx('addComponent', async (name, path) => {
            console.log('addComponent', name, path)
            let dest = await import.meta.resolve?.(`../../frontend/admin/src/components`)
            path = await import.meta.resolve?.(path)

            dest = dest?.replace('index.ts', '') + `${name}.svelte`

            if(dest) {
                copyFileSync(path, dest)
            }
        })

        ctx.addCtx('setRootComponent', (name) => {
            root = name
        })
    }
}