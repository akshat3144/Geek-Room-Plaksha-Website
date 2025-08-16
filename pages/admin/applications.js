import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Typography from "@/components/display/typography/Typography";

// Simple authentication (Note: In a real app, use a proper auth system)
const AdminApplications = () => {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const authenticate = (e) => {
    e.preventDefault();
    // This is a simple placeholder - in a real app use proper authentication
    if (
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD ||
      password === "geekroom2023"
    ) {
      setIsAuthenticated(true);
      fetchApplications();
    } else {
      setError("Invalid password");
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications/admin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();
      setApplications(data.applications);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/applications/admin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, status })
      });

      if (!response.ok) {
        throw new Error("Failed to update application status");
      }

      // Update local state
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.error("Error updating application status:", err);
      setError(err.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
        <Head>
          <title>Admin - Geek Room Plaksha Applications</title>
        </Head>
        <div className="w-full max-w-md p-8 bg-white dark:bg-neutral-800 rounded-lg shadow-md">
          <Typography variant="h3" className="text-center mb-6">
            Admin Login
          </Typography>

          {error && (
            <div className="p-4 mb-6 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-md text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={authenticate}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 py-12 px-4">
      <Head>
        <title>Admin - Geek Room Plaksha Applications</title>
      </Head>

      <div className="max-w-6xl mx-auto">
        <Typography variant="h2" className="text-center mb-8">
          Geek Room Plaksha Applications
        </Typography>

        {error && (
          <div className="p-4 mb-6 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-md text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="text-center py-8">No applications found</div>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className={`p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md border-l-4 ${
                  application.status === "approved"
                    ? "border-green-500"
                    : application.status === "rejected"
                    ? "border-red-500"
                    : "border-yellow-500"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {application.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {application.email}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        application.status === "approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : application.status === "rejected"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">
                    Why they want to join:
                  </h4>
                  <p className="bg-gray-50 dark:bg-neutral-900/50 p-3 rounded-md whitespace-pre-wrap">
                    {application.whyJoin}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">
                    Skills and Experience:
                  </h4>
                  <p className="bg-gray-50 dark:bg-neutral-900/50 p-3 rounded-md whitespace-pre-wrap">
                    {application.skills}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">Team Preference:</h4>
                  <p className="bg-gray-50 dark:bg-neutral-900/50 p-3 rounded-md">
                    {application.teamPreference}
                  </p>
                </div>

                {application.resumeUrl && (
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Resume:</h4>
                    <a
                      href={application.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      View Resume
                    </a>
                  </div>
                )}

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() =>
                      updateApplicationStatus(application._id, "approved")
                    }
                    disabled={application.status === "approved"}
                    className={`px-4 py-2 rounded-md ${
                      application.status === "approved"
                        ? "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateApplicationStatus(application._id, "rejected")
                    }
                    disabled={application.status === "rejected"}
                    className={`px-4 py-2 rounded-md ${
                      application.status === "rejected"
                        ? "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    Reject
                  </button>

                  {application.status !== "pending" && (
                    <button
                      onClick={() =>
                        updateApplicationStatus(application._id, "pending")
                      }
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
                    >
                      Mark as Pending
                    </button>
                  )}
                </div>

                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Applied on:{" "}
                  {new Date(application.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;
