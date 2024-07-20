import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, _, next) => {
    try {
        // Extract token from cookies or authorization header
        const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");

        // Check if token is present
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the user by ID
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        // Check if user exists
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        // Log the error for debugging
        console.error("Error in verifyJwt middleware:", error);
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
