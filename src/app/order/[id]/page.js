import axios from '@/libs/axiosInstance';
import OrderMain from "@/components/layout/main/OrderDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { notFound } from "next/navigation";

const getOrderById = async (id) => {
  try {
    console.log("Fetching order with ID:", id);
    const response = await axios.get(`/order/${id}`);
    
    console.log("Fetched order data:", response.data);
    return response.data.order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};

const OrderDetails = async ({ params }) => {
  const { id } = params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }
  
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <OrderMain order={order} />
    </PageWrapper>
  );
};

export default OrderDetails;