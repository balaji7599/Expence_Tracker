import React from "react";
import { useNavigate } from "react-router-dom";
import { Baseapi } from "../confic";
import { toast } from "react-toastify";

export const Premium = ({ setIsPremium }) => {
  const navigate = useNavigate();

  const handleEnablePremium = async () => {
    try {
      await Baseapi.patch("/premium");
      toast.success("🎉 Premium enabled");
      setIsPremium(true);
      navigate(-1); // go back to previous page
    } catch (err) {
      toast.error("Failed to enable premium");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow text-center" style={{ width: 380 }}>
        <h4>Upgrade to Premium</h4>
        <p className="text-muted">
          Premium users can delete expenses.
        </p>

        <button
          className="btn btn-success w-100 mb-2"
          onClick={handleEnablePremium}
        >
          Enable Premium
        </button>

        <button
          className="btn btn-outline-secondary w-100"
          onClick={() => navigate(-1)}
        >
          Close
        </button>
      </div>
    </div>
  );
};
