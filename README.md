# 🌊 Smart Water Management System

🚀 **A full-stack web application** for managing water service issues, enabling **role-based access** for admins, customers, and workers.

---

## 📌 Tech Stack  
| **Category**  | **Technology Used**  |
|--------------|----------------------|
| **Frontend**  | React.js, Redux, Bootstrap  |
| **Backend**   | Spring Boot, Spring Security, JWT  |
| **Database**  | MySQL, JPA/Hibernate  |
| **Tools & Deployment** | Git, Postman, Swagger  |

---

## 📂 Project Structure  
SmartWaterManagementSystem/ ├── frontend/ # React.js (Client) │ ├── src/ │ ├── public/ │ └── package.json ├── backend/ # Spring Boot (Server) │ ├── src/main/java/com/app/ │ ├── src/main/resources/ │ └── pom.xml └── README.md


---

## 🌟 Features  
✅ **JWT Authentication & Role-Based Access** (Admin, Customer, Worker)  
✅ **Admin Panel:** Assign workers, track complaints & payments  
✅ **Customer Panel:** Raise issues, check status, make payments  
✅ **Worker Panel:** View assigned complaints & update resolution status  
✅ **RESTful APIs** with CRUD Operations  
✅ **Swagger API Documentation**

---

## 🚀 Installation Guide

### **1️⃣ Clone the Repository**
git clone https://github.com/UtkarshNigam2401/Aquatrack.git
cd Aquatrack

2️⃣ Backend Setup (Spring Boot)
cd backend
mvn clean install  # Install dependencies
Edit backend/src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/smart_water_db
spring.datasource.username=root
spring.datasource.password=yourpassword
Run the backend server:
mvn spring-boot:run
Backend will be live at: http://localhost:8080

3️⃣ Frontend Setup (React.js)
cd frontend
npm install  # Install dependencies
Edit .env file inside frontend folder:
REACT_APP_BACKEND_URL=http://localhost:8080
Run the frontend server:
npm start
Frontend will be live at: http://localhost:3000

📬 Contact
📧 **Email: utkarsh02n@gmail.com**
🐙 **GitHub: UtkarshNigam2401**
🔗 **LinkedIn: https://www.linkedin.com/in/utkarsh-nigam-175003222**




