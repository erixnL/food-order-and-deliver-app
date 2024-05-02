import { connectToDB } from "@/utlis/database";
import User from "@/models/user.js";
import {getServerSession} from "next-auth";
import {handler} from "../../auth/[...nextauth]/route.js";

export const POST = async (req, res) => {
  await connectToDB();
  const session = await getServerSession(handler);
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
            
//             res.status(200).json({ message: 'Item added to cart successfully' });
//         } else {
//           res.status(404).json({ error: 'User not found' });
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Failed to add item to cart' });
//       }
//     }

