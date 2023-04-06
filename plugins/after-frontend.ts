export default {

    name: 'after-frontend', 
    init(ctx) {
        console.log('init')
        ctx.addComponent('Routes', './Routes.svelte')
        ctx.addComponent('Test', './Test.svelte')
        // ctx.setRootComponent('Test')
        ctx.addComponent('TestPage', './TestPage.svelte')

        ctx.addAdminPage('/test', 'TestPage')
    }
}