import nodeResolve from '@rollup/plugin-node-resolve'
import {rollup} from 'rollup'
import { compile } from 'svelte/compiler'

async function compileSvelte(options) {
	const format = options.ssr ? 'amd' : 'esm'
	const generate = options.ssr ? 'ssr' : 'dom'
	const filename = options.filename
	
	return rollup({
		input: options.filename,
		plugins: [
			{
				name: 'svelte',
				async transform(code, id) {
					if(!id.endsWith('.svelte')) return

					const compiled = compile(code, {generate, filename, hydratable: true})
					return compiled.js
				}
			},
			nodeResolve(),
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
	<div id="app">
	${html}
	</div>
	<script type="module">
		import Root from "${url}?dom"

		new Root({
			target: document.getElementById("app"),
			hydrate: true,
			props: JSON.parse('${JSON.stringify(props)}')
		})
	</script>
</body>
</html>`

function evaluate(code) {
	const prefix = `const define = (fn) => fn(); return `
	return new Function(prefix + code)()
}

function renderSSR({code, url, props}) {
	const component = evaluate(code)

	const {html, css, head} = component.render(props)
	return htmlTemplate({head, css, html, url, props})
}

function renderSvelteDOM({code}) {
	return code;
}

export async function renderSvelte({path, url, props, ssr}) {
	console.log('path: ', path)
	const code = await compileSvelte({filename: path, ssr});	
	if(ssr) {
		return renderSSR({code, url, props})
	} else {
		return renderSvelteDOM({code})
	}
}


/**
 * 
 * @type {import('.').SveltePluginFactory}
 */
export default function() {
	return {
		name: 'svelte',
		init(ctx) {        
			ctx.addPage = (slug, path, getProps) => {
				ctx.addRoute(slug, 'get', async (req, res) => {
					let props = getProps;
					if(typeof getProps === 'function') {
						props = await getProps(req.params)
					}
					const ssr = typeof req.query.dom === 'undefined'

					async function cached(key, value) {
						if(ctx.getCache) {
							const cachedValue = ctx.getCache(key)
							if(!cachedValue) return ctx.setCache(key, value)
							return cachedValue
						} else {
							return value
						}
					}
					

					if(ssr) {						

						const code = await cached(`svelte-page-ssr:${slug}`, compileSvelte({filename: path, ssr: true}))

						return res.send(renderSSR({url: req.url, code, props}))
					} else {
						const code = await cached(`svelte-page-dom:${slug}`, compileSvelte({filename: path, ssr: false}))

						res.setHeader('Content-Type', 'text/javascript')					
						res.send(renderSvelteDOM({code}))
					}
				})		
			}
		}
	}
}