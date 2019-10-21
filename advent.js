const App = () =>{
    let req;
    let res;
    const Middleware = []

    const use = fn => Middleware.push(fn)

    const runMiddlewares = id => {
        
        let count = Middleware.length;
        if(id < count ) {
            Middleware[id].call(null, () =>  runMiddlewares(id + 1))
        }
    }
    const get = () => {
        //Middleware
        runMiddlewares(0);
    }

    return {
        get,
        use
    }
}

const app = App();

app.use((next) => {
    console.log('one')
    next()
})

app.use((next) => {
    console.log('two')
    next()
})

app.use((next) => {
    console.log('three')
    next()
})

app.use((next) => {
    console.log('four')
    
})

app.use((next) => {
    console.log('five')
})

app.get();