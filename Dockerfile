FROM node:16-alpine as build
WORKDIR /app

# Create a layer with only the dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install --legacy-peer-deps

# Copy the sources and build the app
COPY . /app
# Vitejs will put the build artifacts in the /dist directory
RUN npm run build

# Create the production state
FROM nginx:1.23-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf etc/nginx/conf.d

EXPOSE 80
CMD [ "nginx","-g","daemon off;" ]


