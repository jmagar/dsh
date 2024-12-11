# Security Guide

This document outlines the security measures and best practices implemented in the DSH project.

## Security Headers

We use Helmet.js to set secure HTTP headers:

```typescript
import helmet from 'helmet';

// Basic Helmet setup
app.use(helmet());

// Content Security Policy
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", 'data:', 'https:'],
    connectSrc: ["'self'", 'wss:']
  }
}));

// Additional security headers
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(helmet.xssFilter());
```

## Authentication & Authorization

### JWT Implementation

```typescript
import jwt from 'jsonwebtoken';

// Token generation
const generateToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, role: user.role },
    config.security.jwtSecret,
    { expiresIn: '24h' }
  );
};

// Token verification middleware
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('No token provided');
    }
    const decoded = jwt.verify(token, config.security.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
```

### WebSocket Security

```typescript
import { Server } from 'socket.io';

const io = new Server(server, {
  cors: corsOptions,
  path: '/ws',
  transports: ['websocket'],
  pingTimeout: 60000,
  pingInterval: 25000
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const decoded = jwt.verify(token, config.security.jwtSecret);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});
```

### HTTPS Configuration

```typescript
const httpsOptions = {
  key: fs.readFileSync('path/to/key.pem'),
  cert: fs.readFileSync('path/to/cert.pem'),
  minVersion: 'TLSv1.2',
  ciphers: [
    'ECDHE-ECDSA-AES256-GCM-SHA384',
    'ECDHE-RSA-AES256-GCM-SHA384',
    'ECDHE-ECDSA-CHACHA20-POLY1305',
    'ECDHE-RSA-CHACHA20-POLY1305',
    'ECDHE-ECDSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES128-GCM-SHA256'
  ].join(':')
};

https.createServer(httpsOptions, app);
```

## Data Security

### Password Security

```typescript
import bcrypt from 'bcrypt';

// Password hashing
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

// Password verification
const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Password policy
const validatePassword = (password: string): boolean => {
  const minLength = 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
};
```

### Database Security

```typescript
// Prisma configuration with SSL
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  sslmode  = "verify-full"
}

// Connection pooling
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.database.url
    }
  },
  connection: {
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync('path/to/ca.crt')
    }
  }
});
```

## Security Monitoring

### Audit Logging

```typescript
const auditLog = (action: string, user: User, details: any) => {
  logger.info('Security audit', {
    action,
    user: user.id,
    details,
    timestamp: new Date(),
    ip: details.ip,
    userAgent: details.userAgent
  });
};

// Usage examples
auditLog('login', user, { ip, userAgent, success: true });
auditLog('password_change', user, { ip, userAgent });
auditLog('permission_change', user, { role: newRole });
```

### Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false
});

// Apply to all routes
app.use(limiter);

// Specific routes
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 failed attempts
  message: 'Too many failed login attempts'
});

app.post('/auth/login', authLimiter, loginHandler);
```

## Security Best Practices

1. **Input Validation**
   - Validate all user input
   - Use Zod for schema validation
   - Sanitize data before storage
   - Prevent SQL injection

2. **Session Management**
   - Secure session configuration
   - Session timeout
   - Session invalidation
   - CSRF protection

3. **Dependency Security**
   - Regular dependency updates
   - Security audits (`npm audit`)
   - Lock file maintenance
   - Snyk vulnerability scanning

4. **Code Security**
   - Code review process
   - Security linting
   - Static analysis
   - Dynamic analysis

5. **Infrastructure Security**
   - Network segmentation
   - Firewall configuration
   - Regular updates
   - Access control

## Incident Response

1. **Response Plan**
   - Incident classification
   - Response procedures
   - Communication plan
   - Recovery steps

2. **Documentation**
   - Incident logs
   - Response actions
   - Post-mortem analysis
   - Preventive measures

3. **Contact Information**
   - Security team contacts
   - Emergency contacts
   - External security contacts
   - Legal team contacts

## Security Checklist

- [ ] Enable HTTPS
- [ ] Configure security headers
- [ ] Implement authentication
- [ ] Set up authorization
- [ ] Configure rate limiting
- [ ] Enable audit logging
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Review dependencies
- [ ] Test security measures
- [ ] Document procedures
- [ ] Train team members
