import { connectToDB } from "@/utlis/database";
import Restaurant from "@/models/restuarant";

export const PUT = async (request) => {
    try {
        await connectToDB();

        const requestData = await request.json();
        const { restaurantId, newMenu } = requestData;

        // Input validation
        if (!restaurantId || !newMenu || !Array.isArray(newMenu)) {
            return new Response("Invalid input data", { status: 400 });
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            restaurantId,
            { $set: { menu: newMenu } },
            { new: true }
        );

        if (updatedRestaurant) {
            return new Response(JSON.stringify(updatedRestaurant), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response("Restaurant not found", { status: 404 });
        }
    } catch (error) {
        console.error("Failed to update menu:", error);
        return new Response("Failed to update menu", { status: 500 });
    }
};
