import nodeResolve from '@rollup/plugin-node-resolve'
import {rollup} from 'rollup'
import { compile, preprocess } from 'svelte/compiler'
import sveltePreprocess from 'svelte-preprocess'
import ts from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
// import typescript from 'typescript'

async function compileSvelte(options) {
	const format = options.ssr ? 'esm' : 'esm'
	const generate = options.ssr ? 'ssr' : 'dom'
	const filename = options.filename
	
	return rollup({
		input: options.filename,
		shimMissingExports: true,
		plugins: [
			ts(),
			{
				name: 'svelte',
				async transform(code, id) {
					if(!id.endsWith('.svelte')) return
					
					const {code: preprocesed} = await preprocess(code, sveltePreprocess(), {
						filename
					})
					const compiled = compile(preprocesed, {generate, filename, hydratable: true})
					return compiled.js
				}
			},
			nodeResolve(),
			commonjs(),
			// terser()
		]
	}).then(build => {
		return build.generate({name: filename, format})
	}).then(result => {
		return result.output[0].code
	})
}

const htmlTemplate = ({head, css, html, url, props}) => `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Admin Panel</title>
	${head}
	<style>${css.code}</style>
</head>
<body>
	<main>
	${html}
	</main>
	${url ? `<script type="module">
		import Root from "${url}?dom"
		console.log(Root)
		new Root({
			target: document.querySelector("main"),
			hydrate: true,
			props: JSON.parse('${JSON.stringify(props ?? {})}')
		})
	</script>`: ''}
</body>
</html>`

function evaluate(code) {
	const regex = /export\s*\{\s*(\w+)\s*as\s*default\s*\}\s*;/;
	const result = regex.exec(code);

	code = code.replace(/export\s*\{\s*(\w+)\s*as\s*default\s*\}\s*;/, `return ${result[1]};`);

	return new Function(code)()
}

function renderSSR({code, props, url, dom}) {
	const component = evaluate(code)

	const {html, css, head} = component.render(props)
	return htmlTemplate({head, css, url, html, props})
}

/**
 * 
 * @type {import('.').SveltePluginFactory}
 */
export default function() {
	return {
		name: 'svelte',
		/**
		 * 
		 * @param {import(".").SvelteContext} ctx 
		 */
		init(ctx) {        
			if(!ctx.useCache) ctx.useCache = (key, value) => value
			
			console.log(ctx.useCache)
			ctx.svelte = {
				dom: async (filename, props) => {
					const code = await ctx.useCache(`svelte-dom:${filename}`)
					return code
				},
				ssr: async (filename, props, url) => {
					const code = await ctx.getCache(`svelte-ssr:${filename}`)
					const dom = await ctx.svelte.dom(filename, props)
					return renderSSR({code, props, url, dom})
				},
			}			

			if(ctx.addRoute) {
				ctx.addPage = (slug, path, getProps) => {
					ctx.setCache(`svelte-ssr:${path}`, () => compileSvelte({filename: path, ssr: true}))
					ctx.setCache(`svelte-dom:${path}`, () => compileSvelte({filename: path, ssr: false}))


					ctx.addRoute(slug, 'get', async (req, res) => {
						console.log(req.headers)
						console.log(req.url)
						const props = typeof getProps === 'function' ? await getProps(req.params) : getProps

						if(!req.query.hasOwnProperty('dom')) {
							const result = await ctx.svelte.ssr(path, props, req.url)
							res.send(result)
						} else {
							const result = await ctx.svelte.dom(path, props)

							res.setHeader('Content-Type', 'text/javascript')
							res.send(result)
						}					
					})
				}
			}
		}
	}
}


