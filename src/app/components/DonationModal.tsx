import { useState } from "react";
import { X } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { projectId, publicAnonKey } from "/utils/supabase/info";

// Stripe publishable key (safe to include in client code)
const STRIPE_PUBLISHABLE_KEY = "pk_test_51TK2Y9Pr6jepXluJR63pDenuHqL4xmIP8tWaScFAdcx0NL5jA4RHiWAb1EuQCAsx1qReK0DkKOLEKqFUc947LWso003GFtNptr";

// Initialize Stripe with publishable key
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface DonationModalProps {
  campaignId: number;
  campaignName: string;
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

interface CheckoutFormProps {
  campaignId: number;
  campaignName: string;
  amount: number;
  isRecurring: boolean;
  recurringFrequency: "weekly" | "monthly" | "quarterly" | "annually";
  onSuccess: (amount: number) => void;
  onCancel: () => void;
}

function CheckoutForm({
  campaignId,
  campaignName,
  amount,
  isRecurring,
  recurringFrequency,
  onSuccess,
  onCancel,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getFrequencyText = (frequency: string) => {
    const frequencyMap: { [key: string]: string } = {
      weekly: "week",
      monthly: "month",
      quarterly: "quarter",
      annually: "year"
    };
    return frequencyMap[frequency] || "month";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "Payment failed");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        // Get session data for donor info
        const sessionData =
          localStorage.getItem("pairwell_session") ||
          sessionStorage.getItem("pairwell_session");
        let donorEmail = "anonymous";
        let donorName = "Anonymous";

        if (sessionData) {
          const user = JSON.parse(sessionData);
          donorEmail = user.email || "anonymous";
          donorName = user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.organizationName || "Anonymous";
        }

        // Record donation in backend
        const recordResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-6d6e67ed/record-donation`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              paymentIntentId: paymentIntent.id,
              campaignId,
              amount,
              donorEmail,
              donorName,
              isRecurring,
              recurringFrequency: isRecurring ? recurringFrequency : undefined,
            }),
          }
        );

        const recordData = await recordResponse.json();

        if (!recordData.success) {
          throw new Error(recordData.error || "Failed to record donation");
        }

        console.log("Donation recorded successfully:", recordData);

        // Save donation to user's localStorage for dashboard display
        if (donorEmail !== "anonymous") {
          const userDonationsKey = `pairwell_donations_${donorEmail}`;
          const existingDonations = JSON.parse(localStorage.getItem(userDonationsKey) || "[]");

          const newDonation = {
            id: Date.now(),
            nonprofit: campaignName,
            amount: amount,
            date: new Date().toISOString().split('T')[0],
            recurring: isRecurring,
            recurringFrequency: isRecurring ? recurringFrequency : undefined,
            category: "General",
            status: "completed",
            paymentIntentId: paymentIntent.id,
            campaignId: campaignId
          };

          existingDonations.unshift(newDonation); // Add to beginning
          localStorage.setItem(userDonationsKey, JSON.stringify(existingDonations));

          // Create notification for this donation
          const userNotificationsKey = `pairwell_notifications_${donorEmail}`;
          const existingNotifications = JSON.parse(localStorage.getItem(userNotificationsKey) || "[]");

          const frequencyText = isRecurring ? getFrequencyText(recurringFrequency) : "";
          const newNotification = {
            id: Date.now(),
            nonprofit: campaignName,
            message: `Thank you for your generous ${isRecurring ? `${recurringFrequency} recurring ` : ""}donation of $${amount.toLocaleString()}${isRecurring ? ` per ${frequencyText}` : ""}! Your support makes a real difference in our mission.`,
            date: new Date().toISOString(),
            read: false,
            type: "thank_you"
          };

          existingNotifications.unshift(newNotification); // Add to beginning
          localStorage.setItem(userNotificationsKey, JSON.stringify(existingNotifications));
        }

        onSuccess(amount);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Payment failed"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const frequencyText = getFrequencyText(recurringFrequency);
  const frequencyLabel = recurringFrequency.charAt(0).toUpperCase() + recurringFrequency.slice(1);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-bold text-lg text-[#023047] mb-2">
          {isRecurring ? `${frequencyLabel} Recurring ` : ""}Donate ${amount.toLocaleString()} to {campaignName}
        </h3>
        <p className="text-sm text-gray-600">
          {isRecurring
            ? `Your card will be charged ${recurringFrequency}. You can cancel anytime.`
            : "Enter your payment details below"
          }
        </p>
      </div>

      <PaymentElement />

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {errorMessage}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 bg-[#feb705] text-[#023047] font-bold px-6 py-3 rounded-lg hover:bg-[#e5a605] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Processing..." : `Donate $${amount.toLocaleString()}${isRecurring ? ` per ${frequencyText}` : ""}`}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          className="px-6 py-3 border-2 border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export function DonationModal({
  campaignId,
  campaignName,
  onClose,
  onSuccess,
}: DonationModalProps) {
  const [step, setStep] = useState<"amount" | "payment">("amount");
  const [amount, setAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState<"weekly" | "monthly" | "quarterly" | "annually">("monthly");

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
  };

  const handleContinue = async () => {
    const donationAmount = parseFloat(amount);

    if (!donationAmount || donationAmount <= 0) {
      setErrorMessage("Please enter a valid donation amount");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Get session data for donor info
      const sessionData =
        localStorage.getItem("pairwell_session") ||
        sessionStorage.getItem("pairwell_session");
      let donorEmail = "anonymous";

      if (sessionData) {
        const user = JSON.parse(sessionData);
        donorEmail = user.email || "anonymous";
      }

      // Create payment intent
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6d6e67ed/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            amount: donationAmount,
            campaignId,
            donorEmail,
            isRecurring,
            recurringFrequency: isRecurring ? recurringFrequency : undefined,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create payment intent");
      }

      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch (error) {
      console.error("Error creating payment intent:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to initialize payment"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = (donatedAmount: number) => {
    onSuccess(donatedAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#023047]">Make a Donation</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {step === "amount" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-[#023047] mb-4">
                  Select or enter donation amount
                </h3>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {predefinedAmounts.map((value) => (
                    <button
                      key={value}
                      onClick={() => handleAmountSelect(value)}
                      className={`py-3 px-4 rounded-lg border-2 font-bold transition-colors ${
                        amount === value.toString()
                          ? "border-[#feb705] bg-[#feb705] text-[#023047]"
                          : "border-gray-300 text-gray-700 hover:border-[#feb705]"
                      }`}
                    >
                      ${value}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#023047] mb-2">
                    Custom Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      min="1"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#feb705] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="mt-1 w-5 h-5 text-[#feb705] border-gray-300 rounded focus:ring-[#feb705]"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-[#023047]">
                      Make this a recurring donation
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Your donation will be automatically processed. You can cancel anytime.
                    </div>
                  </div>
                </label>

                {isRecurring && (
                  <div className="ml-8 pt-3 border-t border-gray-300">
                    <label className="block text-sm font-bold text-[#023047] mb-2">
                      Frequency
                    </label>
                    <select
                      value={recurringFrequency}
                      onChange={(e) => setRecurringFrequency(e.target.value as "weekly" | "monthly" | "quarterly" | "annually")}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#feb705] focus:outline-none font-medium text-[#023047]"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly (every 3 months)</option>
                      <option value="annually">Annually (once a year)</option>
                    </select>
                  </div>
                )}
              </div>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {errorMessage}
                </div>
              )}

              <button
                onClick={handleContinue}
                disabled={!amount || isLoading}
                className="w-full bg-[#feb705] text-[#023047] font-bold px-6 py-3 rounded-lg hover:bg-[#e5a605] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Loading..." : "Continue to Payment"}
              </button>
            </div>
          )}

          {step === "payment" && clientSecret && (
            <Elements
              key={clientSecret}
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <CheckoutForm
                campaignId={campaignId}
                campaignName={campaignName}
                amount={parseFloat(amount)}
                isRecurring={isRecurring}
                recurringFrequency={recurringFrequency}
                onSuccess={handleSuccess}
                onCancel={() => setStep("amount")}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}
