import { connectToDB } from "@/utlis/database";
import User from "@/models/user.js";
import {getServerSession} from "next-auth";
import {handler as nextAuthHandler } from "../auth/[...nextauth]/route.js";

export const handlePost = async (req, res) => {
    await connectToDB();
    const session = await getServerSession(nextAuthHandler);
    if (!session || !session.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const userEmail = session.user.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    try {
        const { itemId, quantity, itemName, price, restaurant } = await req.json();
        const cartItem = { itemId, quantity, itemName, price, restaurant };
        user.cart.items.push(cartItem);
        await user.save();
        res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Error adding item to cart" });
    }
};

export const handlePatch = async (req, res) => {
    await connectToDB();
    const session = await getServerSession(nextAuthHandler);
    if (!session || !session.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const userEmail = session.user.email;
    const user = await User.findOne({ email: userEmail });
    try {
        const { itemId, quantity } = await req.json();
        const cartItemIndex = user.cart.items.findIndex(item => item.itemId === itemId);
        if (cartItemIndex === -1) {
            return res.status(404).json({ error: "Item not found in cart" });
        }
        user.cart.items[cartItemIndex].quantity = quantity;
        await user.save();
        res.status(200).json({ message: "Successfully updated the item quantity" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Error updating item quantity" });
    }
};

export const handleDelete = async (req, res) => {
    await connectToDB();
    const session = await getServerSession(nextAuthHandler);
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


// export const POST = async(request) => {
//     try {
//         await connectToDB();
        
//         const session = await getServerSession(handler);
//         const userEmail = session?.user?.email;
//         const user = await User.findOne({email: userEmail});

//         if (user) {
//             const { itemId, quantity, itemName, price, restaurant} = await request.json();
//             const cartItem = {
//                 itemId,
//                 quantity,
//                 itemName,
//                 price,
//                 restaurant,
//               };
//             user.cart.items.push(cartItem)
//             await user.save();
            
//             // return new Response( 'Item added to cart successfully' , { status: 200 });
//             return new Response(JSON.stringify({ message: "Item added to cart successfully" }), { status: 200, headers: { 'Content-Type': 'application/json' }});
//         } else {
//             // return new Response("User not found", { status: 404 });
//             return new Response(JSON.stringify({ error: "User not found" }), { status: 404, headers: { 'Content-Type': 'application/json' }});
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         // return new Response("Error Add Item to Cart", { status: 500 });
//         return new Response(JSON.stringify({ error: "Error Add Item to Cart" }), { status: 500, headers: { 'Content-Type': 'application/json' }});
//       }
//     }

// export const PATCH = async (request) => {
//     const { itemId, quantity } = await request.json();

//     try {
//         await connectToDB();
//         const session = await getServerSession(handler);
//         const userEmail = session?.user?.email;
//         const user = await User.findOne({email: userEmail});

//         // Find the item by item id
//         const cartItemIndex = user.cart.items.findIndex(item => item.itemId === itemId);

//         if (cartItemIndex === -1) {
//             return new Response("Item not found in cart", { status: 404 });
//         }

//         // Update the quantity of the cart item
//         user.cart.items[cartItemIndex].quantity = quantity;

//         // Save the updated user document
//         await user.save();

//         // return new Response("Successfully updated the item quantity", { status: 200 });
//         return new Response(JSON.stringify({ message: "Successfully updated the item quantity" }), { status: 200, headers: { 'Content-Type': 'application/json' }});

//     } catch (error) {
//         console.error('Error:', error);
//         // return new Response("Error updating item quantity", { status: 500 });
//         return new Response(JSON.stringify({ message: "Error updating item quantity" }), { status: 500, headers: { 'Content-Type': 'application/json' }});
//     }
// };

// export const DELETE = async (request) => {
//     const { itemIdToDelete } = await request.json();
//     try {
        
//         await connectToDB();

//         const session = await getServerSession(handler);
//         const userEmail = session?.user?.email;
//         const user = await User.findOne({ email: userEmail });

//         if (user) {
            
//             const itemIndex = user.cart.items.findIndex(item => item.itemId.toString() === itemIdToDelete);

//             if (itemIndex !== -1) {
//                 user.cart.items.splice(itemIndex, 1); // Remove the item from the cart
//                 await user.save();
//                 return new Response("Item removed from cart successfully", { status: 200 });
//             } else {
//                 return new Response("Item not found in cart", { status: 404 });

//             }
//         } else {
//             return new Response("Iser not found", { status: 404 });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return new Response("Item not Failed to remove item from cart", { status: 500 });
//     }
// };