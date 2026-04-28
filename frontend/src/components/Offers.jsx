import React, { useEffect, useState } from "react";

const getOffers = async () => {
  return [
    {
      _id: "1",
      title: "HDFC Bank Offer",
      subtitle: "5% cashback up to ₹7,500",
      type: "BANK",
      logo: "/ac_img1.jpg",
    },
    {
      _id: "2",
      title: "HSBC Offer",
      subtitle: "7.5% discount up to ₹7,500",
      type: "BANK",
      logo: "/ac_img1.jpg",
    },
  ];
};

const OfferSection = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOffers();
      const bankOffers = data.filter((o) => o.type === "BANK");
      setOffers(bankOffers);
    };
    fetchData();
  }, []);

  return (
    <div className="text-white py-6">
      {/* 🔥 Title */}
      <h2 className="text-[rgb(0,90,170)] text-xl font-semibold px-4 mb-4 text-center">
        Exciting Bank Offers For You
      </h2>

      {/* 🔁 OUTER SCROLL CONTAINER */}
      <div className="overflow-x-auto max-w-6xl mx-auto px-4 scrollbar-hide">
        {/* INNER FLEX ROW */}
        <div className="flex gap-4 w-max ">
          {offers.map((offer) => (
            <div
              key={offer._id}
              className="min-w-[280px] bg-blue-100 text-black rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:scale-105 transition"
            >
              {/* 🏦 Bank Logo */}
              <img
                src={offer.logo}
                alt={offer.title}
                className="w-12 h-12 object-contain"
              />

              {/* 📝 Text */}
              <div>
                <p className="font-semibold text-sm">{offer.subtitle}</p>
                <p className="text-xs text-gray-600">on Credit Card EMI</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferSection;
