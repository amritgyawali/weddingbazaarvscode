# Wedding Planner Backend

Enterprise-grade Java Spring Boot backend for the Wedding Planner web application with MySQL database, implementing industry best practices and advanced patterns.

## 🏗️ Architecture Overview

### Technology Stack
- **Framework**: Spring Boot 3.2.1
- **Java Version**: 17
- **Database**: MySQL 8.0+
- **Caching**: Redis
- **Search**: Elasticsearch
- **Security**: Spring Security + JWT
- **Documentation**: OpenAPI 3 (Swagger)
- **Build Tool**: Maven
- **Testing**: JUnit 5, TestContainers

### Key Features
- ✅ **JWT Authentication** with refresh tokens
- ✅ **OAuth2 Integration** (Google, Facebook)
- ✅ **Role-based Access Control** (Customer, Vendor, Admin)
- ✅ **Wedding Planning Tool** API
- ✅ **Guest Management** system
- ✅ **Timeline/Task Management**
- ✅ **Vendor Management**
- ✅ **File Upload** with AWS S3
- ✅ **Email Notifications**
- ✅ **Payment Integration** (Stripe)
- ✅ **Comprehensive Auditing**
- ✅ **API Rate Limiting**
- ✅ **Monitoring & Metrics**

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.8+
- MySQL 8.0+
- Redis (optional, for caching)
- Elasticsearch (optional, for search)

### Database Setup
```sql
-- Create database
CREATE DATABASE wedding_planner CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER 'wedding_user'@'localhost' IDENTIFIED BY 'wedding_password';
GRANT ALL PRIVILEGES ON wedding_planner.* TO 'wedding_user'@'localhost';
FLUSH PRIVILEGES;
```

### Environment Variables
```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=wedding_planner
DB_USERNAME=wedding_user
DB_PASSWORD=wedding_password

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=86400000
JWT_REFRESH_EXPIRATION=604800000

# OAuth2
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# AWS
AWS_ACCESS_KEY=your-aws-access-key
AWS_SECRET_KEY=your-aws-secret-key
AWS_S3_BUCKET=wedding-planner-files

# Stripe
STRIPE_PUBLIC_KEY=your-stripe-public-key
STRIPE_SECRET_KEY=your-stripe-secret-key

# Email
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

### Running the Application
```bash
# Clone the repository
git clone <repository-url>
cd wedding-planner-backend

# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run

# Or run with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## 📁 Project Structure

```
wedding-planner-backend/
├── src/main/java/com/weddingplanner/
│   ├── WeddingPlannerApplication.java
│   ├── config/                     # Configuration classes
│   │   ├── SecurityConfig.java
│   │   ├── DatabaseConfig.java
│   │   ├── RedisConfig.java
│   │   ├── SwaggerConfig.java
│   │   └── ...
│   ├── controller/                 # REST Controllers
│   │   ├── auth/
│   │   ├── customer/
│   │   ├── vendor/
│   │   ├── admin/
│   │   └── common/
│   ├── service/                    # Business Logic
│   │   ├── impl/
│   │   └── interfaces/
│   ├── repository/                 # Data Access Layer
│   │   ├── jpa/
│   │   ├── redis/
│   │   └── elasticsearch/
│   ├── model/                      # Data Models
│   │   ├── entity/
│   │   ├── dto/
│   │   ├── request/
│   │   ├── response/
│   │   └── enums/
│   ├── security/                   # Security Components
│   │   ├── jwt/
│   │   ├── oauth/
│   │   └── filters/
│   ├── exception/                  # Exception Handling
│   ├── utils/                      # Utility Classes
│   ├── validation/                 # Custom Validators
│   └── ...
├── src/main/resources/
│   ├── application.yml
│   ├── application-dev.yml
│   ├── application-prod.yml
│   └── db/migration/               # Flyway Migrations
└── src/test/java/                  # Test Classes
```

## 🔐 Authentication & Authorization

### JWT Token Flow
1. User registers/logs in
2. Server generates access token (24h) and refresh token (7d)
3. Client includes access token in Authorization header
4. Server validates token on each request
5. Client refreshes token when needed

### User Roles
- **CUSTOMER**: Regular users planning weddings
- **VENDOR**: Service providers
- **ADMIN**: System administrators
- **SUPER_ADMIN**: Super administrators

### Protected Endpoints
```
/customer/**     - CUSTOMER role required
/vendor/**       - VENDOR role required
/admin/**        - ADMIN role required
/planning/**     - CUSTOMER or ADMIN role required
```

## 📊 Database Schema

### Core Tables
- **users**: User accounts and profiles
- **wedding_plans**: Wedding planning data
- **wedding_guests**: Guest management
- **wedding_timeline**: Task/timeline management
- **wedding_vendors**: Vendor assignments
- **vendor_profiles**: Vendor business profiles
- **bookings**: Service bookings
- **payments**: Payment transactions

### Key Relationships
```sql
users (1) -> (N) wedding_plans
wedding_plans (1) -> (N) wedding_guests
wedding_plans (1) -> (N) wedding_timeline
wedding_plans (1) -> (N) wedding_vendors
users (1) -> (N) vendor_profiles
```

## 🔧 API Endpoints

### Authentication
```
POST /auth/register          - User registration
POST /auth/login             - User login
POST /auth/refresh           - Refresh token
GET  /auth/verify-email      - Email verification
POST /auth/forgot-password   - Password reset request
POST /auth/reset-password    - Password reset
```

### Wedding Planning
```
POST   /planning/plans                    - Create wedding plan
GET    /planning/plans                    - Get user's plans
GET    /planning/plans/{id}               - Get specific plan
PUT    /planning/plans/{id}               - Update plan
DELETE /planning/plans/{id}               - Delete plan

POST   /planning/plans/{id}/guests        - Add guest
GET    /planning/plans/{id}/guests        - Get guests
PUT    /planning/plans/{id}/guests/{gid}  - Update guest
DELETE /planning/plans/{id}/guests/{gid}  - Remove guest

POST   /planning/plans/{id}/timeline      - Add timeline task
GET    /planning/plans/{id}/timeline      - Get timeline
PUT    /planning/plans/{id}/timeline/{tid} - Update task
DELETE /planning/plans/{id}/timeline/{tid} - Delete task
```

### Vendor Management
```
GET    /vendors/public          - Public vendor listings
POST   /vendor/profile          - Create vendor profile
GET    /vendor/profile          - Get vendor profile
PUT    /vendor/profile          - Update vendor profile
GET    /vendor/bookings         - Get vendor bookings
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Run integration tests
mvn test -Dtest=*IntegrationTest

# Generate test coverage report
mvn jacoco:report
```

### Test Categories
- **Unit Tests**: Service layer testing
- **Integration Tests**: Repository and API testing
- **Security Tests**: Authentication and authorization
- **Performance Tests**: Load and stress testing

## 📈 Monitoring & Observability

### Health Checks
```
GET /actuator/health         - Application health
GET /actuator/info           - Application info
GET /actuator/metrics        - Application metrics
GET /actuator/prometheus     - Prometheus metrics
```

### Logging
- **Structured Logging**: JSON format for production
- **Log Levels**: Configurable per package
- **Audit Logging**: All user actions tracked
- **Security Logging**: Authentication events

## 🚀 Deployment

### Docker
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/wedding-planner-backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Environment Profiles
- **dev**: Development environment
- **staging**: Staging environment
- **prod**: Production environment

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] Monitoring configured
- [ ] Backup strategy implemented
- [ ] Security scan completed

## 📚 API Documentation

### Swagger UI
- **Development**: http://localhost:8080/api/v1/swagger-ui.html
- **API Docs**: http://localhost:8080/api/v1/api-docs

### Postman Collection
Import the Postman collection from `/docs/postman/` for testing APIs.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- Follow Java coding conventions
- Write comprehensive tests
- Update documentation
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@weddingplanner.com
- Documentation: https://docs.weddingplanner.com
- Issues: GitHub Issues

---

**Wedding Planner Backend** - Built with ❤️ using Spring Boot
