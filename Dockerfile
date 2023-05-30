FROM node:18 AS build-env

WORKDIR /app

ARG COMMIT_ID
ARG BRANCH_NAME
ARG REGION
ARG VERSION


ENV COMMIT_ID=$COMMIT_ID
ENV BRANCH_NAME=$BRANCH_NAME
ENV REGION=$REGION
ENV VERSION=$VERSION
ENV PORT 8080
ENV HOST 0.0.0.0
ENV GOOGLE_APPLICATION_CREDENTIALS="./gservice-account.json"

COPY package*.json ./

RUN npm ci

# Copy the local code to the container
COPY . .

ENV NODE_OPTIONS=--max_old_space_size=2048
# Build
RUN npm run build
# Start the service
CMD npm run start:prod