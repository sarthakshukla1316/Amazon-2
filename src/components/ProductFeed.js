import Product from "./Product";

function ProductFeed({ products }) {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
            
            {
                products.slice(0,4).map(({ id, title, price, description, category, image }) => (
                    <Product  
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                ))
            }
            <img className="md:col-span-full" src="https://links.papareact.com/dyz" alt="" />
            

            <div className="md:col-span-2">
                {
                    products.slice(4,5).map(({ id, title, price, description, category, image }) => (
                        <Product  
                            key={id}
                            id={id}
                            title={title}
                            price={price}
                            description={description}
                            category={category}
                            image={image}
                        />
                    ))
                }
            </div>

            <img className="md:col-span-full" src="/banner2.png" alt="" />

            {
                products.slice(5,9).map(({ id, title, price, description, category, image }) => (
                    <Product  
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                ))
            }

            <img className="md:col-span-full object-contain mx-auto"  src="/banner3.jpg" alt="" />


            {
                products.slice(9,13).map(({ id, title, price, description, category, image }) => (
                    <Product  
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                ))
            }

           

            <div className="md:col-span-2">
                {
                    products.slice(13,14).map(({ id, title, price, description, category, image }) => (
                        <Product  
                            key={id}
                            id={id}
                            title={title}
                            price={price}
                            description={description}
                            category={category}
                            image={image}
                        />
                    ))
                }
            </div>


            <img className="md:col-span-full object-contain mx-auto"  src="/banner4.jpg" alt="" />

            {
                products.slice(14,products.length).map(({ id, title, price, description, category, image }) => (
                    <Product  
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                ))
            }
        </div>
    )
}

export default ProductFeed;
