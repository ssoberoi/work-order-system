import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getDashboardSummary } from "../services/dashboard.service.js";

const getDashboardSummaryController = asyncHandler(async (req, res) => {
    const dashboardData = await getDashboardSummary();

    return res.status(200).json(
        new ApiResponse(
            200, dashboardData, "Dashboard summary fetched successfully"
        )
    );
});

export {
    getDashboardSummaryController
};