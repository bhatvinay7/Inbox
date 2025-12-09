# Inbox - Cold Email Management System

A modern email management system built with Turborepo monorepo architecture, featuring microservices for handling email processing, storage, and real-time updates.

## 📁 Project Structure

This project uses **Turborepo** as a monorepo management tool with the following structure:

```
inbox/
├── apps/
│   ├── consumer-push2storage/    # Consumes messages and stores to database
│   ├── http-server/               # Main HTTP API server
│   ├── label-assigner/            # Assigns labels to emails
│   ├── publisher-publish-mail-from-imap/  # Publishes emails from IMAP
│   ├── web/                       # Frontend Next.js application
│   ├── worker/                    # Background job processor
│   └── ws-server/                 # WebSocket server for real-time updates
├── packages/
│   ├── elasticSearch/             # Elasticsearch utilities
│   ├── eslint-config/             # Shared ESLint configuration
│   ├── postgre-db/                # PostgreSQL database client
│   ├── rabbitmq/                  # RabbitMQ client utilities
│   ├── redisClient/               # Redis client utilities
│   ├── types/                     # Shared TypeScript types
│   ├── typescript-config/         # Shared TypeScript configuration
│   └── ui/                        # Shared UI components
└── docker-compose.yml
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Docker** and **Docker Compose**
- **Git**
- **pnpm** (recommended) or npm/yarn

### 1. Fork and Clone the Repository

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/inbox.git
cd inbox
```

### 2. Install Dependencies

```bash
# Install pnpm globally if you haven't already
npm install -g pnpm

# Install all dependencies
pnpm install
```

## 🐳 Docker Setup

### Starting Services with Docker Compose

The project includes a `docker-compose.yml` file that sets up all required services:

- PostgreSQL database
- Redis cache
- Elasticsearch
- RabbitMQ message broker

```bash
# Start all services in detached mode
docker-compose up -d

# Check if all services are running
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

## 🔐 Setting Up External Services

### 1. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Gmail API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Gmail API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3002/api/auth/callback/google`
   - Save and copy the **Client ID** and **Client Secret**

### 2. Redis Setup (Cloud Option)

If you prefer a cloud Redis instance instead of Docker:

1. Sign up for [Redis Cloud](https://redis.com/try-free/) or [Upstash](https://upstash.com/)
2. Create a new Redis database
3. Copy the connection details:
   - Host
   - Port
   - Password
   - Username (usually 'default')

**Note:** For local development, the Docker Compose setup includes Redis, so this step is optional.

### 3. PostgreSQL Setup

The Docker Compose file includes PostgreSQL. Connection details:

- **Host:** localhost
- **Port:** 5432
- **Database:** inbox_db
- **Username:** inbox_user
- **Password:** inbox_password

**Database URL format:**
```
postgresql://inbox_user:inbox_password@localhost:5432/inbox_db
```

### 4. Cloudinary Setup (for image storage)

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to your Dashboard
3. Copy the following details:
   - Cloud Name
   - API Key
   - API Secret

## ⚙️ Environment Variables Setup

Create `.env` files in the respective application directories:

### `/apps/web/.env`

```env
NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"
GOOGLE_CLIENT_ID='your_google_client_id_here'
GOOGLE_CLIENT_SECRET='your_google_client_secret_here'
GOOGLE_REDIRECT_URI="http://localhost:3002/api/auth/callback/google"
DATABASE_URL="postgresql://inbox_user:inbox_password@localhost:5432/inbox_db"
REDIS_USERNAME='default'
REDIS_PASSWORD='your_redis_password_here'
REDIS_HOST='localhost'
REDIS_PORT='6379'
```

### `/apps/http-server/.env`

```env
NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"
WORKER_BACKEND_URL='http://worker:3008'
DATABASE_URL="postgresql://inbox_user:inbox_password@localhost:5432/inbox_db"
REDIS_USERNAME='default'
REDIS_PASSWORD='your_redis_password_here'
REDIS_HOST='localhost'
REDIS_PORT='6379'
secret_key='your_secret_key_here'
access_key='your_access_key_here'
```

### `/apps/publisher-publish-mail-from-imap/.env`

```env
IMAP_BACKEND_URL='http://publisher-publish-mail-from-imap:3009'
RABBITMQ_CLUSTER_URL="amqp://inbox_user:inbox_password@localhost:5672/"
DATABASE_URL="postgresql://inbox_user:inbox_password@localhost:5432/inbox_db"
```

### `/apps/worker/.env`

```env
WORKER_BACKEND_URL='http://worker:3008'
DATABASE_URL="postgresql://inbox_user:inbox_password@localhost:5432/inbox_db"
RABBITMQ_CLUSTER_URL="amqp://inbox_user:inbox_password@localhost:5672/"
CLOUDINARY_NAME='your_cloudinary_name'
API_KEY='your_cloudinary_api_key'
API_SECRET='your_cloudinary_api_secret'
```

### `/apps/consumer-push2storage/.env`

```env
DATABASE_URL="postgresql://inbox_user:inbox_password@localhost:5432/inbox_db"
RABBITMQ_CLUSTER_URL="amqp://inbox_user:inbox_password@localhost:5672/"
ELESTIC_SEARCH_CONNECTION_URL="http://localhost:9200"
```

### `/apps/ws-server/.env`

```env
REDIS_USERNAME='default'
REDIS_PASSWORD='your_redis_password_here'
REDIS_HOST='localhost'
REDIS_PORT='6379'
```

### `/apps/label-assigner/.env`

```env
DATABASE_URL="postgresql://inbox_user:inbox_password@localhost:5432/inbox_db"
RABBITMQ_CLUSTER_URL="amqp://inbox_user:inbox_password@localhost:5672/"
```

## 🗄️ Database Setup with Prisma

### 1. Generate Prisma Client

```bash
# Navigate to the database package
cd packages/postgre-db

# Generate Prisma client
pnpm prisma generate

# Return to root
cd ../..
```

### 2. Run Database Migrations

```bash
# Navigate to the database package
cd packages/postgre-db

# Run migrations
pnpm prisma migrate dev

# Or if you want to push schema without migration
pnpm prisma db push

# Return to root
cd ../..
```

### 3. Seed Database (Optional)

```bash
cd packages/postgre-db
pnpm prisma db seed
cd ../..
```

## 🏗️ Building and Running the Project

### Development Mode

```bash
# Run all applications in development mode
pnpm dev

# Run specific application
pnpm dev --filter=web
pnpm dev --filter=http-server
```

### Build for Production

```bash
# Build all applications
pnpm build

# Build specific application
pnpm build --filter=web
```

### Start Production Build

```bash
# Start all applications
pnpm start

# Start specific application
pnpm start --filter=web
```

## 📦 Available Services and Ports

| Service | Port | Description |
|---------|------|-------------|
| Web (Frontend) | 3000 | Next.js web application |
| HTTP Server | 3002 | Main API server |
| Worker | 3008 | Background job processor |
| IMAP Publisher | 3009 | Email publisher service |
| WebSocket Server | 3010 | Real-time updates |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache and session store |
| RabbitMQ | 5672 | Message broker |
| RabbitMQ Management | 15672 | RabbitMQ web UI |
| Elasticsearch | 9200 | Search engine |

## 🧪 Testing

```bash
# Run tests for all packages
pnpm test

# Run tests for specific package
pnpm test --filter=web
```

## 🔍 Useful Commands

```bash
# Check for linting errors
pnpm lint

# Format code
pnpm format

# Clean all node_modules and build artifacts
pnpm clean

# View Prisma Studio (database GUI)
cd packages/postgre-db && pnpm prisma studio
```

## 🐛 Troubleshooting

### Docker services not starting

```bash
# Check Docker logs
docker-compose logs

# Restart specific service
docker-compose restart postgres
```

### Port already in use

```bash
# Find process using port (example: port 3000)
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Prisma Client errors

```bash
# Regenerate Prisma Client
cd packages/postgre-db
pnpm prisma generate
```

### RabbitMQ connection issues

1. Ensure RabbitMQ is running: `docker-compose ps`
2. Check RabbitMQ management UI at `http://localhost:15672`
   - Username: `inbox_user`
   - Password: `inbox_password`

## 📚 Additional Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [RabbitMQ Tutorials](https://www.rabbitmq.com/getstarted.html)
- [Redis Documentation](https://redis.io/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review closed issues for solutions

---

**Happy Coding! 🚀**
