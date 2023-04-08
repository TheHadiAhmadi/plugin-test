const code = "module.exports = {a:123}"

const module = {}
const f = new Function('const define = (c) => c(); return ' + 'define(() => {return "hi"})')
console.log(f())