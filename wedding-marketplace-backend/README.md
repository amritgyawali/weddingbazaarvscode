# Wedding Marketplace Backend

A comprehensive, enterprise-grade Spring Boot backend for a wedding marketplace platform with advanced features including vendor management, booking system, payment processing, search capabilities, and administrative tools.

## 🚀 Features

### Core Functionality
- **User Management**: Registration, authentication, profile management with role-based access
- **Vendor System**: Vendor registration, approval workflow, profile management
- **Booking Management**: Complete booking lifecycle with status tracking
- **Payment Processing**: Multi-gateway support (Stripe, Razorpay) with fraud detection
- **Review System**: Customer reviews and ratings with moderation
- **Search & Discovery**: Advanced search with Elasticsearch, geo-location, and ML-powered recommendations

### Advanced Features
- **Real-time Notifications**: Multi-channel notifications (Email, SMS, Push, WebSocket)
- **File Management**: AWS S3 integration with image processing and CDN support
- **Analytics**: Comprehensive business intelligence and reporting
- **Admin Panel**: Full administrative interface with advanced management tools
- **Caching**: Redis-based caching for optimal performance
- **Security**: JWT authentication, role-based authorization, data encryption

## 🏗 Architecture

### Technology Stack
- **Framework**: Spring Boot 3.2.x
- **Java Version**: 21
- **Database**: MySQL 8.0
- **Cache**: Redis 7.2
- **Search**: Elasticsearch 8.11
- **File Storage**: AWS S3
- **Payment Gateways**: Stripe, Razorpay
- **Documentation**: OpenAPI 3.0 (Swagger)
- **Testing**: JUnit 5, Mockito, TestContainers
- **Build Tool**: Maven 3.9.x

### Key Components
```
src/main/java/com/weddingmarketplace/
├── controller/          # REST API controllers
├── service/            # Business logic services
├── repository/         # Data access layer
├── model/              # Entity and DTO classes
├── security/           # Security configuration
├── config/             # Application configuration
├── exception/          # Custom exception handling
├── mapper/             # Entity-DTO mapping
├── event/              # Event-driven architecture
├── seeder/             # Data seeding utilities
└── util/               # Utility classes
```

## 🚦 Getting Started

### Prerequisites
- Java 21+
- Maven 3.9+
- Docker & Docker Compose
- MySQL 8.0+
- Redis 7.2+
- Elasticsearch 8.11+

### Environment Variables
Create a `.env` file in the project root:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=wedding_marketplace
DB_USERNAME=wedding_user
DB_PASSWORD=wedding_password

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Elasticsearch Configuration
ELASTICSEARCH_URIS=http://localhost:9200

# AWS Configuration
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=wedding-marketplace-files

# Payment Gateway Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRATION=86400000

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

# SMS Configuration
SMS_API_KEY=your_sms_api_key
SMS_API_SECRET=your_sms_api_secret
```

### Quick Start with Docker

1. **Clone the repository**
```bash
git clone https://github.com/your-org/wedding-marketplace-backend.git
cd wedding-marketplace-backend
```

2. **Start all services**
```bash
docker-compose up -d
```

3. **Access the application**
- API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- Kibana: http://localhost:5601 (optional)

### Manual Setup

1. **Start infrastructure services**
```bash
# Start MySQL, Redis, and Elasticsearch
docker-compose up -d mysql redis elasticsearch
```

2. **Build and run the application**
```bash
mvn clean package -DskipTests
java -jar target/wedding-marketplace-backend-1.0.0.jar
```

## 📚 API Documentation

### Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Key Endpoints

#### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh JWT token

#### Vendors
- `GET /api/v1/vendors` - List vendors with filtering
- `POST /api/v1/vendors` - Register as vendor
- `GET /api/v1/vendors/{id}` - Get vendor details
- `PUT /api/v1/vendors/{id}` - Update vendor profile
- `POST /api/v1/vendors/search` - Advanced vendor search

#### Bookings
- `GET /api/v1/bookings` - List user bookings
- `POST /api/v1/bookings` - Create new booking
- `GET /api/v1/bookings/{id}` - Get booking details
- `PUT /api/v1/bookings/{id}/status` - Update booking status

#### Payments
- `POST /api/v1/payments` - Create payment
- `POST /api/v1/payments/{id}/process` - Process payment
- `GET /api/v1/payments/user` - Get user payments

#### Admin
- `GET /api/v1/admin/dashboard` - Admin dashboard data
- `GET /api/v1/admin/vendors/pending` - Pending vendor approvals
- `POST /api/v1/admin/vendors/{id}/approve` - Approve vendor

### Complete API documentation is available at `/swagger-ui.html` when the application is running.

## 🧪 Testing

### Run Tests
```bash
# Unit tests
mvn test

# Integration tests
mvn verify

# All tests with coverage
mvn clean test jacoco:report
```

### Test Coverage
- Unit Tests: 90%+ coverage
- Integration Tests: Full API endpoint coverage
- Test Data: Comprehensive fixtures and seeders

## 🚀 Deployment

### Production Deployment

1. **Build production image**
```bash
docker build -t wedding-marketplace-backend:latest .
```

2. **Deploy with production compose**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### CI/CD Pipeline
The project includes GitHub Actions workflows for:
- Code quality checks (SonarCloud, SpotBugs, Checkstyle)
- Automated testing
- Security scanning
- Docker image building
- Deployment to staging/production

## 📊 Monitoring & Observability

### Health Checks
- Application health: `/actuator/health`
- Database connectivity: `/actuator/health/db`
- Redis connectivity: `/actuator/health/redis`

### Metrics
- Prometheus metrics: `/actuator/prometheus`
- Custom business metrics included
- Grafana dashboards available

### Logging
- Structured JSON logging
- Centralized log aggregation ready
- Request/response logging with correlation IDs

## 🔧 Configuration

### Application Profiles
- `dev` - Development environment
- `test` - Testing environment
- `staging` - Staging environment
- `prod` - Production environment

### Key Configuration Files
- `application.yml` - Main configuration
- `application-{profile}.yml` - Profile-specific settings
- `logback-spring.xml` - Logging configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow Google Java Style Guide
- Maintain 90%+ test coverage
- All public methods must have Javadoc
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team at dev@weddingmarketplace.com
- Check the [Wiki](https://github.com/your-org/wedding-marketplace-backend/wiki) for detailed documentation

## 🎯 Roadmap

### Upcoming Features
- [ ] Machine Learning recommendations
- [ ] Advanced analytics dashboard
- [ ] Mobile app API enhancements
- [ ] Multi-language support
- [ ] Advanced fraud detection
- [ ] Blockchain integration for contracts

### Performance Targets
- API Response Time: < 200ms (95th percentile)
- Database Query Time: < 50ms average
- Search Response Time: < 100ms
- 99.9% uptime SLA

---

**Built with ❤️ by the Wedding Marketplace Team**
