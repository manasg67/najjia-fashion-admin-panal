import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/Components/Products';

export default async function handle(req,res) {x
    const {method}= req;

    await mongooseConnect();

    if (method === 'POST') {
        const {title, description, price } = req.body;

        const productDoc = await Product.create({
            title , description, price 
        })
         res.json(productDoc);
    }


}