import Error from "./error/page";
import { Suspense } from "react";

const NotFound = () => {
  
  return (
    <Suspense fallback={<>Loading...</>}>

      <Error />;
    </Suspense>
    )
};

export default NotFound;
