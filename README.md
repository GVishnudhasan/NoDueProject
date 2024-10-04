<br/>
<p align="center">
  <h3 align="center">Automated No Due Certificate Request System</h3>

  <p align="center">
    An Awesome Web Application to make the process of getting No Due Signs from your mobile phone.
    <br/>
    <br/>
    <a href="https://github.com/GVishnudhasan/NoDueProject/issues">Report Bug</a>
    .
    <a href="https://github.com/GVishnudhasan/NoDueProject/issues">Request Feature</a>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/GVishnudhasan/NoDueProject/total) ![Contributors](https://img.shields.io/github/contributors/GVishnudhasan/NoDueProject?color=dark-green) ![Stargazers](https://img.shields.io/github/stars/GVishnudhasan/NoDueProject?style=social) ![Issues](https://img.shields.io/github/issues/GVishnudhasan/NoDueProject) ![License](https://img.shields.io/github/license/GVishnudhasan/NoDueProject) 


<h1>Project Overview</h1>

This project is a web application that automates the process of requesting and approving no-due certificates for students at the end of each semester. 

**Features**

* **User Roles:** The system supports different user roles: Students and Faculty Members. Each role has specific privileges.
* **Student Dashboard:** Students can view a list of their subjects, handling faculty, and request no-due certificates for each subject.
* **Faculty Review:** Faculty members can review student requests, approve or reject, and view all pending requests they are responsible for.
* **Approval Workflow:** Once all faculty members approve a request, it gets sent to the Head of Department (HoD) for final approval.
* **Digital Signature:** The HoD can provide a digital signature for approved certificates.
* **Seamless Access:** Students can track the approval status and write exams upon final approval.

**Project Demo**

* Watch the project demo on YouTube: [Link to Demo Video](https://www.youtube.com/watch?v=EFDIiGfouYo)

**Technology Stack**

* Developed using the MEAN stack: MongoDB (Database), Express.js (Backend Framework), AngularJS (Frontend Framework), Node.js (Server-side JavaScript)


### Getting Started

This section will guide you on setting up the project locally and running both the client and server sides.

#### **Prerequisites**

Before you begin, ensure you have the following installed on your system:

- **Node.js and npm** (Node Package Manager): You can download them from [Node.js Official Website](https://nodejs.org/en/).
- **MongoDB**: Ensure that MongoDB is installed and running locally. You can download it from [MongoDB Official Website](https://www.mongodb.com/try/download/community).
- **Angular CLI**: The Angular Command Line Interface is required to run the frontend. Install it globally using npm:

  ```bash
  npm install -g @angular/cli
  ```

<h2>Installation</h2>

1. **Clone the project repository**:

   ```bash
   git clone https://github.com/GVishnudhasan/NoDueProject.git
   ```

2. **Install dependencies for the server**:

   Navigate to the project directory and install the required Node.js packages.

   ```bash
   cd NoDueProject
   npm install
   ```

3. **Install dependencies for the client**:

   The client-side (Angular) code is located in the `/client` folder. You’ll need to install the required packages for Angular.

   ```bash
   cd client
   npm install
   ```

<h2>Running the Application</h2>

Once the dependencies are installed, you can start both the client and server.

1. **Start the server (Node.js and Express.js)**:

   In the root directory of the project, start the server using the following command:

   ```bash
   npm start   # OR  nodemon index.js
   ```

   The server should now be running at `http://localhost:3000`.

2. **Start the client (Angular)**:

   Open another terminal, navigate to the `/client` folder, and start the Angular development server:

   ```bash
   cd client
   ng serve
   ```

   By default, Angular runs on port `4200`. You can access the client application in your web browser:

   ```bash
   http://localhost:4200
   ```

#### **Database Setup**

Make sure MongoDB is running on your system. By default, it will run on `mongodb://localhost:27017`. If your MongoDB is hosted at a different address, update the MongoDB connection string in the `config` file (typically located in `config/database.js` or `index.js`).

<h1>Using the Application</h1>

1. Register as a student or faculty member.
2. Login with your credentials.

**Student Functionality:**

* View subject list and handling faculty.
* Request no-due certificates for specific subjects.
* Track the approval status of requests.

**Faculty Functionality:**

* Review pending no-due requests from students they handle.
* Approve or reject requests with detailed information.

**Approval Workflow:**

* After faculty approval, the request gets sent to the HoD for final approval.
* Upon HoD approval (digital signature), students are eligible to write exams.

<h1>Contributing</h1>

We welcome contributions to improve the project!

* **Open Issues:** Check the list of open issues for proposed features and known bugs.
* **Contributing Steps:**
    * Fork the repository.
    * Create a new branch for your changes.
    * Implement your changes and test them thoroughly.
    * Commit and push your changes to your forked repository.
    * Create a pull request with a clear explanation of your changes and why they should be merged.
* **Code of Conduct:** Please ensure your code adheres to the project's [code of conduct](https://github.com/GVishnudhasan/NoDueProject/blob/main/CODE_OF_CONDUCT.md)
* **Pull Request Guidelines:**
    * Create a separate pull request for each suggestion.
    * Ensure clear descriptions of your changes.
    * Proofread your code and documentation before submitting.

<h3>License</h3>

Distributed under the MIT License. See [LICENSE](https://github.com/GVishnudhasan/NoDueProject/blob/main/LICENSE.md) for more information.

<h3>Credits</h3>

Developed by G Vishnudhasan, A Ragul, D Geethapriya, and K Nandhini, students of Computer Science and Engineering at KSR Institute For Engineering and Technology.
