import ProductDetailsMain from "@/components/layout/main/ProductDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import axiosInstance from "@/libs/axiosInstance";
import { notFound } from "next/navigation";
async function getProductById(id) {
  try {
    const response = await axiosInstance.get(`/product/${id}`);
    return response.data.Product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

// Generate SEO metadata
export async function generateMetadata({ params }) {
  const product = await getProductById(params.id);

  if (!product) {
    return {
      title: 'Product not found | Fruits Heaven',
      description: 'The product you are looking for does not exist.',
    };
  }

  return {
    title: `${product.name?.ar} | Fruits Heaven`,
    description: product.description?.ar ?? 'Buy the best fruits and vegetables in KSA.',
    openGraph: {
      title: `${product.name?.ar} | Fruits Heaven`,
      description: product.description?.ar ?? '',
      images: [product.imageCover ?? '/default-og-image.jpg'],
      url: `https://www.fruits-heaven.com/products/${product?._id}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name?.ar} | Fruits Heaven`,
      description: product.description?.ar ?? '',
      images: [product.imageCover ?? '/default-og-image.jpg'],
    },
    metadataBase: new URL('https://fruitsheaven.sa'),
    alternates: {
      canonical: `/products/${product?._id}`,
    },
    other: {
      'product:price:amount': product?.price?.toString(),
      'product:price:currency': 'SAR',
      'product:brand': product?.brand ?? 'Fruits Heaven',
      'product:category': product?.category[0]?.name?.ar ?? 'Fruits',
      'keywords': product?.metaTags?.toString?.() ?? '', // ✅ Add metaTags here
    }
  };
}


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