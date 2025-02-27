import React from "react";

const TodayDetailsTable = ({ sessionData, className }) => {
  return (
    <div className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Today's Details
      </h3>
      <dl className="grid grid-cols-1 gap-4">
        <div className="bg-gray-50 px-4 py-5 sm:p-6 rounded-lg">
          <dt className="text-sm font-medium text-gray-500">Duration</dt>
          <dd className="mt-1 text-2xl font-semibold text-gray-900">
            {sessionData.duration} s
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:p-6 rounded-lg">
          <dt className="text-sm font-medium text-gray-500">
            Bad Posture Triggers
          </dt>
          <dd className="mt-1 text-2xl font-semibold text-gray-900">
            {sessionData.badPostureCount}
          </dd>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:p-6 rounded-lg">
          <dt className="text-sm font-medium text-gray-500">
            Bad Posture / Second
          </dt>
          <dd className="mt-1 text-2xl font-semibold text-gray-900">
            {sessionData.badPosturePerMinute.toFixed(2)}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default TodayDetailsTable;
