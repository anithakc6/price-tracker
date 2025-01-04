# Use a multi-stage build to separate build and production stages
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package*.json files
COPY . .

# Install build dependencies and build the app
RUN apk add --no-cache --virtual .build-deps python3 make g++ && \
    npm ci && \
    npm run build && \
    apk del .build-deps

# Install only production dependencies and clean the cache
RUN npm ci --omit=dev && \
    npm cache clean --force

# Production stage
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy node_modules and dist folder from the build stage
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Define the command to run the app
CMD ["node", "dist/main.js"]
