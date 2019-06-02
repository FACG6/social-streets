import moment from "moment";
const eventTypeValues = [
  {
    key: 1,
    value: "Events and Festivals"
  },
  {
    key: 2,
    value: "Nightlife"
  },
  {
    key: 3,
    value: "Exhibitions"
  },
  {
    key: 4,
    value: "Courses and workshops"
  },
  {
    key: 5,
    value: "Walks and talks"
  }
];
const eventTopicValues = [
  {
    key: 1,
    value: "Family and Children"
  },
  {
    key: 2,
    value: "Food and Drink"
  },
  {
    key: 3,
    value: "Arts"
  },
  {
    key: 4,
    value: "Heritage and Culture"
  },
  {
    key: 5,
    value: "Sport and Hobbies"
  },
  {
    key: 6,
    value: "Community Development"
  }
];
const primaryTag = [
  {
    key: 1,
    value: "Consultations"
  },
  {
    key: 2,
    value: "Petitions"
  },
  {
    key: 3,
    value: "Surveys"
  },
  {
    key: 4,
    value: "Volunteering"
  },
  {
    key: 5,
    value: "Research"
  }
];
const secondaryTag = [
  {
    key: 1,
    value: "Health"
  },
  {
    key: 2,
    value: "Safety"
  },
  {
    key: 3,
    value: "Planning"
  },
  {
    key: 4,
    value: "Education"
  }
];

const event = {
  title: "Event Title",
  eventType: "Events and Festivals",
  eventTopic: ["Food and Drink", "Arts"],
  description: "Description",
  dateAndTime: moment(
    new Date("Sat Jun 01 2019 15:34:31 GMT+0300 (Eastern European Summer Time)")
  ),
  cost: 120,
  image: undefined,
  altText: "Event Title",
  website: "socialstreets.com",
  focusKeyword: "Focus Keyword",
  metaDescription: "Meta Description"
};

const publicService = {
  title: "Public Services Title",
  primaryTag: "Petitions",
  secondaryTag: ["Safety", "Health"],
  description: "Description",
  image: undefined,
  altText: "Event Title",
  focusKeyword: "Focus Keyword",
  metaDescription: "Meta Description"
};

export {
  eventTypeValues,
  eventTopicValues,
  primaryTag,
  secondaryTag,
  event,
  publicService
};
