import http from 'http'

const server = http.createServer((req, res) => {
  console.log(req.url)

  // res.writeHead(200, {
  //   'Content-Type': 'text/html'
  // })
  // res.write(`<h1>URL ${req.url}</h1>`)
  // res.end()

  const data = { name: 'John Doe', age: 30, city: 'New York' }

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
})

server.listen(8080, () => {
  console.log('server running on port 8080')
})
