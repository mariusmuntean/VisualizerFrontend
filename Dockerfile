FROM node:16-alpine as build
WORKDIR /app

# Create a layer with only the dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install --legacy-peer-deps

# Copy the sources and build the app
COPY . /app

# Replace the default config with the prod config. The prod config uses placeholders as values.
RUN rm /app/src/config/config.json
COPY ./prod-config/prod-config.json /app/src/config/config.json

# Vitejs will put the build artifacts in the /dist directory
RUN npm run build

# Create the production state
FROM nginx:1.23-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf etc/nginx/conf.d

EXPOSE 80

# Look for all the *.js files among the build artifacts
CMD find /usr/share/nginx/html -type f -name "*.js" -print0 \
    # In each found file, replace the placeholders with the env variable values.
    | xargs -0 -I '{}' sed -i "s/VISUALIZER_BACKEND_URL_PLACEHOLDER/$VISUALIZER_BACKEND_URL/g" '{}' \
    # Finally start nginx.
    | nginx -g 'daemon off;'
