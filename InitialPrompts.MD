Prompt 1: User requirements, simple to extended
I want to develop a demo web app that I will use in my company to track the innovation initiatives' life cycle. Below are my instructions.

GENERAL APPROACH
A) I want to approach the development phase by phase with you help, as follow:
#1 Business requirements refinement: See below. They are from me (since it's a demo app), you will need to help me refine them. They are focused on business needs ONLY. This phase is about translating my requirements into more detailed requirements.
#2 Translation of requirements to user stories
#3 Requirements to Solution Architecture / Technical approach
#4 Planning of the development approach
#5 Development by step (first infrastructure, then features by feature, etc.). Important note: key technical dev approach should come later, however keep in mind that I would like to use Claude agents to demo how these work during the development.
B) For every step, I want you to be my advisor, guide me on the steps you think would be best. Consider that I don't know much about tech so I want you to advise on the right choices and explain.

CURRENT PHASE, WHAT I WANT FROM YOU
a) Ask me questions to refine my requirements (that are below)
b) Add more requirements that you think would be valid for that application
c) Expand/detail requirements
d) Create context files that you and I can use going forward
e) Create a new project in my git repository, which name will be Innovation-LifeCycle-Manager, and start storing all the files there
f) Stop once this phase is done, only propose to go to the next phase, don't do more

BUSINESS REQUIREMENTS
a) The main screen should look like a Kanban board (or equivalent) with initiatives progressing in different maturity levels from left to right.
b) Inputting a new idea, tracking it all the way and making work visible is the key objective for that product.
c) An idea can be created by anyone in the company, input in the application with fields that matter -- I want you to define what are the fields that are required.
d) The idea will progress from one stage to another, for example it will be first an idea, then it will become a POV, a prototype, POC, MVP, product, etc. I want you to come up with this stages and refine the proper progression
e) An initiative can have multiple statuses, for example ongoing, on hold, cancelled, rolled-out, etc. Refine this.
f) A smart search function has also to be developed. It should search any information with wild cards.
g) An AI should be also attached to the tool as a helper to the users. For example, it should be able to suggest improvements in an idea proposed based on all the internal projects already existing and stored in the tool, or suggest that a proposal is already existing and shouldn't be duplicated, etc.

Prompt 2: User requirements to user stories
Based on the refined requirements and the context file we just created, let's generate the user stories for the application. I want you to proceed as follow:
1.	Define User Roles: First, clearly define the primary user roles for this application (e.g., Standard Employee, Innovation Manager/Admin, Stakeholder/Viewer).
2.	Generate Epics: Group the requirements into larger Epics (e.g., 'Epic: Idea Submission', 'Epic: Kanban Board & Visualization', 'Epic: Initiative Management', 'Epic: User Authentication').
3.	Create User Stories: For each epic, generate a list of detailed user stories. Each story must follow the format: As a [user role], I want [action/feature], so that [value/benefit].
4.	Define Acceptance Criteria: For each user story, provide a concise list of Acceptance Criteria (ACs) that must be met for the story to be considered "done".
5.	Save to Git: Save this complete list as a new file named USER_STORIES.md in our Innovation-LifeCycle-Manager git repository.
Important note: This is a demo, so the number of Epics and User Stories should be limited to few only, and if not prioritized so that we can get something working in few hours.

Prompt 3: Architecture Design
Now that we have the detailed user stories, let's define the high-level technical architecture.
1.	Technology Stack: I want you to use the following
o	Front-end: React
o	Back-end: Node.js (or related)
o	Database: Suggest the simplest one possible to install in an environment where we don't have admin right. It should also be able to handle all use case. Note: I don't know whether the AI part needs special DB setup, need your recommendation too.
2.	Solution Architecture: Describe the high-level system components.
o	Explain the main services (e.g., Client App, API Gateway, Backend Service, Database, Authentication Provider).
o	Describe how they interact. A simple text-based diagram or Mermaid-ready code would be excellent.
3.	Infrastructure & Deployment: We don't need any deployment at this stage, we'd execute the demo locally for the moment
4.	Save to Git: Save this complete architecture breakdown as ARCHITECTURE.md in the git repository.

Prompt 4: Dev, Project Scaffolding
It's time to build. Let's follow the ARCHITECTURE.md.

THINGS TO DO FOR EVERY STEP OF THE DEVELOPMENT GOING FORWARD
#1 Write the code, including inline documentation, and unit tests
#2 Make me test
#3 Commit to git once I agree that what was developed works

DETAILS FOR PROJECT SCAFFOLDING -- This step
a) Database: 
* Help install the DB components
* Provide the SQL to create the schema and the initial tables/collections.
* Insert some mock data to simulate few innovation initiatives.
* Insertion scrips should be written in a way that we can rerun them from scratch if anything wrong.
b) Back-end (Server): Provide the boilerplate code, propose before doing.
c) Front-end (Client): Initialize a basic app

