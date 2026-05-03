function ApiCard({
  api,
  userPlan,
  onGenerateKey,
  onUpgrade,
  onSelectApi,
}) {
  const isFree = api.pricePerRequest === 0;
  const canUse = isFree || userPlan === "pro";

  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <h3 className="font-bold">{api.name}</h3>
      <p className="text-gray-500 text-sm">{api.baseUrl}</p>

      {/* TYPE */}
      <div className="mt-2">
        {isFree ? (
          <span className="text-green-600 font-bold">FREE</span>
        ) : (
          <span className="text-yellow-600 font-bold">PRO</span>
        )}
      </div>

      {/* PRICE */}
      {!isFree && (
        <p className="text-sm mt-1">
          ₹ {api.pricePerRequest} / request
        </p>
      )}

      {/* ACTIONS */}
      <div className="mt-4 space-y-2">
        {canUse ? (
          <>
            <button onClick={() => onGenerateKey(api._id)}
              className="border border-indigo-500 text-indigo-500 px-3 py-2 rounded w-full"
              >
           Generate Key
          </button>

          <button onClick={() => onSelectApi(api)}
            className="border border-indigo-500 text-indigo-500 px-3 py-2 rounded w-full"
            >
             Use this API
          </button>
          </>
        ) : (
          <button
            onClick={onUpgrade}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded w-full"
          >
            🔒 Upgrade to use
          </button>
        )}
      </div>

    </div>
  );
}

export default ApiCard;