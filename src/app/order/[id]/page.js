import OrderMain from "@/components/layout/main/OrderDetailsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { notFound } from "next/navigation";

const OrderDetails = async ({ params }) => {
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
      <OrderMain order={id} />
    </PageWrapper>
  );
};


export default OrderDetails;
