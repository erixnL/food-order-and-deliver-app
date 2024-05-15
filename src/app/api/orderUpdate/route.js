import { connectToDB } from "@/utlis/database";
import Order from "@/models/order";

export const PUT = async(request) => {
    try {
        await connectToDB();

        const { orderId, newStatus } = await request.json();
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { orderStatus: newStatus }, { new: true });

        if (updatedOrder) {
            return new Response(JSON.stringify(updatedOrder), {
                status: 200
            });
        } else {
            return new Response("Order not found", { status: 404 });
        }
    } catch (error) {
        console.error("Failed to update order status:", error);
        return new Response("Failed to update order status", {
            status: 500
        });
    }
}