# TalentFlow

TalentFlow is an intelligent, modern, and professional SaaS dashboard designed to streamline the HR hiring process. It helps recruitment teams find, interview, and hire the best talent more efficiently.

## Core Features:

- **Secure Access**: User authentication and role management.
- **Candidate Profiles**: Create and manage candidate profiles, storing information like contact details, resumes, and qualifications.
- **Interview Scheduling**: Schedule interviews and track their progress. Update interview statuses.
- **Panelist Assignment**: Assign panelists to interview sessions and notify them of their responsibilities.
- **AI-Powered Skill Identification**: An AI tool to identify common skills required across roles and assist in generating interview questions.

## Tech Stack

- **Framework**: Next.js (with App Router)
- **Language**: TypeScript
- **UI**: React, ShadCN UI, Tailwind CSS
- **AI Integration**: Google Genkit

---

## Installation

You can run TalentFlow either locally using Node.js or with Docker.

### Local Installation

**Prerequisites:**
- Node.js (v18 or later)
- npm

**Steps:**

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd talentflow
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add any necessary environment variables (e.g., API keys for Genkit).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at [http://localhost:9002](http://localhost:9002).

---

### Docker Installation

**Prerequisites:**
- Docker
- Docker Compose

**Steps:**

1.  **Clone the repository** (if you haven't already).

2.  **Build and run the container:**
    From the root directory of the project, run the following command:
    ```bash
    docker-compose up --build
    ```
    This command will build the Docker image and start the container.

3.  **Access the application:**
    The application will be available at [http://localhost:3000](http://localhost:3000).

To stop the application, press `Ctrl + C` in the terminal and then run:
```bash
docker-compose down
```

---

## Code Contribution

We welcome contributions to TalentFlow! If you'd like to contribute, please follow these guidelines:

1.  **Fork the Repository**: Create your own fork of the repository to work on.

2.  **Create a Branch**: For any new feature or bug fix, create a new branch from `main`:
    ```bash
    git checkout -b feature/your-feature-name
    ```

3.  **Commit Your Changes**: Make your changes and commit them with clear, descriptive messages.

4.  **Follow Coding Standards**:
    - Adhere to the existing code style and conventions.
    - Ensure your code is clean, readable, and well-commented where necessary.
    - Use the provided UI components from ShadCN where possible to maintain consistency.

5.  **Submit a Pull Request**: Push your branch to your fork and open a Pull Request to the original repository's `main` branch. Provide a detailed description of the changes you've made.
