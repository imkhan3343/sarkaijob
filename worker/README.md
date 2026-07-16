# Worker plan

Connect `freshness`, `notifications`, and `webhooks` queues to BullMQ when Redis is enabled. Keep web requests idempotent, retry with exponential backoff, and move exhausted jobs to a dead-letter queue.
