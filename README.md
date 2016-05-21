# Docker Hubot Immortal

> keeps hubots alive, specially in Heroku free instances. Inspired by [hubot-immortal](https://github.com/juanbrujo/hubot-immortal)

### Use:

```bash
# Run instance
docker run -d -p 3000:3000 -v db:/opt/app/db --name hubot-immortal lgatica/hubot-immortal:latest
# Post new host
curl -d url=your_host hubot-immortal-ip:3000
# Get all hosts
curl hubot-immortal-ip:3000
```

### License:

[MIT](https://tldrlegal.com/license/mit-license)
