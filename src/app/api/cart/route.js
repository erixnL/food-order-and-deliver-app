import { connectToDB } from "@/utlis/database";
import User from "@/models/user.js";

export const PUT = async(request) => {
    try {
        await connectToDB();

        const { userId, newItems } = await request.json();
        console.log(userId);
        const updatedCart = await User.findByIdAndUpdate(userId, { $set: { 'cart.items': newItems } }, { new: true });
        const user = await User.findById(userId);
        console.log(user);

        if (updatedCart) {
            return new Response(JSON.stringify(updatedCart), {
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

