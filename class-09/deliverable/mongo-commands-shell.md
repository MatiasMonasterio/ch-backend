## Init and create db

```bash
$ mongo
> use eccomerce
```

## Exercise 1 and 2

```bash
> db.createCollection("messages")
> db.createCollection("products")

> db.products.insert([
    { title: "product 01", price: 120, thumbnail: "url-product-01" },{ title: "product 02", price: 580, thumbnail: "url-product-02" },
    { title: "product 03", price: 900, thumbnail: "url-product-03" },{ title: "product 04", price: 1280, thumbnail: "url-product-04" },
    { title: "product 05", price: 1700, thumbnail: "url-product-05" },{ title: "product 06", price: 2300, thumbnail: "url-product-06" },
    { title: "product 07", price: 2860, thumbnail: "url-product-07" },{ title: "product 08", price: 3350, thumbnail: "url-product-08" },
    { title: "product 09", price: 4320, thumbnail: "url-product-09" },{ title: "product 10", price: 4990, thumbnail: "url-product-10" }
])

> db.messages.insert([
    { email: "matias_monasterio@outlook.com", message: "message 01", date: new ISODate("2023-09-09T14:10:30Z") },
    { email: "monasterio1995@gmail.com", message: "message 02", date: new ISODate("2023-09-09T14:11:42Z") },
    { email: "monasterio1995@gmail.com", message: "message 03", date: new ISODate("2023-09-09T14:11:43Z") },
    { email: "monasterio1995@gmail.com", message: "message 04", date: new ISODate("2023-09-09T14:11:44Z") },
    { email: "matias_monasterio@outlook.com", message: "message 05", date: new ISODate("2023-09-10T14:10:30Z") },
    { email: "matias_monasterio@outlook.com", message: "message 06", date: new ISODate("2023-09-10T14:10:30Z") },
    { email: "monasterio1995@gmail.com", message: "message 07", date: new ISODate("2023-09-11T14:10:30Z") },
    { email: "monasterio1995@gmail.com", message: "message 08", date: new ISODate("2023-09-12T14:10:30Z") },
    { email: "matias_monasterio@outlook.com", message: "message 09", date: new ISODate("2023-09-13T14:10:30Z") },
    { email: "matias_monasterio@outlook.com", message: "message 10", date: new ISODate("2023-09-13T14:10:30Z") }])
```

## Exercise 3
```bash
> db.products.find()
> db.messages.find()
```

## Exercise 4
```bash
> db.products.count()
> db.messages.count()
```

## Exercise 5
```bash
> db.products.insertOne({ title: "product 11", price: 2990, thumbnail: "url-product-11" })

> db.products.find({ title: "product 01" })
> db.products.find({ price: { $lt: 1000 } )
> db.products.find({ price: { $gte: 1000, $lte: 3000 } })
> db.products.find({ price: { $gt: 3000 } })
> db.products.find({}, { title: 1, _id: 0 }).sort({"price": 1}).skip(2).limit(1)

> db.products.updateMany({}, { $set: { stock: 100} })

> db.products.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0} })

> db.products.deleteMany({ price: { $lt: 1000 } })
```

## Exercise 5
```bash
> use admin
> db.createUser({user:"pepe", pwd: "asd456", roles: [{role: "read", db: "eccomerce"}]})
> ctrl + c

$ mongod --auth
$ mongo -u pepe -p asd456
> use eccomerce
> db.products.find()
> db.products.insertOne({ title: "unauthorized" }) ## Error code 13 Unauthorized

```