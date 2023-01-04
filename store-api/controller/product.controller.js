const Product = require('../models/products')


// const createProduct = async (req, res, next) => {
//     const product = await Product.find(req.body.name)
//     if (product) throw new Error("Product is already here")
//     await Product.create(req.body)
//     res.status(200).json({
//         success: true,
//         product
//     })
//     next(error)
// }
const getAllProductStatic = async (req, res, next) => {
    const products = await Product.find({price: {$gt: 30}}).sort('price').select('price name')
    if(!products) throw new Error('No product is found')
    res.status(200).send({
        products: products,
        length: products.length
    })
    next(error)

}
const getAllProduct = async (req, res) => {
    const { featured , company, name, sort, fields} = req.query
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true: false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = {$regex: name, $options: 'i'}
    }
    let result =  Product.find(queryObject)
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
        console.log(sort)
    } else {
        result = result.sort('createAt')
    }

    if (fields) {
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }

    const products = await result
   
    res.status(200).json({product: products, length: products.length})
}

module.exports = {getAllProduct, getAllProductStatic}