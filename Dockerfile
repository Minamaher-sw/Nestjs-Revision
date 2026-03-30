from node:24-alpine
WORKDIR /app
COPY package.json .
RUN npm install
# copy src after npm install to leverage Docker cache for node_modules when source code changes but dependencies do not but we want copy it to ./app/src to match the expected structure of the application
COPY src ./src
copy test ./test
copy tsconfig.json .
copy tsconfig.build.json .
expose 3000
CMD ["npm", "start"]