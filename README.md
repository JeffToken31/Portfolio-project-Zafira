# ⭐ Zafira Solidaire

## 1️⃣ Presentation & Brainstorming

🔗 **Project Name**: Zafira Solidaire

- **Objective::**

Provide visibility and simple tools for the Zafira Solidaire association to showcase its actions, attract new members, highlight its funders (town halls, Pôle emploi, institutions), and present professional services.

- **Target Audience:**

Local authorities, potential partners, beneficiaries, donors.

- **Value Proposition:**
A clear showcase of the association with its missions and activities, including calls-to-action for the public and funders.

- **More Details:**

For brainstorming and concept design, see the PDF: [Stage 1 – Brainstorming](htttp...)

## 2️⃣ MVP & Main Features

- **Homepage**

  - Association presentation: mission, objectives, values.

  - Blog: preview of the last 2 articles with link to the full blog.

  - Workshops: preview with link to detailed catalog.

  - About: preview with link to the founder’s professional catalog.

  - Events: institution-funded events, updatable via the dashboard.

  - Key counters: number of beneficiaries, kilograms of collected clothing (managed via dashboard).

  - Funders and donors logos: message “To appear, contact the president”.

- **Administrator Dashboard**
  - Blog and article management.

  - Workshops and events updates.

  - Add/Edit counters.

  - Manage messages for partner and donor logos.

  - Validate beneficiary member accounts.

  - Simple tracking of member logins and interactions.

- **Beneficiary Members Access**
  - Mandatory account creation validated by the administrator.
  - Access to event calendar and key information.
  - Ability to post testimonials.

- **Professional Catalog Access**
  - Link to founder’s personal paid catalog (separate from the association).

- **Donors**
  - No account required.

  - Direct link to Hello Asso for donations.

## 3️⃣ Technologies Used

| Technology            | Purpose / Justification |
| ----------------------| ------------------------- |
| Frontend: Next.js     | Fast, SEO-friendly, reusable components           |
| Backend: Nest.js      | Modular and scalable architecture           |
| Database: PostgreSQL  | Reliable relational database           |
| Versioning: GitHub      | Efficient collaboration and project versioning          |
| Containerization: Docker & Docker Compose      | Ensure identical development & deployment environments          |

## 4️⃣ User Types

- **Administrator:** full access to dashboard, account validation, content management, statistics tracking.

- **Beneficiary Members:** access to information, calendar, ability to post testimonials.

- **Partners / Funders:** no account needed, visibility on showcase and logos via president contact.

- **Donors:** no account required, direct access to donation link.

## 5️⃣ Architecture & Quick Setup

### Folder Structure

``` bash
.
├── README.md
├── app
│   ├── back_end
│   ├── database
│   ├── docker
│   └── front_end
├── stage1
├── stage2
├── stage3
├── stage4
└── stage5
```

### Main Docker Commands

- Start all containers app/docker/:

  `sudo docker-compose up -d`

- Stop and remove all containers, images, and volumes:

  `sudo docker-compose down --rmi all --volumes --remove-orphans`

- Check container status:

  `sudo docker-compose ps`

- Connect to backend container (for tests or commands):

  `sudo docker-compose exec backend sh`

## 6️⃣ Getting Started

1. Clone this repository:

    - `git clone https://github.com/JeffToken31/Portfolio-project-Zafira`

2. Copy environment variables:

    - `cp .env.example .env`

3. Start all containers:

    - `sudo docker-compose up -d`

4. Access:

   - Frontend: <http://localhost:3000>

   - Backend: <http://localhost:3001>

   - Adminer (DB): <http://localhost:8080>

## 🧑‍🏫 Authors

👨‍💻 Ingrind Morniac: <https://github.com/Mornac>

👨‍💻 Jeffrey Basset: <https://github.com/JeffToken31>
