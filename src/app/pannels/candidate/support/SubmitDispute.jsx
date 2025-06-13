import React, { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Website Redesign Project',
    client: 'Northstar Digital',
    value: '$4,500',
    status: 'Active',
    date: 'Apr 15, 2025',
  },
  {
    id: 2,
    title: 'Mobile App Development',
    client: 'TechFusion Labs',
    value: '$8,200',
    status: 'In Progress',
    date: 'Mar 22, 2025',
  },
  {
    id: 3,
    title: 'Content Marketing Strategy',
    client: 'Elevate Brands',
    value: '$3,750',
    status: 'Payment Due',
    date: 'May 3, 2025',
  },
];

const statusStyles = {
  Active: 'bg-green-100 text-green-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  'Payment Due': 'bg-red-100 text-red-700',
};

const urgencyOptions = [
  { value: 'low', label: 'Low Urgency', description: 'Standard response time (7–10 business days)' },
  { value: 'medium', label: 'Medium Urgency', description: 'Expedited response time (3–5 business days)' },
  { value: 'high', label: 'High Urgency', description: 'Priority response time (1–2 business days)' },
];

const timelineSteps = [
  { title: 'Initial Filing', description: 'Submit your dispute with all relevant details and evidence.', duration: '', current: true },
  { title: 'Evidence Collection', description: 'Both parties provide supporting evidence', duration: ' (3–5 days)' },
  { title: 'Mediation Process', description: 'A dispute specialist facilitates resolution', duration: ' (5–7 days)' },
  { title: 'Resolution Proposal', description: 'Solution options are presented', duration: ' (2–3 days)' },
  { title: 'Implementation', description: 'Agreed resolution is implemented', duration: ' (1–3 days)' },
];

const resolutionOptions = [
  { label: 'Full refund/payment', description: 'Request complete return of funds or full payment for work' },
  { label: 'Partial refund/payment', description: 'Request a specific amount based on work completed' },
  { label: 'Work completion', description: 'Request completion of contracted work as specified' },
  { label: 'Contract revision', description: 'Request changes to existing contract terms' },
  { label: 'Other resolution', description: 'Specify a different desired outcome' },
];

export default function SubmitDispute() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [urgency, setUrgency] = useState('');
  const [resolution, setResolution] = useState('');

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const imagePreviews = selectedFiles
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => ({ name: file.name, url: URL.createObjectURL(file) }));
    setFiles((prev) => [...prev, ...selectedFiles]);
    setPreviews((prev) => [...prev, ...imagePreviews]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    const removedFile = updatedFiles.splice(index, 1)[0];
    if (removedFile.type.startsWith('image/')) {
      setPreviews((prev) => prev.filter((preview) => preview.name !== removedFile.name));
      URL.revokeObjectURL(removedFile.url);
    }
    setFiles(updatedFiles);
  };


  const handleSubmit = () => {
  // Validation
  if (!selectedProjectId || !title || !description || !resolution || !urgency) {
    alert('Please complete all required fields before submitting.');
    return;
  }

  // Prepare form data
  const formData = new FormData();
  formData.append('projectId', selectedProjectId);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('urgency', urgency);
  formData.append('resolution', resolution);
  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });

  // Simulate submission
  alert('Dispute submitted successfully!');
  console.log({
    projectId: selectedProjectId,
    title,
    description,
    urgency,
    resolution,
    files,
  });

  // Reset form (optional)
  setSelectedProjectId(null);
  setTitle('');
  setDescription('');
  setFiles([]);
  setPreviews([]);
  setUrgency('');
  setResolution('');
};

  return (
    <div className="tw-css max-w-5xl mx-auto p-6">
      <a href="#" className="text-sm text-gray-500 mb-4 inline-block">&larr; Back to Support Center</a>
      <h1 className="text-3xl font-bold mb-2">Submit a Dispute</h1>
      <p className="text-gray-600 mb-8">Help us resolve your issue efficiently by providing complete information.</p>

      {/* Steps Progress */}
      <div className="flex items-center mb-10">
        {[1, 2, 3, 4].map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-white ${step === 1 ? 'bg-green-600' : 'bg-gray-300 text-gray-600'}`}>{step}</div>
            </div>
            {step !== 4 && <div className="flex-1 h-1 bg-gray-300 mx-2" />}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-10">
        {/* Step 1: Project Selection */}
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Select Project or Contract</h2>
          <input type="text" placeholder="Search your projects..." className="w-full p-2 border rounded mb-4 text-sm" />
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div key={proj.id} onClick={() => setSelectedProjectId(proj.id)} className={`p-4 border rounded-lg cursor-pointer transition ${selectedProjectId === proj.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}>
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium">{proj.title}</div>
                  <span className={`text-xs px-2 py-1 rounded ${statusStyles[proj.status]}`}>{proj.status}</span>
                </div>
                <div className="text-sm text-gray-600">Client: {proj.client}</div>
                <div className="text-sm text-gray-600">Contract value: {proj.value}</div>
                <div className="text-sm text-gray-400 mt-1">Started: {proj.date}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Step 2: Description */}
        <section>
          <h2 className="text-xl font-semibold mb-4">2. Describe the Issue</h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dispute Title</label>
          <input type="text" placeholder="E.g., Payment delay for completed milestone" className="w-full p-2 border rounded mb-4" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
          <textarea rows="6" placeholder="Please describe the issue in detail..." className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="text-sm text-gray-400 mt-1 text-right">{description.length}/2000 characters</div>
        </section>

        {/* Step 3: Upload Evidence */}
        <section>
          <h2 className="text-xl font-semibold mb-4">3. Upload Evidence</h2>
          <p className="text-sm text-gray-500 mb-2">Attach relevant files that support your case.</p>
          <div className="border border-dashed rounded p-6 text-center">
            <input type="file" multiple onChange={handleFileUpload} className="hidden" id="fileUpload" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.zip" />
            <label htmlFor="fileUpload" className="cursor-pointer text-gray-600 hover:text-blue-500 text-sm">Drag files here or click to upload</label>
            <p className="text-xs text-gray-400 mt-2">Accepted formats: PDF, DOC, JPG, PNG, MP4, ZIP (Max 10MB)</p>
          </div>
          {files.length > 0 && (
            <ul className="mt-4 text-sm text-gray-600 space-y-2">
              {files.map((file, idx) => (
                <li key={idx} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span className="flex items-center gap-2">{file.type.startsWith('image/') ? '🖼️' : '📄'} {file.name}</span>
                  <button onClick={() => handleRemoveFile(idx)} className="text-red-500 hover:underline text-xs">Remove</button>
                </li>
              ))}
            </ul>
          )}
          {previews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {previews.map((preview, idx) => (
                <div key={idx} className="relative border rounded overflow-hidden">
                  <img src={preview.url} alt={preview.name} className="w-full h-32 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">{preview.name}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Step 4: Resolution */}
        <section>
          <h2 className="text-xl font-semibold mb-4">4. Desired Resolution</h2>
          <div className="space-y-3">
            {resolutionOptions.map((option, idx) => (
              <label key={idx} className={`block border rounded-lg p-4 cursor-pointer transition ${resolution === option.label ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}>
                <input type="radio" name="resolution" value={option.label} className="mr-2" checked={resolution === option.label} onChange={() => setResolution(option.label)} />
                <span className="font-medium">{option.label}</span>
                <div className="text-sm text-gray-500 mt-1">{option.description}</div>
              </label>
            ))}
          </div>
        </section>

        {/* Step 5: Urgency & Timeline */}

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Urgency Level</h2>
          <div className="space-y-3">
            {urgencyOptions.map(option => (
              <label key={option.value} className={`border rounded-lg p-4 flex items-start cursor-pointer ${urgency === option.value ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                <input type="radio" name="urgency" value={option.value} checked={urgency === option.value} onChange={() => setUrgency(option.value)} className="mt-1 mr-4 accent-green-600" />
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-md">
            <h3 className="text-base font-semibold mb-4">Dispute Resolution Timeline</h3>
            <ol className="space-y-4">
              {timelineSteps.map((step, index) => (
                <li key={index} className="flex items-start">
            <div className="flex flex-col items-center mr-1">

                    <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-sm font-bold ${step.current ? 'bg-green-600' : 'bg-gray-300'}`}>{index + 1}</div>
                    {index < timelineSteps.length - 1 && <div className="w-px h-6 bg-gray-300" />}
                  </div>
                  <div>
                    <div className="font-medium">{step.title}</div>
                    <div className="text-sm text-gray-600">
                      {step.description}{step.duration}
                      {step.current && <span className="text-green-600 ml-2">● You are here</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button className="text-sm text-gray-500 hover:underline">Cancel</button>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 rounded-md">Save as Draft</button>
              <button 
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-md">Submit Dispute</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
