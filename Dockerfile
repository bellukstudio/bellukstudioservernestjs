# Base image
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Add build dependencies
RUN apk add --no-cache python3 make g++

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Set production environment
ENV NODE_ENV=production
ENV NO_COLOR=true
ENV PORT=3005
ENV HOST="0.0.0.0"

# Copy only necessary files from build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app
COPY --from=build /app/node_modules /app/node_modules

# Install runtime dependencies needed for native modules
RUN apk add --no-cache libstdc++
# Expose the port NestJS runs on
EXPOSE 3005

# Run the app 1
CMD ["node", "dist/main.js"]
