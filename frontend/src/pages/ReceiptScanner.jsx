import { useState } from "react";
import Tesseract from "tesseract.js";
import axios from "axios";

export default function ReceiptScanner() {

  const [image, setImage] = useState(null);

  const [receiptData, setReceiptData] = useState({
    merchant: "",
    amount: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  // CATEGORY DETECTION
  const detectCategory = (text) => {

    const data = text.toLowerCase();

    const foodKeywords = [
      "kfc",
      "mcdonald",
      "burger king",
      "pizza hut",
      "dominos",
      "zomato",
      "swiggy",
      "restaurant",
      "cafe",
      "food",
      "burger",
      "pizza",
      "biryani",
    ];

    const fashionKeywords = [
      "zudio",
      "trends",
      "max",
      "pantaloons",
      "westside",
      "h&m",
      "fashion",
      "clothing",
      "shirt",
      "jeans",
    ];

    const groceryKeywords = [
      "dmart",
      "reliance fresh",
      "supermarket",
      "grocery",
      "mart",
    ];

    const medicalKeywords = [
      "apollo",
      "pharmacy",
      "medical",
      "hospital",
      "clinic",
      "medplus",
    ];

    const travelKeywords = [
      "uber",
      "ola",
      "rapido",
      "petrol",
      "fuel",
      "travel",
    ];

    const electronicsKeywords = [
      "electronics",
      "mobile",
      "laptop",
      "iphone",
      "samsung",
      "computer",
    ];

    if (foodKeywords.some((word) => data.includes(word))) {
      return "Food";
    }

    if (fashionKeywords.some((word) => data.includes(word))) {
      return "Fashion";
    }

    if (groceryKeywords.some((word) => data.includes(word))) {
      return "Groceries";
    }

    if (medicalKeywords.some((word) => data.includes(word))) {
      return "Medical";
    }

    if (travelKeywords.some((word) => data.includes(word))) {
      return "Travel";
    }

    if (electronicsKeywords.some((word) => data.includes(word))) {
      return "Electronics";
    }

    return "Others";
  };

  // AMOUNT DETECTION
  const extractAmount = (text) => {

    const cleanText = text
      .replace(/,/g, "")
      .replace(/\s+/g, " ")
      .toLowerCase();

    const priorityPatterns = [

      /grand total[^\d]*(\d+\.\d{1,2}|\d+)/i,

      /total amount[^\d]*(\d+\.\d{1,2}|\d+)/i,

      /net amount[^\d]*(\d+\.\d{1,2}|\d+)/i,

      /bill amount[^\d]*(\d+\.\d{1,2}|\d+)/i,

      /amount payable[^\d]*(\d+\.\d{1,2}|\d+)/i,

      /invoice value[^\d]*(\d+\.\d{1,2}|\d+)/i,

      /payable[^\d]*(\d+\.\d{1,2}|\d+)/i,

      /total[^\d]*(\d+\.\d{1,2}|\d+)/i,
    ];

    for (let pattern of priorityPatterns) {

      const match = cleanText.match(pattern);

      if (match) {

        const value = parseFloat(match[1]);

        if (value > 10 && value < 100000) {
          return value.toFixed(2);
        }
      }
    }

    const decimalMatches =
      cleanText.match(/\d+\.\d{2}/g);

    if (decimalMatches) {

      const validAmounts =
        decimalMatches
          .map(Number)
          .filter(
            (num) =>
              num > 10 &&
              num < 100000
          );

      if (validAmounts.length > 0) {

        return Math.max(
          ...validAmounts
        ).toFixed(2);

      }
    }

    return "";
  };

  // MERCHANT DETECTION
  const extractMerchant = (text) => {

    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    for (let line of lines.slice(0, 5)) {

      if (
        line.length > 2 &&
        !line.match(/\d{5,}/)
      ) {

        return line.replace(
          /[^a-zA-Z0-9\s&]/g,
          ""
        );

      }
    }

    return "Unknown Merchant";
  };

  // IMAGE HANDLE
  const handleImage = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setMessage("");

    setImage(
      URL.createObjectURL(file)
    );

    setLoading(true);

    try {

      const result =
        await Tesseract.recognize(
          file,
          "eng"
        );

      const text =
        result.data.text;

      const amount =
        extractAmount(text);

      const merchant =
        extractMerchant(text);

      const category =
        detectCategory(text);

      setReceiptData({
        merchant,
        amount,
        category,
      });

    }

    catch (error) {

      console.error(
        "OCR Error:",
        error
      );

      setMessage(
        "Failed to scan receipt"
      );

    }

    finally {

      setLoading(false);

    }

  };

  // SAVE
  const saveReceipt = async () => {

    try {

      if (
        !receiptData.merchant ||
        !receiptData.amount ||
        Number(receiptData.amount) <= 0
      ) {

        setMessage(
          "Invalid receipt data"
        );

        return;

      }

      await axios.post(
        "http://localhost:1971/transaction/input",

        {
          transactions: [

            {
              type: "expense",

              category:
                receiptData.category,

              amount: Number(
                receiptData.amount
              ),
            },

          ],

          description:
            receiptData.merchant,

          paymentMethod:
            "Receipt",
        },

        {
          withCredentials: true,
        }
      );

      setMessage(
        "Receipt Added Successfully"
      );

      setReceiptData({
        merchant: "",
        amount: "",
        category: "",
      });

      setImage(null);

    }

    catch (err) {

      console.log(err);

      setMessage(
        "Failed to save receipt"
      );

    }

  };

return (

  <div className="min-h-screen p-6 md:p-10 bg-[#0f172a] text-white">

    {/* MAIN CARD */}
    <div className="relative overflow-hidden bg-black/60 backdrop-blur-2xl border border-red-500/20 rounded-[36px] p-8 md:p-10 w-full max-w-5xl mx-auto shadow-[0_0_80px_rgba(255,40,0,0.25)]">

      {/* GLOW EFFECTS */}
      <div className="absolute w-72 h-72 bg-red-500/20 rounded-full blur-3xl -top-20 -left-16"></div>

      <div className="absolute w-72 h-72 bg-orange-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative z-10">

        {/* HEADER */}
        <div className="mb-10">

          <div className="inline-block px-5 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm font-semibold mb-5">

            Smart Receipt Scanner

          </div>

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">

            Receipt Scanner

          </h1>

          <p className="text-gray-300 mt-3 text-lg">

            Upload receipts and automatically detect expenses intelligently

          </p>

        </div>

        {/* FILE INPUT */}
        <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-red-500/20 bg-black/40 rounded-3xl p-10 cursor-pointer hover:border-red-400 transition-all duration-300 mb-8">

          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500 flex items-center justify-center text-5xl shadow-[0_0_45px_rgba(255,60,20,0.45)] mb-5">

            🧾

          </div>

          <h2 className="text-2xl font-bold text-white mb-2">

            Upload Receipt

          </h2>

          <p className="text-gray-400">

            JPG, PNG supported

          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />

        </label>

        {/* IMAGE */}
        {image && (

          <div className="mb-8">

            <img
              src={image}
              alt="receipt"
              className="w-full max-w-md rounded-3xl border border-red-500/20 shadow-xl"
            />

          </div>

        )}

        {/* LOADING */}
        {loading && (

          <div className="mb-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4">

            <p className="text-yellow-300 text-lg font-semibold">

              Scanning Receipt...

            </p>

          </div>

        )}

        {/* MESSAGE */}
        {message && (

          <div className="mb-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">

            <p className="text-blue-300 text-lg font-semibold">

              {message}

            </p>

          </div>

        )}

        {/* DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* MERCHANT */}
          <div className="bg-black/50 border border-red-500/20 rounded-3xl p-6">

            <p className="text-red-200 text-sm mb-3">

              Merchant

            </p>

            <h3 className="text-2xl font-bold text-white break-words">

              {receiptData.merchant || "Not Detected"}

            </h3>

          </div>

          {/* AMOUNT */}
          <div className="bg-black/50 border border-red-500/20 rounded-3xl p-6">

            <p className="text-red-200 text-sm mb-3">

              Amount

            </p>

            <h3 className="text-2xl font-bold text-green-400">

              {receiptData.amount
                ? `₹${receiptData.amount}`
                : "Not Detected"}

            </h3>

          </div>

          {/* CATEGORY */}
          <div className="bg-black/50 border border-red-500/20 rounded-3xl p-6">

            <p className="text-red-200 text-sm mb-3">

              Category

            </p>

            <h3 className="text-2xl font-bold text-orange-300">

              {receiptData.category || "Not Detected"}

            </h3>

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={saveReceipt}
          disabled={loading}
          className="w-full mt-8 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 hover:scale-[1.02] text-white font-bold text-xl py-4 rounded-2xl shadow-[0_0_45px_rgba(255,60,20,0.55)] transition-all duration-300"
        >

          {loading
            ? "Processing..."
            : "Save Receipt"}

        </button>

      </div>

    </div>

  </div>

);
}