const Data = [
    {
        "id":"1",
        "pic":"/picture1.jpg",
      "man_in_charge": "John Doe",
      "header": "Banner Design Update",
      "content": "Update the customer page layout for the website.",
      "deadline": "March 05, 2022",
      "status": "In Progress",
      "category": "Design",
      "assignee": "Alice Smith",
      "milestone": "Website Redesign",
      "issue_type": "Task"
    },
    {
        "id":"2",
        "pic":'',
      "man_in_charge": "Jane Smith",
      "header": "SEO Optimization",
      "content": "Optimize the website's SEO for better search rankings.",
      "deadline": "April 10, 2022",
      "status": "Not Started",
      "category": "Marketing",
      "assignee": "Robert Johnson",
      "milestone": "Digital Marketing Campaign",
      "issue_type": "Task"
    },
    {
        "id":"3",
        "pic":'',
      "man_in_charge": "Michael Brown",
      "header": "Bug Fixing",
      "content": "Fix critical bugs reported by users.",
      "deadline": "February 20, 2022",
      "status": "Completed",
      "category": "Development",
      "assignee": "David Wilson",
      "milestone": "Bug Fixes",
      "issue_type": "Bug"
    },
    {
        "id":"4",
        "pic":'',
      "man_in_charge": "Emily Davis",
      "header": "Content Writing",
      "content": "Create engaging content for the blog posts.",
      "deadline": "March 15, 2022",
      "status": "In Progress",
      "category": "Content",
      "assignee": "Olivia Anderson",
      "milestone": "Content Strategy",
      "issue_type": "Task"
    },
    {
        "id":"5",
        "pic":'',
      "man_in_charge": "William Lee",
      "header": "Security Audit",
      "content": "Conduct a security audit of the website.",
      "deadline": "April 30, 2022",
      "status": "Not Started",
      "category": "Security",
      "assignee": "Sophia White",
      "milestone": "Security Enhancement",
      "issue_type": "Task"
    },
    {"id":"6",
    "pic":'',
      "man_in_charge": "Daniel Harris",
      "header": "Mobile App Development",
      "content": "Develop a mobile app for the company.",
      "deadline": "May 20, 2022",
      "status": "In Progress",
      "category": "Development",
      "assignee": "Ava Martinez",
      "milestone": "Mobile App Launch",
      "issue_type": "Feature"
    },
    {
        "id":"7",
        "pic":'',
      "man_in_charge": "Sophia Johnson",
      "header": "Customer Support Training",
      "content": "Provide training to the customer support team.",
      "deadline": "March 31, 2022",
      "status": "Not Started",
      "category": "Training",
      "assignee": "Lucas Brown",
      "milestone": "Training Program",
      "issue_type": "Task"
    },
    {
        "id":"8",
        "pic":'',
      "man_in_charge": "Ethan Martinez",
      "header": "Graphic Design for Campaign",
      "content": "Design graphics for the upcoming marketing campaign.",
      "deadline": "April 15, 2022",
      "status": "Not Started",
      "category": "Design",
      "assignee": "Chloe Adams",
      "milestone": "Marketing Campaign",
      "issue_type": "Task"
    },
    {
        "id":"9",
        "pic":'',
      "man_in_charge": "Olivia Anderson",
      "header": "Database Migration",
      "content": "Migrate the database to a new server for improved performance.",
      "deadline": "March 25, 2022",
      "status": "In Progress",
      "category": "Database ",
      "assignee": "Mia Davis",
      "milestone": "Database Upgrade",
      "issue_type": "Task"
    },
    {
        "id":"10",
        "pic":'',
      "man_in_charge": "David Wilson",
      "header": "User Interface Enhancement",
      "content": "Enhance the user interface for better user experience.",
      "deadline": "May 10, 2022",
      "status": "Not Started",
      "category": "Development ",
      "assignee": "Ella Smith",
      "milestone": "UI/UX Improvements ",
      "issue_type": "Enhancement"
    },
    {
      id: "11",
      pic: '/new-picture1.jpg',
      man_in_charge: "John Newman",
      header: "New Project Management",
      content: "Manage a new project for the company.",
      deadline: "June 30, 2023",
      status: "In Progress",
      category: "Project Management",
      assignee: "Alice Johnson",
      milestone: "Project Kickoff",
      issue_type: "Project",
    },
    {
      id: "12",
      pic: '/new-picture2.jpg',
      man_in_charge: "Jane Richards",
      header: "Marketing Campaign",
      content: "Plan and execute a new marketing campaign.",
      deadline: "July 15, 2023",
      status: "Not Started",
      category: "Marketing",
      assignee: "Robert Davis",
      milestone: "Marketing Campaign Launch",
      issue_type: "Campaign",
    },
    {
      id: "13",
      pic: '/new-picture3.jpg',
      man_in_charge: "Michael Johnson",
      header: "App Development",
      content: "Develop a new mobile app for the company.",
      deadline: "August 20, 2023",
      status: "Not Started",
      category: "Development",
      assignee: "David Wilson",
      milestone: "App Development",
      issue_type: "Feature",
    },
    {
      id: "14",
      pic: '/new-picture4.jpg',
      man_in_charge: "Emily Anderson",
      header: "Content Strategy",
      content: "Develop a new content strategy for the blog.",
      deadline: "September 10, 2023",
      status: "In Progress",
      category: "Content",
      assignee: "Olivia Brown",
      milestone: "Content Strategy Update",
      issue_type: "Strategy",
    },
    {
      id: "15",
      pic: '/new-picture5.jpg',
      man_in_charge: "William Davis",
      header: "Security Audit",
      content: "Conduct a new security audit of the website.",
      deadline: "October 25, 2023",
      status: "Not Started",
      category: "Security",
      assignee: "Sophia Lee",
      milestone: "Security Enhancement",
      issue_type: "Security",
    },
    {
      id: "16",
      pic: '/new-picture6.jpg',
      man_in_charge: "Daniel Martin",
      header: "Customer Support Training",
      content: "Provide training to the customer support team.",
      deadline: "November 10, 2023",
      status: "Not Started",
      category: "Training",
      assignee: "Lucas White",
      milestone: "Training Program",
      issue_type: "Training",
    },
    {
      id: "17",
      pic: '/new-picture7.jpg',
      man_in_charge: "Sophia Jackson",
      header: "Graphic Design for Campaign",
      content: "Design graphics for the upcoming marketing campaign.",
      deadline: "December 5, 2023",
      status: "In Progress",
      category: "Design",
      assignee: "Ethan Martinez",
      milestone: "Campaign Design",
      issue_type: "Design",
    },
    {
      id: "18",
      pic: '/new-picture8.jpg',
      man_in_charge: "Ethan Wilson",
      header: "Database Migration",
      content: "Migrate the database to a new server for improved performance.",
      deadline: "January 20, 2024",
      status: "Completed",
      category: "Database",
      assignee: "Mia Smith",
      milestone: "Database Migration",
      issue_type: "Migration",
    },
    {
      id: "19",
      pic: '/new-picture9.jpg',
      man_in_charge: "Olivia Martin",
      header: "User Interface Enhancement",
      content: "Enhance the user interface for better user experience.",
      deadline: "February 5, 2024",
      status: "Close",
      category: "Development",
      assignee: "Ella Anderson",
      milestone: "UI/UX Enhancement",
      issue_type: "UI/UX",
    },
    {
      id: "20",
      pic: '/new-picture10.jpg',
      man_in_charge: "David White",
      header: "Quality Assurance Testing",
      content: "Perform quality assurance testing for a new software release.",
      deadline: "March 15, 2024",
      status: "Not Started",
      category: "Quality Assurance",
      assignee: "Chloe Davis",
      milestone: "Testing Phase",
      issue_type: "Testing",
    }
  ]
  
  export default Data