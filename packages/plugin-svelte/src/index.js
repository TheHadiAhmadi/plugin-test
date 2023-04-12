import nodeResolve from '@rollup/plugin-node-resolve'
import {rollup} from 'rollup'
import { compile, preprocess } from 'svelte/compiler'
import sveltePreprocess from 'svelte-preprocess'
import ts from '@rollup/plugin-typescript'
import { match } from 'assert'
import commonjs from '@rollup/plugin-commonjs'
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
			commonjs()
		]
	}).then(build => {
		return build.generate({name: filename, format})
	}).then(result => {
		return result.output[0].code
	})
}

const htmlTemplate = ({head, css, html, url, props}) => `<!DOCTYPE html>
<html>
<head>
	${head}
	<style>${css.code}</style>
</head>
<body>
	<main>
	${html}
	</main>
	${url ? `<script type="module">
		import Root from "${url}?dom"

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

	console.log('evaluate', code)
	code = code.replace(/export\s*\{\s*(\w+)\s*as\s*default\s*\}\s*;/, `return ${result[1]};`);

	return new Function(code)()
}

function renderSSR({code, url, props}) {
	const component = evaluate(code)
	console.log(code, component)

	const {html, css, head} = component.render(props)
	return htmlTemplate({head, css, html, url, props})
}

/**
 * 
 * @type {import('.').SveltePluginFactory}
 */
export default function() {
	return {
		name: 'svelte',
		init(ctx) {        

			let cache = {}

			ctx.svelte = {
				dom: async (filename, props) => {
					const code = await ctx.useCache(`svelte-dom:${filename}`, compileSvelte({filename, ssr: false}))
					return code
				},
				ssr: async (filename, props, url) => {
					console.log('ssr', {name: filename, props, url})
					const code = await ctx.useCache(`svelte-ssr:${filename}`, compileSvelte({filename, ssr: true}))
					return renderSSR({code, props, url})
				},
				// compile: (path, name) => {
				// 	if(ctx.useCache) {
				// 		ctx.useCache(`svelte-dom:${name}`, compileSvelte({filename: path, ssr: false}))
				// 		ctx.useCache(`svelte-ssr:${name}`, compileSvelte({filename: path, ssr: true}))
				// 	} else {
				// 		cache[`svelte-dom:${name}`] = compileSvelte({filename: path, ssr: false})
				// 		cache[`svelte-ssr:${name}`] = compileSvelte({filename: path, ssr: true})
				// 	}
				// }
			}			

			if(ctx.addRoute) {
				ctx.addPage = (slug, path, getProps) => {

					ctx.addRoute(slug, 'get', async (req, res) => {
						const props = typeof getProps === 'function' ? await getProps(req.params) : getProps

						if(typeof req.query.dom === 'undefined') {
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
