const paymentRegisterOrder = async (
  amount,
  orderNumber,
  nameSurname,
  phone,
  email
) => {
  const fetchData = async () => {
    if (orderNumber !== undefined) {
      
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
        amount:amount,
        json_params: sendTicketsJsonParams,
        FORCE_3DS2:true
      };
      try {
        const sendTicketsResponse = await fetch(
          "https://ocaln1d5vf.execute-api.eu-west-3.amazonaws.com/v1/innohealth-get-payment-link",
          {
            method: "post",
            body: JSON.stringify(sendTicketsBody),
          }
        );

        const response = await sendTicketsResponse.json();
        const data = JSON.parse(response.body);
        return data.formUrl;

      } catch (error) {
        console.error("Error:", error);
        return null;
      }
    }
  };

  return await fetchData();
};

export default paymentRegisterOrder;
