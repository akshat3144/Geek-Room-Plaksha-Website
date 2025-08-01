import React from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { certificateId } = context.params;
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://geekroom-plaksha.tech/api"
      : "http://localhost:5000/api");

  let data = null;
  try {
    const res = await fetch(`${baseUrl}/certificate/verify/${certificateId}`);
    if (res.headers.get("content-type")?.includes("application/json")) {
      data = await res.json();
    } else {
      data = { verified: false, message: "Invalid response from server." };
    }
  } catch {
    data = {
      verified: false,
      message: "Could not connect to verification server."
    };
  }
  return { props: { data } };
}

export default function VerifyCertificate({ data }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-white">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mt-24 mt-0">
          CERTIFICATE VERIFICATION
        </h1>
        {data.verified ? (
          <p className="text-green-400 font-semibold text-lg">
            THIS CERTIFICATE IS VERIFIED ✅
          </p>
        ) : (
          <p className="text-red-400 font-semibold text-lg">
            Certificate not found or invalid ❌
          </p>
        )}
      </div>

      {data.verified && (
        <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-lg w-full text-left border border-zinc-700">
          <div className="flex flex-col items-center">
            {data.certificate.photo && (
              <img
                src={data.certificate.photo}
                alt="Member"
                className="md:w-48 md:h-48 h-36 w-36 object-cover rounded-full shadow-md mb-4"
              />
            )}
            <div className="space-y-2 text-base md:text-lg">
              <p>
                <span className="font-semibold text-gray-300">
                  MEMBER NAME:
                </span>{" "}
                {data.certificate.memberName}
              </p>
              {data.certificate.position && (
                <p>
                  <span className="font-semibold text-gray-300">POSITION:</span>{" "}
                  {data.certificate.position}
                </p>
              )}
              {data.certificate.teamName && (
                <p>
                  <span className="font-semibold text-gray-300">
                    TEAM:
                  </span>{" "}
                  {data.certificate.teamName}
                </p>
              )}
              {data.certificate.memberSince && (
                <p>
                  <span className="font-semibold text-gray-300">
                    MEMBER SINCE:
                  </span>{" "}
                  {data.certificate.memberSince}
                </p>
              )}
              <p>
                <span className="font-semibold text-gray-300">MEMBER ID:</span>{" "}
                {data.certificate.memberId}
              </p>
              <p>
                <span className="font-semibold text-gray-300">
                  CERTIFICATE ID:
                </span>{" "}
                {data.certificate.certificateId}
              </p>
              {/* {data.certificate.description && (
                <p>
                  <span className="font-semibold text-gray-300">
                    DESCRIPTION:
                  </span>{" "}
                  {data.certificate.description}
                </p>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
