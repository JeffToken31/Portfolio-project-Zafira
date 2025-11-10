# 💫 ZAFIRA SOLIDAIRE – MVP DEVELOPMENT AND EXECUTION

## 🗂️Summary
* [🗓️1. Planning and Sprint Definition](#️1-planning-and-sprint-definition)  
[🧠Sprint 1](#-sprint-1--backend-setup-and-authentication-2-weeks)  
[💻Sprint 2](#sprint-2--frontend-setup-and-authentication-integration-1-week)  
[📊Sprint 3](#sprint-3--statistics-module-integration-and-uiux-enhancements-1-week)  

* [🧩2. Feature Details](#2-feature-details)  
[🔐Authentication & Account Management](#authentication--account-management)  
[👨‍💼Administrator Dashboard](#administrator-dashboard)  
[💬Beneficiary Testimonials](#beneficiary-testimonials)  
[📈Statistics Module](#statistics-module)  
[🌐SEO & SSR](#seo--ssr)  

* [📆3. Progress Tracking and Adjustments](#3-progress-tracking-and-adjustments)  
[🔧Key Organizational Practices](#key-organizational-practices)  
[🧭Example Git Flow](#example-git-flow)  

* [🧪4. Testing Strategy and Quality Assurance](#4-testing-strategy-and-quality-assurance)  
[✅Tools Used](#tools-used)  
[🧾Example E2E Test](#example-e2e-test)  

* [🚀5. Final Integration and QA Summary](#5-final-integration-and-qa-summary)  
[✔️Key Achievements](#️key-achievements)   
[🐞Example Bug Fix](#example-bug-fix-prisma-migration-error)  

* [🧩Conclusion](#conclusion)
<br>
<br>

## 🗓️1. Planning and Sprint Definition
The project was organized using the **Agile Scrum methodology**, divided into **three main sprints**, with:
- **Daily stand-up meetings**
- **Continuous progress tracking**
- A strict **Git Flow workflow** (modules, issues, branches, pull requests) ensuring clean collaboration and traceability.
<br>

### 🧠Sprint 1 – Backend Setup and Authentication (2 weeks)

#### 🎯 Objectives
- Initialize the backend architecture using the **Domain Driven Design (DDD)** pattern.
- Implement **authentication** and **core API modules**.
- Set up the **testing framework** and **API documentation**.
- Organize **teamwork** and initial **project setup**.

#### 📦 Deliverables
- **NestJS** backend configured with a modular structure.
- Authentication: **Local signup + Google login**.
- **Email verification** using **SendGrid**.
- API documentation with **Swagger**.
- **Postman collection** for manual testing.
- Initial **unit and E2E tests** with **Jest**.

#### 📝 Notes
- The first two days were dedicated to **documentation**, **project structure**, and **convention setup**.
- Collaborative “pair programming” sessions helped unify backend logic and naming standards.

### 💻Sprint 2 – Frontend Setup and Authentication Integration (1 week)

#### 🎯 Objectives
- Initialize **Next.js 15** frontend with a clean **hexagonal architecture**.
- Integrate authentication with backend endpoints.
- Design and test **user journeys** locally.
- Implement **Server-Side Rendering (SSR)** for better SEO performance.

#### 📦 Deliverables
- Frontend structure configured.
- Auth integration with backend endpoints.
- Dynamic routes  optimized for SEO (`/blog/[slug]`).
- UI components for **login** and **register** pages.
- Local user journey testing validated.

### 📊Sprint 3 – Statistics Module, Integration, and UI/UX Enhancements (1 week)

#### 🎯 Objectives
- Add a **statistics module** to the backend and integrate it into the **admin dashboard**.
- Improve overall **UI/UX consistency**.
- Finalize the **admin dashboard** and **testimonial validation process**.

#### 📦 Deliverables
- Statistics module: user data collection and visualization.
- Admin dashboard: user and testimonial management, content visibility, SEO control.
- Beneficiary testimonials module with admin validation.
- Responsive and accessible UI/UX improvements.
<br>
<br>

## 🧩2. Feature Details

### 🔐Authentication & Account Management
- Google login and local registration.
- Email verification via SendGrid.
- Password recovery and profile editing.
- Secure **JWT + refresh token** management.

### 👨‍💼Administrator Dashboard
- Manage users and testimonials.
- Real-time statistics visualization.
- Validate or delete beneficiary testimonials.
- SEO slug and content visibility management.

### 💬Beneficiary Testimonials
- Submission forms for verified users.
- Admin validation before publication.
- Integration with the **blog/news section** to promote community engagement.

### 📈Statistics Module
- Backend module for performance and analytics metrics.
- Integration into the admin dashboard.
- Secure API endpoints for data retrieval.

### 🌐SEO & SSR
- Dynamic page generation via **Next.js SSR**.
- Unique slugs for each article or testimonial.
- Enhanced SEO performance and faster rendering.
<br>
<br>

## 📆3. Progress Tracking and Adjustments

As a team project, progress was tracked collaboratively through **daily meetings** and **continuous iteration**.

### 🔧Key Organizational Practices
- **Daily stand-ups** to plan, adjust, and unblock issues.
- **Strict Git Flow discipline**: each feature or fix had its own branch, issue, and pull request.
- **Collaborative coding sessions** in Sprint 1 for backend synchronization.
- **Continuous refactoring** and backend–frontend alignment.

### 🧭Example Git Flow
![Example of an Issue](https://raw.githubusercontent.com/JeffToken31/Portfolio-project-Zafira/dev/app/frontend/public/GitFlow%20example.png)

Each merge into the main branch was followed by:
- Manual testing with **Postman**
- API validation with **Swagger**
- QA verification
<br>
<br>

## 🧪4. Testing Strategy and Quality Assurance

The team applied a **multi-layered testing approach** combining unit, integration, and end-to-end tests.

### ✅Tools Used
- **Swagger** → API documentation and endpoint testing  
- **Postman** → Integration and manual requests  
- **Jest** → Backend unit tests and coverage reports  
- **Next Testing Library** → Frontend component tests  
- **Supertest** → End-to-end user flow tests  
- **Manual localhost testing** → Continuous validation  

### 🧾Example E2E Test
```ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
```
<br>

## 🚀5. Final Integration and QA Summary

After all modules were completed, the final sprint focused on integration, testing, and overall user experience.

### ✔️Key Achievements

- Successful integration between backend and frontend.  
- Stable authentication flow across systems.  
- Fully functional admin dashboard and testimonial validation.  
- Enhanced UI/UX responsiveness and clarity.  

- SEO validated through SSR rendering tests.  

### 🐞Example Bug Fix (Prisma Migration Error)
```ts
Error: P3015 Could not find the migration file at migration.sql.

Fix:
rm -rf prisma/migrations/20251024_add_users_table
npx prisma migrate dev --name add_users_table
npx prisma migrate deploy
```
<br>

## 🧩Conclusion

The Zafira Solidaire MVP established a strong foundation for the platform with:  
- A robust hexagonal architecture  
- Secure and reliable authentication  
- A smooth, SEO-optimized frontend experience

Thanks to its scalable and maintainable architecture, the application is fully prepared to support the fast-growing needs of the organization and future feature expansions.