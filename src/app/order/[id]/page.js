import OrderMain from "@/components/layout/main/OrderDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { notFound } from "next/navigation";

const getOrderById = async (id) => {
  try {
    console.log("Fetching order with ID:", id);
    const res = await fetch(`https://fruits-heaven-api.onrender.com/api/v1/order/${id}`, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json"
      // },
    });

    if (!res.ok) throw new Error(`Failed to fetch order: ${res.status}`);

    const data = await res.json();
    const order = data.order;
    console.log("Fetched order data:", data);
    return order;
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
