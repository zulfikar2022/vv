import mongoose from "mongoose";
import { environmentVariables } from "../../environments/environmentAccess.js";

const urlSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    actual_url: {
      type: String,
      required: true,
    },
    fake_url: {
      type: String,
      required: true,
      default: function () {
        return `${
          environmentVariables.version === "production"
            ? environmentVariables.base_url_prod
            : environmentVariables.base_url_local
        }/download/${this.key}`;
      },
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    click_count: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Url = mongoose.model("Url", urlSchema);
