import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import Stripe from "npm:stripe";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Stripe with secret key from environment
const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
if (!stripeSecretKey) {
  console.error("CRITICAL: STRIPE_SECRET_KEY not found in environment variables");
}
const stripe = new Stripe(stripeSecretKey || "", {
  apiVersion: "2024-12-18.acacia",
});

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-6d6e67ed/health", (c) => {
  return c.json({ status: "ok" });
});

// Account creation endpoint
app.post("/make-server-6d6e67ed/create-account", async (c) => {
  try {
    const body = await c.req.json();
    const timestamp = new Date().toISOString();
    const accountId = `${body.userType}_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Log the account creation attempt
    const attemptLog = {
      accountId,
      userType: body.userType,
      email: body.email,
      timestamp,
      status: "pending",
      ipAddress: c.req.header("x-forwarded-for") || "unknown",
    };

    await kv.set(`attempt_${accountId}`, attemptLog);
    console.log(`Account creation attempt logged: ${accountId}`);

    // Validate required fields
    if (!body.email || !body.password || !body.userType) {
      await kv.set(`attempt_${accountId}`, { ...attemptLog, status: "failed", reason: "Missing required fields" });
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }

    // Store account data based on user type
    const accountData = {
      accountId,
      userType: body.userType,
      email: body.email,
      createdAt: timestamp,
      status: "active",
    };

    if (body.userType === "donor") {
      Object.assign(accountData, {
        firstName: body.firstName,
        lastName: body.lastName,
        city: body.city,
        state: body.state,
        interests: body.interests,
      });
    } else if (body.userType === "nonprofit") {
      Object.assign(accountData, {
        organizationName: body.organizationName,
        ein: body.ein,
        causeCategory: body.causeCategory,
        organizationDescription: body.organizationDescription,
        website: body.website,
        organizationCity: body.organizationCity,
        organizationState: body.organizationState,
        contactPhone: body.contactPhone,
      });
    }

    // Store the account
    await kv.set(`account_${accountId}`, accountData);
    
    // Store password separately (in production, this should be hashed!)
    await kv.set(`password_${accountId}`, body.password);
    
    // Store email-to-account mapping for login lookup
    await kv.set(`email_${body.email}`, accountId);

    // Update attempt log to success
    await kv.set(`attempt_${accountId}`, { ...attemptLog, status: "success" });

    console.log(`Account created successfully: ${accountId} (${body.userType})`);

    return c.json({
      success: true,
      accountId,
      userType: body.userType,
      message: "Account created successfully",
    });

  } catch (error) {
    console.error("Error creating account:", error);
    return c.json({ 
      success: false, 
      error: "Failed to create account",
      details: error.message 
    }, 500);
  }
});

// Get account creation attempts (for admin/debugging)
app.get("/make-server-6d6e67ed/attempts", async (c) => {
  try {
    const attempts = await kv.getByPrefix("attempt_");
    return c.json({ success: true, attempts });
  } catch (error) {
    console.error("Error fetching attempts:", error);
    return c.json({ success: false, error: "Failed to fetch attempts" }, 500);
  }
});

// Get account by email (for login - basic example)
app.post("/make-server-6d6e67ed/get-account", async (c) => {
  try {
    const { email } = await c.req.json();
    const accountId = await kv.get(`email_${email}`);
    
    if (!accountId) {
      return c.json({ success: false, error: "Account not found" }, 404);
    }

    const account = await kv.get(`account_${accountId}`);
    return c.json({ success: true, account });
  } catch (error) {
    console.error("Error fetching account:", error);
    return c.json({ success: false, error: "Failed to fetch account" }, 500);
  }
});

// Sign in endpoint
app.post("/make-server-6d6e67ed/sign-in", async (c) => {
  try {
    const { email, password } = await c.req.json();
    const timestamp = new Date().toISOString();

    // Log the sign-in attempt
    const attemptId = `signin_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const attemptLog = {
      attemptId,
      email,
      timestamp,
      status: "pending",
      ipAddress: c.req.header("x-forwarded-for") || "unknown",
    };

    await kv.set(`signin_attempt_${attemptId}`, attemptLog);
    console.log(`Sign-in attempt logged: ${attemptId} for ${email}`);

    // Validate required fields
    if (!email || !password) {
      await kv.set(`signin_attempt_${attemptId}`, { ...attemptLog, status: "failed", reason: "Missing credentials" });
      return c.json({ success: false, error: "Email and password are required" }, 400);
    }

    // Get account by email
    const accountId = await kv.get(`email_${email}`);
    
    if (!accountId) {
      await kv.set(`signin_attempt_${attemptId}`, { ...attemptLog, status: "failed", reason: "Account not found" });
      console.log(`Sign-in failed: Account not found for ${email}`);
      return c.json({ success: false, error: "Invalid email or password" }, 401);
    }

    const account = await kv.get(`account_${accountId}`);
    
    if (!account) {
      await kv.set(`signin_attempt_${attemptId}`, { ...attemptLog, status: "failed", reason: "Account data missing" });
      console.log(`Sign-in failed: Account data missing for ${accountId}`);
      return c.json({ success: false, error: "Invalid email or password" }, 401);
    }

    // In a real application, you would hash and compare passwords
    // For this prototype, we're storing passwords in the account data during signup
    // NOTE: This is NOT secure for production use!
    const storedPassword = await kv.get(`password_${accountId}`);
    
    if (storedPassword !== password) {
      await kv.set(`signin_attempt_${attemptId}`, { ...attemptLog, status: "failed", reason: "Invalid password" });
      console.log(`Sign-in failed: Invalid password for ${email}`);
      return c.json({ success: false, error: "Invalid email or password" }, 401);
    }

    // Update attempt log to success
    await kv.set(`signin_attempt_${attemptId}`, { ...attemptLog, status: "success" });

    console.log(`Sign-in successful: ${accountId} (${account.userType})`);

    return c.json({
      success: true,
      account,
      message: "Sign in successful",
    });

  } catch (error) {
    console.error("Error during sign-in:", error);
    return c.json({ 
      success: false, 
      error: "Failed to sign in",
      details: error.message 
    }, 500);
  }
});

// Create payment intent for donation
app.post("/make-server-6d6e67ed/create-payment-intent", async (c) => {
  try {
    const { amount, campaignId, donorEmail, isRecurring, recurringFrequency } = await c.req.json();

    // Validate input
    if (!amount || amount <= 0) {
      return c.json({ success: false, error: "Invalid donation amount" }, 400);
    }

    if (!campaignId) {
      return c.json({ success: false, error: "Campaign ID is required" }, 400);
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      metadata: {
        campaignId,
        donorEmail: donorEmail || "anonymous",
        isRecurring: isRecurring ? "true" : "false",
        recurringFrequency: recurringFrequency || "",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(`Payment intent created: ${paymentIntent.id} for campaign ${campaignId}, amount: $${amount}, recurring: ${isRecurring}${isRecurring ? ` (${recurringFrequency})` : ""}`);

    return c.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error("Error creating payment intent:", error);
    return c.json({
      success: false,
      error: "Failed to create payment intent",
      details: error.message,
    }, 500);
  }
});

// Record donation after successful payment
app.post("/make-server-6d6e67ed/record-donation", async (c) => {
  try {
    const { paymentIntentId, campaignId, amount, donorEmail, donorName, isRecurring, recurringFrequency } = await c.req.json();

    // Validate required fields
    if (!paymentIntentId || !campaignId || !amount) {
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      console.log(`Payment verification failed: Payment intent ${paymentIntentId} status is ${paymentIntent.status}`);
      return c.json({ success: false, error: "Payment not completed" }, 400);
    }

    // Create donation record
    const donationId = `donation_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const donation = {
      donationId,
      paymentIntentId,
      campaignId,
      amount,
      donorEmail: donorEmail || "anonymous",
      donorName: donorName || "Anonymous",
      timestamp: new Date().toISOString(),
      status: "completed",
      recurring: isRecurring || false,
      recurringFrequency: recurringFrequency || "",
    };

    // Store donation
    await kv.set(`donation_${donationId}`, donation);

    // Update campaign total
    const campaignKey = `campaign_${campaignId}_total`;
    const currentTotal = (await kv.get(campaignKey)) || 0;
    const newTotal = Number(currentTotal) + Number(amount);
    await kv.set(campaignKey, newTotal);

    console.log(`Donation recorded: ${donationId} for campaign ${campaignId}, amount: $${amount}, recurring: ${isRecurring}${isRecurring ? ` (${recurringFrequency})` : ""}, new total: $${newTotal}`);

    return c.json({
      success: true,
      donationId,
      campaignTotal: newTotal,
      message: "Donation recorded successfully",
    });

  } catch (error) {
    console.error("Error recording donation:", error);
    return c.json({
      success: false,
      error: "Failed to record donation",
      details: error.message,
    }, 500);
  }
});

// Get campaign donation total
app.get("/make-server-6d6e67ed/campaign/:campaignId/total", async (c) => {
  try {
    const campaignId = c.req.param("campaignId");
    const total = (await kv.get(`campaign_${campaignId}_total`)) || 0;

    return c.json({
      success: true,
      campaignId,
      total: Number(total),
    });

  } catch (error) {
    console.error("Error fetching campaign total:", error);
    return c.json({
      success: false,
      error: "Failed to fetch campaign total",
    }, 500);
  }
});

Deno.serve(app.fetch);