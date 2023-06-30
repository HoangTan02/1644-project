MongoClient.connect(connectionString,{ uuseUnifiedTopology: true})
    .then(client =>{
        console.log('Connected to Database')

        const db = client.db('atnstore')
        const productCollection = db.collection('product')

        app.get(bodyParser.urlencoded({ extended: true}))

        app.get('view eengine', 'ejs')

        app.get('/', (req, res)=>{
            db.collection('product').find().toArray()
            .then(results => {
                res.render('../view/index.ejs', { product: results })
            })
            .catch(error => console.error(error))
        })

        app.get('/', (req, res) => {
            res.sendFile(_dirname+ '/index.html')
        })

        app.post('/product', (req, res) => {
            productCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
        })

        app.listen(process.env.PORT || 3000, function(){
            console.log('listening on 3000')
        })
    })
    .catch(error => console.error(error))