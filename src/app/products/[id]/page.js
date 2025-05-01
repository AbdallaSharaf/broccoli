import ProductDetailsMain from "@/components/layout/main/ProductDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import axiosInstance from "@/libs/axiosInstance";
import { notFound } from "next/navigation";

const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/product/${id}`);
    
    if (response.status !== 200) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    return response.data.Product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const ProductDetails = async ({ params }) => {
  const { id } = params;
  const product = await getProductById(id);
  
  if (!product || product.deleted || !product.available) {
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
    const response = await axiosInstance.get('/product', {
      params: {
        PageCount: 1000,
        deleted: false,
        available: true
      }
    });

    const products = response.data.Products;
    return products?.map(({ id }) => ({ id: id.toString() })) || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default ProductDetails;