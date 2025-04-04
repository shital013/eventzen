# Stage 1: Build the React app
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --silent
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default config and create conf.d directory if needed
RUN rm -rf /etc/nginx/conf.d/* && \
    mkdir -p /etc/nginx/conf.d

# Copy custom Nginx config with explicit filename
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]