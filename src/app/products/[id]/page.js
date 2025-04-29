import ProductDetailsMain from "@/components/layout/main/ProductDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { useProductContext } from "@/providers/ProductContext";
import { notFound } from "next/navigation";


const getProductById = async (id) => {
  try {
    console.log("Fetching product with ID:", id);
    const res = await fetch(`https://fruits-heaven-api.onrender.com/api/v1/product/${id}?deleted=false&available=true`, {
      // method: "GET",
      // // headers: {
      // //   "Content-Type": "application/json"
      // // },
    });

    if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);

    const data = await res.json();
    const product = data.Product;
    console.log("Fetched product data:", data);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const ProductDetails = async ({ params }) => {
  const { id } = params;
  const product = await getProductById(id);
  if (!product) {
    notFound();
  }
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ProductDetailsMain type={1} product={product} />
    </PageWrapper>
  );
};
export async function generateStaticParams() {
  try {
    const res = await fetch("https://fruits-heaven-api.onrender.com/api/v1/product?PageCount=1000&deleted=false&available=true");
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    const products = data.Products; // Adjust this based on your API response
    return products?.map(({ id }) => ({ id: id.toString() })) || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array if the API call fails
  }
}


export default ProductDetails;
