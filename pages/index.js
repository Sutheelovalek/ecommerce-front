import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";


export default function HomePage({product}) {
  return (
    <div>
     <Header />
     <Featured product={product}/>
    </div>
  )
}

export async function getServerSideProps() {
  const featureProductId = '646715c8f46e020719db1610';
  await mongooseConnect();
  const product = await Product.findById(featureProductId);
  return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
      },
    };

}