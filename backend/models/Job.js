import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    posterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // ← changed from String to ObjectId ref
    category: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    minBudget: { type: Number },
    maxBudget: { type: Number },
    noBudget: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Referral" }],
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
