import ProductDetailsMain from "@/components/layout/main/ProductDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import axiosInstance from "@/libs/axiosInstance";
import { notFound } from "next/navigation";


const ProductDetails = async ({ params }) => {
  const { id } = params;
  
  if (!id) {
    notFound();
  }

  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <ProductDetailsMain type={1} product={id} />
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