# Step 1: Build the Next.js app
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .
RUN npm run build

# Step 2: Run the app using Node.js
FROM node:18

WORKDIR /app

COPY --from=build /app ./

EXPOSE 4000
CMD ["npm", "start"]

