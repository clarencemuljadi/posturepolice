import React from "react";

const SessionDetailsTable = ({ sessionData, className }) => {
  return (
    <div className={`bg-white shadow-md ${className}`}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Last Session Details
        </h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Duration
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {sessionData.duration} min
            </dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Bad Posture Triggers
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {sessionData.badPostureCount}
            </dd>
          </div>
          <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Bad Posture / Minute
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {sessionData.badPosturePerMinute.toFixed(2)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default SessionDetailsTable;
