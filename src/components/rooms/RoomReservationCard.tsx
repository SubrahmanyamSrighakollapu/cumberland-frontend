"use client";

import { useState } from "react";
import Link from "next/link";
import { RoomDetail } from "@/data/rooms";

interface RoomReservationCardProps {
  room: RoomDetail;
}

export default function RoomReservationCard({
  room,
}: RoomReservationCardProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(room.capacityGuests || 2);
  const [roomCount, setRoomCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!checkIn || !checkOut) {
      setErrorMessage("Please select both check-in and check-out dates.");
      return;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (end <= start) {
      setErrorMessage("Check-out date must be later than check-in date.");
      return;
    }

    const maxGuestsAllowed = room.capacityGuests * roomCount;
    if (adults > maxGuestsAllowed) {
      setErrorMessage(
        `This room type accommodates up to ${room.capacityGuests} guests per room. Please increase room count.`
      );
      return;
    }

    setIsSummaryModalOpen(true);
  };

  return (
    <div
      id="room-reservation"
      className="bg-[#0f302a] text-[#f7f4ee] rounded-2xl p-6 sm:p-8 shadow-xl border border-[#17352d] scroll-mt-24"
    >
      <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white mb-1">
        Reserve your stay
      </h2>
      <p className="text-xs sm:text-sm text-[#f7f4ee]/80 font-sans mb-6">
        Check availability and secure your dates.
      </p>

      {errorMessage && (
        <div className="mb-5 p-3 rounded-lg bg-red-900/40 border border-red-500/50 text-red-200 text-xs font-sans">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Check-in & Check-out */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="reservation-checkin"
              className="block text-xs font-semibold uppercase tracking-wider text-[#f7f4ee]/70 mb-1.5 font-sans"
            >
              Check-in
            </label>
            <input
              type="date"
              id="reservation-checkin"
              required
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-white text-[#0f302a] border border-[#d9d0c4] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#52c92d]"
            />
          </div>

          <div>
            <label
              htmlFor="reservation-checkout"
              className="block text-xs font-semibold uppercase tracking-wider text-[#f7f4ee]/70 mb-1.5 font-sans"
            >
              Check-out
            </label>
            <input
              type="date"
              id="reservation-checkout"
              required
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-white text-[#0f302a] border border-[#d9d0c4] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#52c92d]"
            />
          </div>
        </div>

        {/* Row 2: Guests & Rooms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="reservation-guests"
              className="block text-xs font-semibold uppercase tracking-wider text-[#f7f4ee]/70 mb-1.5 font-sans"
            >
              Guests
            </label>
            <select
              id="reservation-guests"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full bg-white text-[#0f302a] border border-[#d9d0c4] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#52c92d]"
            >
              <option value={1}>1 Adult</option>
              <option value={2}>2 Adults</option>
              <option value={3}>3 Adults</option>
              <option value={4}>4 Adults</option>
              <option value={5}>5 Adults</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="reservation-rooms"
              className="block text-xs font-semibold uppercase tracking-wider text-[#f7f4ee]/70 mb-1.5 font-sans"
            >
              Rooms
            </label>
            <select
              id="reservation-rooms"
              value={roomCount}
              onChange={(e) => setRoomCount(Number(e.target.value))}
              className="w-full bg-white text-[#0f302a] border border-[#d9d0c4] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#52c92d]"
            >
              <option value={1}>1 Room</option>
              <option value={2}>2 Rooms</option>
              <option value={3}>3 Rooms</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center h-12 bg-[#80563e] hover:bg-[#69452f] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-lg transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80563e]"
          >
            CHECK AVAILABILITY &rarr;
          </button>
        </div>
      </form>

      {/* Decorative Price Area Divider & Rate Display */}
      <div className="mt-6 pt-5 border-t border-[#17352d] text-center">
        <span className="text-xs text-[#f7f4ee]/70 font-sans block mb-1">
          Starting Rate
        </span>
        <div className="font-serif text-2xl sm:text-3xl font-semibold text-white">
          From {room.currency}
          {room.price} <span className="text-xs font-sans font-normal text-[#f7f4ee]/80">{room.priceUnit}</span>
        </div>

        <p className="text-[11px] text-[#f7f4ee]/60 font-sans italic mt-3">
          Availability preview — no booking is made
        </p>
      </div>

      {/* Availability Preview Summary Modal */}
      {isSummaryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white text-[#0f302a] rounded-2xl p-6 sm:p-8 max-w-md w-full border border-[#d9d0c4] shadow-2xl relative">
            <button
              onClick={() => setIsSummaryModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#50544e] hover:text-[#0f302a] rounded-full hover:bg-[#f7f4ee] transition-colors"
              aria-label="Close summary modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="w-12 h-12 rounded-full bg-[#e9efe8] text-[#80563e] flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[#0f302a] mb-2">
              Availability Preview
            </h3>

            <div className="bg-[#f7f4ee] rounded-xl p-4 mb-4 space-y-2 text-xs text-[#50544e]">
              <div className="flex justify-between border-b border-[#d9d0c4]/60 pb-1.5">
                <span className="font-medium text-[#0f302a]">Selected Room:</span>
                <span>{room.name}</span>
              </div>
              <div className="flex justify-between border-b border-[#d9d0c4]/60 pb-1.5">
                <span className="font-medium text-[#0f302a]">Check-in:</span>
                <span>{checkIn}</span>
              </div>
              <div className="flex justify-between border-b border-[#d9d0c4]/60 pb-1.5">
                <span className="font-medium text-[#0f302a]">Check-out:</span>
                <span>{checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#0f302a]">Guests / Rooms:</span>
                <span>
                  {adults} Guests &bull; {roomCount} Room(s)
                </span>
              </div>
            </div>

            <p className="text-xs text-[#50544e] font-sans leading-relaxed mb-6">
              Availability is not connected yet. Please contact our team to confirm these dates and secure your reservation.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                onClick={() => setIsSummaryModalOpen(false)}
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-[#80563e] hover:bg-[#69452f] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors text-center"
              >
                Contact Our Team &rarr;
              </Link>
              <button
                onClick={() => setIsSummaryModalOpen(false)}
                className="px-4 py-2.5 bg-[#f7f4ee] hover:bg-[#e9efe8] text-[#0f302a] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
