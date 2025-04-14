# 🧱 CAD Block Viewer

A web application that allows users to upload and view block data from DXF files.

- **Frontend:** React + Vanilla CSS  
- **Backend:** Node.js, Express.js, PostgreSQL  
- **DXF Parser:** [dxf-parser](https://www.npmjs.com/package/dxf-parser)

---

## 🌐 Live Demo
> Coming Soon...

---

## 📂 Repositories

| Layer    | Link                                      |
|----------|-------------------------------------------|
| Frontend | [https://github.com/babludangi6266/frontend.git](https://github.com/babludangi6266/frontend.git) |
| Backend  | [https://github.com/babludangi6266/cad-block-viewer.git](https://github.com/babludangi6266/cad-block-viewer.git)   |

---

## ✨ Features

- Upload DXF files and extract block information
- View list of extracted blocks with pagination
- Search/filter blocks by block name
- View detailed properties of selected blocks
- Responsive and modern UI

---

## 🧰 Tech Stack

### Backend
- **Node.js (v18+)**
- **Express.js** – Web server framework
- **PostgreSQL** – Relational database
- **Sequelize** – ORM with strong PostgreSQL support
- **dxf-parser** – DXF file parsing library

### Frontend
- **React** – Frontend library
- **Axios** – HTTP client
- **Vanilla CSS** – Custom styling without frameworks

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js (v18+)
- PostgreSQL (v12+)
- Git

---

## 💾 Installation

### 1. Clone Both Repositories

```bash
# Backend
git clone https://github.com/babludangi6266/cad-block-viewer.git
cd cad-viewer-backend
npm install
cp .env.example .env
# Add your PostgreSQL credentials to the .env file
```

```bash
# Frontend
git clone https://github.com/babludangi6266/frontend.git
cd cad-viewer-frontend
npm install
```

---

### 2. Set Up the Database

```bash
createdb cad_blocks
psql -d cad_blocks -f backend/db/schema.sql
```

---

### 3. Run the Application

#### Start Backend Server
```bash
cd cad-viewer-backend
npm run dev
```

#### Start Frontend Server
```bash
cd cad-viewer-frontend
npm start
```

App will be running at: [http://localhost:3000](http://localhost:3000)

---

## 📡 API Documentation

### 📁 Files

- **POST** `/api/upload` – Upload DXF file  
  **Body:** Multipart FormData  
  **Returns:** `{ message, fileId, blockCount }`

- **GET** `/api/files` – Get all uploaded files  
  **Returns:** `[ { id, filename, originalname, upload_date, ... } ]`

---

### 🧱 Blocks

- **GET** `/api/files/:fileId/blocks` – Get blocks of a file  
  **Query:** `page`, `limit`, `search`  
  **Returns:** Paginated block list with metadata

- **GET** `/api/blocks/:blockId` – Get a single block's details  
  **Returns:** `{ id, name, type, layer, coordinates, properties }`

---

## 🗃️ Database Schema

### 📄 Files Table

```sql
CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  originalname VARCHAR(255) NOT NULL,
  filepath VARCHAR(255) NOT NULL,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🧹 Blocks Table

```sql
CREATE TABLE blocks (
  id SERIAL PRIMARY KEY,
  file_id INTEGER REFERENCES files(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  layer VARCHAR(255),
  type VARCHAR(100),
  x_coordinate FLOAT,
  y_coordinate FLOAT,
  z_coordinate FLOAT,
  properties JSONB
);
```

---

## 📚 Library Choices

### Sequelize
- Excellent PostgreSQL support
- Promise-based async operations
- Validation, associations & migrations

### dxf-parser
- Pure JavaScript implementation
- Well-documented and actively maintained
- Simple API for extracting block info

---

## 🧠 Challenges & Solutions

| Challenge                         | Solution                                                                 |
|----------------------------------|--------------------------------------------------------------------------|
| DXF parsing complexity           | Focused on extracting only necessary block entities                      |
| Relational vs. JSON structure    | Used hybrid approach: columns for key fields, JSONB for additional props |
| File upload and cleanup          | Implemented temp file handling and cleanup after parsing                 |

---

## 🤖 AI Tool Usage

- **Project Bootstrap:** Used AI to generate Express boilerplate, React structure, Sequelize setup
- **Debugging:** Assisted in resolving DXF parsing issues and PostgreSQL connectivity
- **Schema Design:** Helped evaluate JSON vs relational strategies
