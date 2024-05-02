import { connectToDB } from "@/utlis/database";
import User from "@/models/user.js";
import {getServerSession} from "next-auth";
import {handler } from "../../auth/[...nextauth]/route.js";
import { getSession } from "next-auth/react";


export const PATCH = async (req, res) => {
    if (req.method !== 'PATCH') {
        // Only allow PATCH method, reject all other methods
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end('Method Not Allowed');
        return;
    }

    await connectToDB();
    // const session = await getServerSession(handler);
    const session = await getSession({ req });
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
