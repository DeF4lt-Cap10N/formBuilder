# FormBuilder: Custom Form Editor

This project is a custom form builder application developed as part of the GitHub Task (First Round). It provides a user-friendly interface for creating and managing custom forms with unique question types, powered by a full-stack MERN architecture.

## Task Summary

The goal of this assignment was to build a custom form builder application that allows users to create forms, collect responses, and save all data to a MongoDB database. The application features a dedicated UI for editing and a separate link for filling out the forms.

### Deliverables

* **Custom Form Editor UI:** A responsive user interface for building forms using a form editor.

* **Live Preview / Fill Link:** A public-facing link for users to fill in the form and submit their responses.

* **Backend for Data Persistence:** An API to handle form creation, updates, and response submission.

* **MongoDB Integration:** All form definitions and user responses are saved to MongoDB with clearly defined schemas.

## Technology Stack

This project is built using the **MERN Stack** (MongoDB, Express.js, React, Node.js) to provide a complete full-stack solution.

* **Frontend:** React.js

* **Styling:** Tailwind CSS for a utility-first and responsive design.

* **Backend:** Node.js with Express.js

* **Database:** MongoDB

## Unique Question Types

The form builder includes three unique and custom question types as per the assignment requirements:

* **Categorize:** A question type where users must sort given items into predefined categories.

* **Cloze:** A question type where users fill in the blanks within a provided text block.

* **Comprehension:** A question type that presents a passage of text followed by one or more questions related to its content.

### Additional Features

* **Image Support:** The editor allows for adding a header image to the top of the entire form and an individual image for each question.

## Getting Started

### Prerequisites

* Node.js (version 14 or higher)

* npm or Yarn

* MongoDB Atlas or a local MongoDB instance

### Installation

1. **Clone the repository:**

   ```
   git clone [https://github.com/your-username/formbuilder.git](https://github.com/your-username/formbuilder.git)
   cd formbuilder
   
   ```

2. **Install dependencies for the backend and frontend:**

   ```
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   
   ```

3. **Configure environment variables:**
   Create a `.env` file in the `backend` directory with the following variables:

   ```
   MONGO_URI="your_mongodb_connection_string"
   PORT=5000
   
   ```

4. **Start the development servers:**

   ```
   # From the backend directory
   npm start
   
   # From the frontend directory
   npm start
   
   ```

The frontend application will be available at `http://localhost:3000` and the backend API will be running at `http://localhost:5000`.


## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
