let messageId = '-1'

async function recursiveRequest(url, token, query, callback) {
  try {
    const response = await fetch(`${url}?lastMaxId=${query}`, {
      method: 'get',
      headers: {
        Authorization: `${token}`
      }
    })
    const { data, code } = await response.json()
    callback(data, code)
    setTimeout(() => {
      recursiveRequest(url, token, messageId || data?.messageId || '-1', callback)
    }, 5000)
  } catch (error) {
    callback(error)
  }
}

self.addEventListener('message', async (event) => {
  const { url, token } = event.data
  await recursiveRequest(url, token, '-1', (data, code) => {
    if (code == 200) {
      if (messageId !== '-1') {
        data && (messageId = String(data.messageId))
        postMessage({ messageId, data, code })
      } else {
        data && (messageId = String(data.messageId))
      }
    } else {
      postMessage({ code })
    }
  })
})
