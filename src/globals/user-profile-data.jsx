export const USERPROFILEFIELD = {
  fieldDetail: [
    {
      name: "firstname",
      label: "First Name",
      type: "text",
      placeholder: "David",
    },
    {
      name: "lastname",
      label: "Last Name",
      type: "text",
      placeholder: "Smith",
    },

    {
      name: "telephone",
      label: "Phone",
      type: "text",
      placeholder: "(+233) 554-456-789",
    },
    {
      name: "profession",
      label: "Profession",
      type: "text",
      placeholder: "",
    },
    {
      name: "experience",
      label: "Experience",
      type: "text",
      placeholder: "",
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Till street",
    },
    {
      name: "region",
      label: "Region",
      type: "text",
      placeholder: "",
    },
    {
      name: "gps_address",
      label: "GPS Address",
      type: "text",
      placeholder: "GA1826363",
    },
    {
      name: "postal_code",
      label: "Postal Code",
      type: "text",
      placeholder: "GT 560 AB0252",
    },
    {
      name: "skills_id",
      label: "Skills",
      type: "text",
      placeholder: "Select Skill",
    },

    {
      name: "bio",
      label: "Bio",
      type: "text",
      placeholder: "",
    },
  ],
};

export const START_USER_PROFILE_FIELD = {
  fieldDetailOne: [
    {
      name: "firstname",
      label: "First Name",
      type: "text",
      placeholder: "David",
    },
    {
      name: "lastname",
      label: "Last Name",
      type: "text",
      placeholder: "Smith",
    },

    {
      name: "telephone",
      label: "Phone",
      type: "text",
      placeholder: "(+233) 554-456-789",
    },
    {
      name: "city",
      label: "City",
      type: "text",
      options: ["ben", "Intermediate", "Expert"],
    },
    {
      name: "region",
      label: "Region",
      type: "text",
      placeholder: "Accra-Central",
      options: ["ben", "Intermediate", "Expert"],
    },
    
  ],
  fieldDetailTwo: [
    {
      name: "address",
      label: "Street Address",
      type: "text",
      placeholder: "Smith",
    },
    {
      name: "gps_address",
      label: "GPS Address",
      type: "text",
      placeholder: "GA1826363",
    },
    {
      name: "postal_code",
      label: "Postal Code",
      type: "text",
      placeholder: "GT 560 AB0252",
    },
  ],
  fieldDetailThree: [
    {
      name: "profession",
      label: "Profession",
      type: "text",
      placeholder: "",
    },
    {
      name: "experience",
      label: "Experience",
      type: "select",
      placeholder: "Beginners",
      options: ["Beginner", "Intermediate", "Expert"],
    },

    {
      name: "skills_id",
      label: "Skills",
      type: "text",
      placeholder: "Select Skill",
    },

    // Upload your cv here
  ],

  fieldDetailFour: [
    {
      name: "bio",
      label: "",
      type: "text",
      rows: 7,
      placeholder: "",
    },
  ],
};

export const START_CLIENT_PROFILE_FIELD = {
  fieldDetailOne: [
    {
      name: "company-name",
      label: "Company Name",
      type: "text",
      placeholder: "Eg Yeshub",
    },
    {
      name: "website",
      label: "Website",
      type: "text",
      placeholder: "www.yeshub.com",
    },
  ],
  fieldDetailTwo: {
    name: "job-title",
    label: "Write a title for your Job post",
    type: "text",
    placeholder: "Eg Graphic design needed",
  },
  fieldDetailThree: {
    name: "skills",
    label: "Search skills or add your own",
    type: "text",
    placeholder: "",
  },
  fieldDetailFour: [
    {
      name: "hourly_rate_start",
      label: "Per/Hour (GH)",
      type: "number",
      placeholder: "50.00",
    },
    {
      name: "hourly_rate_end",
      label: "End (GH)",
      type: "number",
      placeholder: "200.00",
    },

    {
      name: "fixed_rate",
      label: "Fixed Rate (GH)",
      type: "number",
      placeholder: "2000.00",
    },
    {
      name: "bio",
      label: "Describe what you need",
      type: "text",
      rows: 7,
      placeholder: "",
    },
  ],

};
