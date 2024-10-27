import Stripe from "stripe";
import { catchError } from "../middlewares/catchErrors";
import { NextFunction, Response, Request } from "express";
import { Venue } from "../modules/venue/venue.model";
import { Booking } from "../modules/bookings/booking.model";
import { Transaction } from "../../Database/transaction.model";
import { IVenue } from "../modules/venue/venueINTF";
import { IBooking } from "../modules/bookings/bookingINTF";
const stripe = new Stripe(
  "sk_test_51QEXMcDxHURjLhJB5TpPFArhWAdPlOtHkLILenomS74N8YjJ4XLqsUVzLRCCOCLVZNTgB6xb7rQHCDbcTNJ5Vmep00dP15RWO4"
);
export let createCheckOutSessions = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    let venue: IVenue | null = await Venue.findById(req.params.id);
    let booking: IBooking | null = await Booking.findOne({
      date: req.body.date,
    });
    let session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "egp",
            unit_amount: venue?.price,
            product_data: {
              name: venue?.name!,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success-payment/${booking?._id}`,
      cancel_url: `https://gemini.google.com/app/7017f304a2d562fe`,
      customer_email: req.user?.email,
      client_reference_id: req.user?.userId,
    });
    // storing transactions in the sql database
    let transaction = await Transaction.create({
      amount_total: session.amount_total,
      email: session.customer_email,
      payment_status: session.payment_status,
    });
    res.status(200).json({ message: "success", session });
  }
);
