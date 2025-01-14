import React from 'react';
import ProductCart from './ProductCart';
import { client } from '@/lib/sanityClient';
import { Image as IImage } from 'sanity';

export const getProductData = async () => {

    const res = await client.fetch(`
    *[_type=="product"] {
        title,
        image,
        price,
        category -> {
          name
        }
      }
    `);

    return res;
};

interface IProduct {
    title: string;
    image: IImage;
    price: number;
    category: {
        name: string;
    }
};

const Home = async () => {

    const data: IProduct[] = await getProductData();

    return (
        <div className="my-8 grid grid-cols-[repeat(2,auto)] justify-center gap-x-10">
            {data.map((item, i) => (
                <ProductCart
                    index={i}
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    category={item.category.name}
                />
            ))}
        </div>
    )
};

export default Home;