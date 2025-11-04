# AWS Services Usage - Plant Detection App

## Currently Used AWS Services (Free Tier)

### 1. **AWS Amplify Hosting** ✅
- **What it does**: Hosts and deploys the Next.js application
- **Free Tier Limit**: 
  - 1,000 build minutes/month
  - 15 GB storage/month
  - 5 GB served/month via CloudFront
- **Current Usage**: 
  - Build minutes: ~2-5 minutes per deployment
  - Storage: ~100-200 MB (app + build artifacts)
  - Data transfer: Minimal (app is just deployed)

### 2. **AWS CloudFront** (via Amplify) ✅
- **What it does**: CDN for fast global content delivery
- **Free Tier Limit**:
  - 1 TB data transfer out/month
  - 10,000,000 HTTP/HTTPS requests/month
- **Current Usage**: 
  - Minimal (app is new)
  - Increases with user traffic

### 3. **AWS CodeBuild** (via Amplify) ✅
- **What it does**: Builds the Next.js application
- **Free Tier Limit**:
  - 100 build minutes/month
- **Current Usage**: 
  - ~2-5 minutes per build
  - Multiple builds = cumulative minutes

---

## Additional AWS Free Tier Services Available

### 4. **Amazon S3 (Simple Storage Service)** 🔄
- **What it does**: Store uploaded plant images, static assets
- **Free Tier Limit**:
  - 5 GB storage
  - 20,000 GET requests/month
  - 2,000 PUT requests/month
- **Use Case**: 
  - Store user-uploaded plant images
  - Backup analysis results
  - Store static assets

### 5. **AWS Lambda** 🔄
- **What it does**: Serverless functions for background tasks
- **Free Tier Limit**:
  - 1 million requests/month
  - 400,000 GB-seconds compute time/month
- **Use Case**:
  - Process images asynchronously
  - Send email notifications
  - Scheduled tasks (cleanup, backups)

### 6. **Amazon DynamoDB** 🔄
- **What it does**: NoSQL database for storing user data
- **Free Tier Limit**:
  - 25 GB storage
  - 25 units of read capacity
  - 25 units of write capacity
- **Use Case**:
  - Store user analysis history
  - Save user preferences
  - Track plant detection history

### 7. **Amazon SES (Simple Email Service)** 🔄
- **What it does**: Send emails (notifications, reports)
- **Free Tier Limit**:
  - 62,000 emails/month (when sending from EC2)
  - 1,000 emails/month (when sending from outside EC2)
- **Use Case**:
  - Send analysis reports to users
  - Email notifications for plant care reminders

### 8. **Amazon CloudWatch** 🔄
- **What it does**: Monitor application performance and logs
- **Free Tier Limit**:
  - 10 custom metrics
  - 5 GB log ingestion
  - 10 dashboards with 50 metrics each
- **Use Case**:
  - Monitor API response times
  - Track error rates
  - Log application events

### 9. **AWS API Gateway** 🔄
- **What it does**: API management and routing
- **Free Tier Limit**:
  - 1 million API calls/month
- **Use Case**:
  - Create additional API endpoints
  - Rate limiting
  - API versioning

### 10. **Amazon EC2 (t2.micro/t3.micro)** 🔄
- **What it does**: Virtual server (if needed for heavy processing)
- **Free Tier Limit**:
  - 750 hours/month (1 instance always-on)
  - 1 GB RAM, 1 vCPU
- **Use Case**:
  - Heavy image processing
  - Background jobs
  - Database server (if needed)

---

## Third-Party Free Services Available

### 11. **Vercel** (Alternative to Amplify) 🔄
- **Free Tier**: 
  - Unlimited bandwidth
  - 100 GB bandwidth/month
  - Automatic deployments
- **Status**: Already working! ✅
- **Use Case**: Backup deployment option

### 12. **MongoDB Atlas** (Free Database) 🔄
- **Free Tier**: 
  - 512 MB storage
  - Shared cluster
- **Use Case**: Store user data, analysis history

### 13. **Firebase** (Google) 🔄
- **Free Tier**:
  - 1 GB storage
  - 10 GB/month transfer
  - Real-time database
- **Use Case**: User authentication, real-time features

### 14. **SendGrid** (Email Service) 🔄
- **Free Tier**:
  - 100 emails/day
- **Use Case**: Send analysis reports via email

### 15. **Cloudinary** (Image Processing) 🔄
- **Free Tier**:
  - 25 GB storage
  - 25 GB/month bandwidth
- **Use Case**: Image optimization, transformations

---

## Recommended Next Steps for Free Tier Usage

### Phase 1: Immediate (Current)
- ✅ AWS Amplify (Hosting)
- ✅ CloudFront (CDN via Amplify)
- ✅ CodeBuild (Builds via Amplify)

### Phase 2: Short Term (Next 1-2 weeks)
1. **Add S3** for image storage
   - Store uploaded plant images
   - Reduce API payload size
   
2. **Add CloudWatch** for monitoring
   - Track API performance
   - Monitor error rates

3. **Add DynamoDB** for data storage
   - Store user analysis history
   - Save favorites

### Phase 3: Medium Term (Next month)
1. **Add Lambda** for background tasks
   - Process images asynchronously
   - Send email reports

2. **Add SES** for notifications
   - Email analysis results
   - Plant care reminders

### Phase 4: Long Term (If needed)
1. **Add EC2** (if processing needs grow)
   - Heavy ML model inference
   - Complex image processing

---

## Cost Tracking

### Current Monthly Estimate (Free Tier)
- **Amplify**: ~$0 (within free tier)
- **CloudFront**: ~$0 (within free tier)
- **CodeBuild**: ~$0 (within free tier)
- **Total**: **$0/month** ✅

### With Additional Services (Still Free Tier)
- **S3**: $0 (within 5 GB)
- **Lambda**: $0 (within 1M requests)
- **DynamoDB**: $0 (within 25 GB)
- **SES**: $0 (within 1,000 emails)
- **CloudWatch**: $0 (within limits)
- **Total**: **$0/month** ✅

---

## Important Notes

1. **Monitor Usage**: Always check AWS Billing Console to track usage
2. **Set Budget Alerts**: Configure budgets to get notified if approaching limits
3. **Free Tier Duration**: Most services have 12-month free tier, some are always free
4. **Optimize**: Keep deployments minimal, use caching, compress images

---

## Presentation Summary

**Services Currently Used:**
- AWS Amplify Hosting
- AWS CloudFront (CDN)
- AWS CodeBuild

**Free Tier Status:** ✅ All services within free tier limits

**Recommended Next Services:**
1. Amazon S3 (Image storage)
2. Amazon DynamoDB (Data storage)
3. AWS CloudWatch (Monitoring)
4. AWS Lambda (Background processing)

**Monthly Cost:** $0 (within free tier limits)

