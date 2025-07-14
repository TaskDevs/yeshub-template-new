export const ShareProfileModal = ({ onClose,id, profileName }) => {
  const profileLink = `https://yeshubapp.pages.dev/freelancers/${id}?profile?${profileName}`;

  const copyProfileLink = () => {
    navigator.clipboard.writeText(profileLink);
    alert('Profile link copied to clipboard!');
    onClose();
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileLink)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(profileLink)}&text=${encodeURIComponent("Check out my profile!")}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileLink)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent("Check out my profile: " + profileLink)}`
  };

  const openShareWindow = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Share Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Link
          </label>
          <div className="flex">
            <input
              type="text"
              value={profileLink}
              className="flex-grow border rounded-l-md px-3 py-2 text-gray-700 focus:outline-none"
              readOnly
            />
            <button
              onClick={copyProfileLink}
              className="bg-green-800 text-white px-4 py-2 rounded-r-md"
            >
              Copy
            </button>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-medium mb-2">Share via</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => openShareWindow(shareUrls.facebook)}
              className="bg-blue-600 text-white py-2 rounded"
            >
              Facebook
            </button>
            <button
              onClick={() => openShareWindow(shareUrls.twitter)}
              className="bg-blue-400 text-white py-2 rounded"
            >
              Twitter
            </button>
            <button
              onClick={() => openShareWindow(shareUrls.linkedin)}
              className="bg-blue-700 text-white py-2 rounded"
            >
              LinkedIn
            </button>
            <button
              onClick={() => openShareWindow(shareUrls.whatsapp)}
              className="bg-green-600 text-white py-2 rounded"
            >
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
