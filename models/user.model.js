import mongoose from "mongoose";
import { TIERS } from "../config/tiers.config.js";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        username: { type: String, required: true, unique: true, trim: true },
        phoneNumber: { type: String, required: true, unique: true }, // Joi handles regex validation
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        bvn: { type: String, required: true }, // Joi ensures it’s exactly 11 digits
        profileImage: { type: String, default: null },
        password: { type: String, required: true, select: false }, // Password hidden from queries
        tier: { type: String, enum: Object.values(TIERS), default: TIERS.Tier_1.name }, // Validates tier names
        dailyLimit: { type: Number, default: TIERS.Tier_1.dailyLimit },
        maximumAccountLimit: { type: Number, default: TIERS.Tier_1.maximumAccountBalance },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
