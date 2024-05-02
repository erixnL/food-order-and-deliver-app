import { connectToDB } from "@/utlis/database";
import User from "@/models/user.js";
import { getServerSession } from "next-auth";
import { handler } from "../../auth/[...nextauth]/route.js";

export const DELETE = async (req, res) => {
    await connectToDB();
    const session = await getServerSession(handler);
    if (!session || !session.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const userEmail = session.user.email;
    const user = await User.findOne({ email: userEmail });
    try {
        const { itemIdToDelete } = await req.json();
        const itemIndex = user.cart.items.findIndex(item => item.itemId.toString() === itemIdToDelete);
        if (itemIndex !== -1) {
            user.cart.items.splice(itemIndex, 1);
            await user.save();
            res.status(200).json({ message: "Item removed from cart successfully" });
        } else {
            res.status(404).json({ error: "Item not found in cart" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Failed to remove item from cart" });
    }
};
// export const DELETE = async (request) => {
//         const { itemIdToDelete } = await request.json();
//         try {
            
//             await connectToDB();
    
//             const session = await getServerSession(handler);
//             const userEmail = session?.user?.email;
//             const user = await User.findOne({ email: userEmail });
    
//             if (user) {
                
//                 const itemIndex = user.cart.items.findIndex(item => item.itemId.toString() === itemIdToDelete);
    
//                 if (itemIndex !== -1) {
//                     user.cart.items.splice(itemIndex, 1); // Remove the item from the cart
//                     await user.save();
//                     return new Response("Item removed from cart successfully", { status: 200 });
//                 } else {
//                     return new Response("Item not found in cart", { status: 404 });
    
//                 }
//             } else {
//                 return new Response("Iser not found", { status: 404 });
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             return new Response("Item not Failed to remove item from cart", { status: 500 });
//         }
//     };