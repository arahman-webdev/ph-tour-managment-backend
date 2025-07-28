import axios from "axios"
import { envVars } from "../../configue/env"
import { ISslCommerz } from "./sslCommerz.interface"



const sslPaymentInit = async (payload: ISslCommerz) => {
    try {
        const data = {
            store_id: envVars.SSL.SSL_STORE_ID,
            store_passwd: envVars.SSL.SSL_STORE_PASSWORD,
            total_amount: payload.amount,
            currency: "BDT",
            tran_id: payload.transactionId,
            success_url: envVars.SSL.SSL_SUCCESS_BACKEND_URL,
            fail_url: envVars.SSL.SSL_FAIL_BACKEND_URL,
            cancel_url: envVars.SSL.SSL_CANCEL_BACKEND_URL,
            // ipn_url: "http://localhost:3030/ipn",
            shipping_method: "N/A",
            product_name: "Tour",
            product_category: "Service",
            product_profile: "General",
            cus_name: payload.name,
            cus_email: payload.email,
            cus_add1: payload.address,
            cus_add2: "N/A",
            cus_city: "Bogra",
            cus_state: "Rajshahi",
            cus_postcode: "5840",
            cus_country: "Banladesh",
            cus_phone: payload.phone,
            cus_fax: "N/A",
            ship_name: "N/A",
            ship_add1: "N/A",
            ship_add2: "N/A",
            ship_city: "N/A",
            ship_state: "N/A",
            ship_postcode: 1000,
            ship_country: "N/A",
        }

        const response = await axios({
            method: "POST",
            url: envVars.SSL.SSL_PAYMENT_URL,
            data: data,
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        })

        return response.data
    } catch (error) {
        console.log("ssl payment erro", error)
        
    }
}


export const sslCommerzService = {
    sslPaymentInit
}