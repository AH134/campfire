<div align="center">
  <img src="https://github.com/AH134/campfire/blob/5399624280d1e4e59ac42c1ff0e17b338c13b936/public/bonfire.png" width="200" height="200"/>
  <h1>Campfire</h1>
</div>

<p align="center">Fully static self-host dashboard built with <a href="https://svelte.dev">svelte</a>, <a href="https://www.fontawesome.com">fontawesome</a>, and <a href="https://www.tailwindcss.com">tailwindcss</a></p>

## Features
- 📄 Simple [yaml](https://www.yaml.org/) file configuration
- 🖼️ Easy icon selection from [fontawesome](https://www.fontawesome.com/)
- 🔎 Fuzzy search

## Getting Started
Campfire is a fully static dashboard that uses a yaml file for configuration. See `public/data/config.yml` for more details and examples.

### Using Docker
**Start the container with `docker run`**
```sh
docker run \
  --name campfire \
  -p 3000:3000 \
  -v /path/to/data:/var/www/html/data \
  --restart=unless-stopped \
  xw134/campfire:latest
```

**or `docker-compose`**
```yaml
version: '3'

services:
  campfire:
    image: xw134/campfire
    container_name: campfire
    ports:
      - "3000:3000"
    volumes:
        - /path/to/config/dir:/var/www/html/data
    restart: unless-stopped
    networks:
      - campfire_network
    environment:
    - NODE_ENV=production

networks:
  campfire_network:
    driver: bridge

```

## Build manually
```sh
npm install
npm run build
```

Your dashboard is ready to use in `/dist` directory.
