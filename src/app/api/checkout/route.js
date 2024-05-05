import { connectToDB } from "@/utlis/database";
import Order from "@/models/order";
import User from "@/models/user.js";
import {getServerSession} from "next-auth";
import {handler} from "../auth/[...nextauth]/route.js";


export const POST = async(request) => {
    try {
        await connectToDB();
        const session = await getServerSession(handler);
        const userEmail = session?.user?.email;
        const user = await User.findOne({ email: userEmail });
        console.log(userEmail);
        const { userId, items, serviceFee, restaurantId, totalPrice } = await request.json();
        const orderStatus = "accept";
        
        if (userId) {
            // Calculate estimated arrival time (20 mins later than current time)
            const estimatedArrivalTime = new Date();
            estimatedArrivalTime.setMinutes(estimatedArrivalTime.getMinutes() + 20);

            const order = await Order.create({
                user: userId,
                restaurant: restaurantId,
                items: items,
                deliveryFee: 1.99,
                serviceFee: serviceFee,
                totalPrice: totalPrice,
                paid: true, // Set to "paid"
                orderStatus: orderStatus, // default status is 'accepted'
                deliveryPerson: "661cdf8d644e4f76e1ccccfe", // delivery person id
                estimatedArrivalTime: estimatedArrivalTime.toISOString(), // Convert to ISO string
                deliveryContactInfo: '0411225566', // Set contact info
                feedback: '',
            });

            return new Response(JSON.stringify(order), {
                status: 200
            });
        } else {
            return new Response("User not found", { status: 400 });
        }
    } catch (error) {
        console.error("Failed to post new order:", error);
        return new Response("Failed to post new order", {
            status: 500
        });
    }
}