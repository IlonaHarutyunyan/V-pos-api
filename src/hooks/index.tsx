// import { useEffect } from 'react';

// interface ApiCallValue{
//   ticketPrice: number;
//   orderNumber: string;
//   nameSurname: string;
//   phone: string;
//   email: string;
//   ticketQuantity: number;
// }
// const useApiCall = ({ticketPrice,orderNumber,nameSurname, phone, email,ticketQuantity}: ApiCallValue) => {

//   useEffect(() => {
//     const fetchData = async () => {
//       if (orderNumber !== undefined) {
//         const getStatusBody = {
//           order_id: orderNumber,
//           check_status: true,
//         };
//         const sendTicketsJsonParams = {
//           name: nameSurname,
//           phone_number: phone,
//           email: email,
//         };
//         const sendTicketsBody = {
//           payment_completed: true,
//           notify: true,
//           order_id: orderNumber,
//           email: email,
//           amount: ticketQuantity * ticketPrice,
//           ticket_quantity: ticketQuantity,
//           json_params: sendTicketsJsonParams,
//         };

//         if (localStorage.getItem("orderNumber") !== null) {
//           try {
//             const getStatusResponse = await fetch(
//               "https://ocaln1d5vf.execute-api.eu-west-3.amazonaws.com/v1/get-payment-link",
//               {
//                 method: "post",
//                 body: JSON.stringify(getStatusBody),
//               }
//             );
//             const getStatusData = await getStatusResponse.json();
//             const data = JSON.parse(getStatusData.body);
//             if (
//               data.error == false &&
//               data.errorMessage == "Success" &&
//               (data.orderStatus == 0 || data.orderStatus == 2)
//             ) {
//               const sendTicketsResponse = await fetch(
//                 "https://ocaln1d5vf.execute-api.eu-west-3.amazonaws.com/v1/get-payment-link",
//                 {
//                   method: "post",
//                   body: JSON.stringify(sendTicketsBody),
//                 }
//               );
//               localStorage.clear();
//             }
//           } catch (error) {
//             console.error("Error:", error);
//           }
//         }
//       }
//     };

//     fetchData();
//   }, []);


// };

// export default useApiCall;


import { useEffect } from 'react';

interface ApiCallValue {
  ticketPrice: number;
  orderNumber: string;
  nameSurname: string;
  phone: string;
  email: string;
  ticketQuantity: number;
}

const apiCall = ({ ticketPrice, orderNumber, nameSurname, phone, email, ticketQuantity }: ApiCallValue) => {
  useEffect(() => {
    const fetchData = async () => {
      if (orderNumber !== undefined) {
        const getStatusBody = {
          order_id: orderNumber,
          check_status: true,
        };
        const sendTicketsJsonParams = {
          name: nameSurname,
          phone_number: phone,
          email: email,
        };
        const sendTicketsBody = {
          payment_completed: true,
          notify: true,
          order_id: orderNumber,
          email: email,
          amount: ticketQuantity * ticketPrice,
          ticket_quantity: ticketQuantity,
          json_params: sendTicketsJsonParams,
        };

        try {
          const getStatusResponse = await fetch(
            "https://ocaln1d5vf.execute-api.eu-west-3.amazonaws.com/v1/get-payment-link",
            {
              method: "post",
              body: JSON.stringify(getStatusBody),
            }
          );
          const getStatusData = await getStatusResponse.json();
          const data = JSON.parse(getStatusData.body);
          if (
            !data.error &&
            data.errorMessage === "Success" &&
            (data.orderStatus === 0 || data.orderStatus === 2)
          ) {
            const sendTicketsResponse = await fetch(
              "https://ocaln1d5vf.execute-api.eu-west-3.amazonaws.com/v1/get-payment-link",
              {
                method: "post",
                body: JSON.stringify(sendTicketsBody),
              }
            );
            if (sendTicketsResponse.ok) {
              localStorage.clear();
            } else {
              console.error("Failed to send tickets:", sendTicketsResponse.statusText);
            }
          } else {
            console.error("Failed to get payment status:", data.errorMessage);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
  }, [ticketPrice, orderNumber, nameSurname, phone, email, ticketQuantity]);
};

export default apiCall;
